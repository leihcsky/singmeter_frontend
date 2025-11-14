/**
 * 音高检测工具类
 * 使用 Web Audio API 和 pitchy 库进行实时音高检测
 */

import { PitchDetector } from 'pitchy';

// 音符频率映射表 (A4 = 440Hz)
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * 将频率转换为音符名称
 * @param {number} frequency - 频率 (Hz)
 * @returns {object} { note: 音符名, octave: 八度, cents: 音分偏移 }
 */
export function frequencyToNote(frequency) {
  if (!frequency || frequency < 20) {
    return { note: '', octave: 0, cents: 0, fullNote: '' };
  }

  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  const noteIndex = Math.round(noteNum) + 69; // MIDI note number
  const cents = Math.floor((noteNum - Math.round(noteNum)) * 100);
  
  const octave = Math.floor(noteIndex / 12) - 1;
  const note = NOTE_NAMES[noteIndex % 12];
  const fullNote = `${note}${octave}`;

  return { note, octave, cents, fullNote };
}

/**
 * 获取声部类型
 * @param {string} lowestNote - 最低音
 * @param {string} highestNote - 最高音
 * @returns {string} 声部类型
 */
export function getVoiceType(lowestNote, highestNote) {
  // 简化的声部判断逻辑
  const noteToMidi = (noteStr) => {
    const match = noteStr.match(/([A-G]#?)(\d+)/);
    if (!match) return 0;
    const [, note, octave] = match;
    const noteIndex = NOTE_NAMES.indexOf(note);
    return (parseInt(octave) + 1) * 12 + noteIndex;
  };

  const lowestMidi = noteToMidi(lowestNote);
  const highestMidi = noteToMidi(highestNote);
  const avgMidi = (lowestMidi + highestMidi) / 2;

  // 根据平均音高判断声部
  if (avgMidi < 55) return 'Bass'; // 男低音
  if (avgMidi < 62) return 'Baritone'; // 男中音
  if (avgMidi < 67) return 'Tenor'; // 男高音
  if (avgMidi < 72) return 'Alto'; // 女低音
  if (avgMidi < 77) return 'Mezzo-Soprano'; // 女中音
  return 'Soprano'; // 女高音
}

/**
 * 音高检测器类
 */
export class AudioPitchDetector {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.detector = null;
    this.buffer = null;
    this.isRunning = false;
  }

  /**
   * 初始化音频上下文和麦克风
   */
  async initialize() {
    try {
      // 创建音频上下文
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // 获取麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });

      // 创建音频源
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      
      // 创建分析器
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.microphone.connect(this.analyser);

      // 创建音高检测器
      const sampleRate = this.audioContext.sampleRate;
      this.detector = PitchDetector.forFloat32Array(this.analyser.fftSize);
      this.buffer = new Float32Array(this.analyser.fftSize);

      return { success: true };
    } catch (error) {
      console.error('初始化音频失败:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 开始检测音高
   * @param {function} callback - 回调函数，接收检测到的频率
   */
  startDetection(callback) {
    if (!this.analyser || !this.detector) {
      console.error('请先初始化音频上下文');
      return;
    }

    // 如果已经在运行，先停止
    if (this.isRunning) {
      console.warn('⚠️ Detection already running, stopping first...');
      this.stopDetection();
    }

    this.isRunning = true;
    console.log('✅ Started pitch detection');

    // 人声频率范围：
    // 标准范围：E2 (82 Hz) - C6 (1046 Hz)
    // 为了安全过滤噪音，我们扩展到 C2 (65 Hz) - E6 (1318 Hz)
    // 这样可以捕捉到极少数 Basso Profundo 的超低音
    const MIN_HUMAN_FREQUENCY = 65;   // C2 (extended range for noise filtering)
    const MAX_HUMAN_FREQUENCY = 1318; // E6 (extended range for noise filtering)

    const detect = () => {
      if (!this.isRunning) return;

      // 获取音频数据
      this.analyser.getFloatTimeDomainData(this.buffer);

      // 检测音高
      const [pitch, clarity] = this.detector.findPitch(this.buffer, this.audioContext.sampleRate);

      // 计算音量（RMS - Root Mean Square）
      let sum = 0;
      for (let i = 0; i < this.buffer.length; i++) {
        sum += this.buffer[i] * this.buffer[i];
      }
      const rms = Math.sqrt(sum / this.buffer.length);
      const volume = rms * 100; // 转换为 0-100 的范围

      // 过滤条件：
      // 1. 频率为正数且在人声范围内
      // 2. 清晰度要求（动态调整）：
      //    - 极低音（< 150 Hz）：clarity > 0.75（很宽松，因为极低音很难检测）
      //    - 低音（150-300 Hz）：clarity > 0.80（宽松，因为低音清晰度较低）
      //    - 中音（300-500 Hz）：clarity > 0.85（适中）
      //    - 高音（>= 500 Hz）：clarity > 0.85（适中，高音通常清晰度也不高）
      // 3. 音量足够（> 0.3，确保用户在发声，过滤极小的噪音）
      let clarityThreshold;
      if (pitch < 150) {
        clarityThreshold = 0.75; // 极低音
      } else if (pitch < 300) {
        clarityThreshold = 0.80; // 低音
      } else {
        clarityThreshold = 0.85; // 中高音
      }

      // 调试：每秒输出一次检测状态
      const now = Date.now();
      if (!this.lastDebugTime || now - this.lastDebugTime > 1000) {
        this.lastDebugTime = now;
        console.log(`🎵 Pitch: ${pitch?.toFixed(1) || 'null'} Hz, Clarity: ${clarity.toFixed(2)}, Volume: ${volume.toFixed(2)}, Threshold: ${clarityThreshold}`);
      }

      if (pitch > 0 &&
          pitch >= MIN_HUMAN_FREQUENCY &&
          pitch <= MAX_HUMAN_FREQUENCY &&
          clarity > clarityThreshold &&
          volume > 0.3) {
        callback(pitch, clarity);
      } else {
        callback(null, clarity);
      }

      // 继续检测
      requestAnimationFrame(detect);
    };

    detect();
  }

  /**
   * 停止检测
   */
  stopDetection() {
    if (this.isRunning) {
      console.log('⏹️ Stopped pitch detection');
    }
    this.isRunning = false;
  }

  /**
   * 清理资源
   */
  cleanup() {
    this.stopDetection();
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone.mediaStream.getTracks().forEach(track => track.stop());
    }
    
    if (this.analyser) {
      this.analyser.disconnect();
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }

    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.detector = null;
    this.buffer = null;
  }
}

