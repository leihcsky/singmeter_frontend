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
/**
 * 将频率转换为音符名称（基于A4=440Hz标准）
 * @param {number} frequency - 频率 (Hz)
 * @returns {object} { note: 音符名, octave: 八度, cents: 音分偏移, fullNote: 完整音符名 }
 * 
 * 使用标准的12平均律（Equal Temperament）计算
 * 参考：MIDI note number = 69 + 12 * log2(frequency / 440)
 */
export function frequencyToNote(frequency) {
  if (!frequency || frequency < 20 || !isFinite(frequency)) {
    return { note: '', octave: 0, cents: 0, fullNote: '' };
  }

  // 使用精确的数学公式：MIDI note = 69 + 12 * log2(freq / 440)
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  const noteIndex = Math.round(noteNum) + 69; // MIDI note number (C4 = 60, A4 = 69)
  
  // 计算音分偏移（cents），范围 -50 到 +50
  const cents = Math.round((noteNum - Math.round(noteNum)) * 100);
  
  // 计算八度和音符名
  const octave = Math.floor(noteIndex / 12) - 1;
  const noteIndexInOctave = ((noteIndex % 12) + 12) % 12; // 确保非负数
  const note = NOTE_NAMES[noteIndexInOctave];
  const fullNote = `${note}${octave}`;

  return { note, octave, cents, fullNote };
}

/**
 * 获取声部类型（基于专业声乐分类标准）
 * @param {string} lowestNote - 最低音
 * @param {string} highestNote - 最高音
 * @returns {string} 声部类型
 * 
 * 参考标准：
 * - Bass: E2-E4 (典型范围)
 * - Baritone: A2-A4 (典型范围)
 * - Tenor: C3-C5 (典型范围)
 * - Alto: F3-F5 (典型范围)
 * - Mezzo-Soprano: A3-A5 (典型范围)
 * - Soprano: C4-C6 (典型范围)
 */
export function getVoiceType(lowestNote, highestNote) {
  const noteToMidi = (noteStr) => {
    const match = noteStr.match(/([A-G]#?)(\d+)/);
    if (!match) return 0;
    const [, note, octave] = match;
    const noteIndex = NOTE_NAMES.indexOf(note);
    if (noteIndex === -1) return 0;
    return (parseInt(octave) + 1) * 12 + noteIndex;
  };

  const lowestMidi = noteToMidi(lowestNote);
  const highestMidi = noteToMidi(highestNote);
  
  // 验证输入有效性
  if (lowestMidi === 0 || highestMidi === 0 || lowestMidi >= highestMidi) {
    console.warn('Invalid note range for voice type classification');
    return 'Unknown';
  }

  const avgMidi = (lowestMidi + highestMidi) / 2;

  // 专业声部分类标准（基于音域中心/Tessitura）
  // Bass: E2-E4 (40-64), Center ~52 (E3)
  // Baritone: A2-A4 (45-69), Center ~57 (A3)
  // Tenor: C3-C5 (48-72), Center ~60 (C4)
  // Alto: F3-F5 (53-77), Center ~65 (F4)
  // Mezzo-Soprano: A3-A5 (57-81), Center ~69 (A4)
  // Soprano: C4-C6 (60-84), Center ~72 (C5)

  if (avgMidi < 54) {
    return 'Bass';
  } else if (avgMidi < 59) {
    return 'Baritone';
  } else if (avgMidi < 63) {
    return 'Tenor';
  } else if (avgMidi < 67) {
    return 'Alto';
  } else if (avgMidi < 71) {
    return 'Mezzo-Soprano';
  } else {
    return 'Soprano';
  }
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
      console.log('🎤 Starting microphone initialization...');

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('❌ getUserMedia is not supported in this browser');

        // Try legacy API
        const getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;

        if (!getUserMedia) {
          throw new Error('getUserMedia is not supported in this browser');
        }

        console.log('⚠️ Using legacy getUserMedia API');

        // Use legacy API with Promise wrapper
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, { audio: true },
            (stream) => {
              this.initializeAudioContext(stream);
              resolve({ success: true });
            },
            (error) => {
              console.error('❌ Legacy getUserMedia failed:', error);
              reject(error);
            }
          );
        });
      }

      console.log('✅ getUserMedia is supported');
      console.log('🔒 Current protocol:', window.location.protocol);
      console.log('🌐 Current host:', window.location.host);

      // Check if we're on HTTPS or localhost
      const isSecureContext = window.isSecureContext;
      console.log('🔐 Is secure context:', isSecureContext);

      // Detect mobile browser
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log('📱 Is mobile browser:', isMobile);

      if (!isSecureContext && window.location.protocol !== 'http:') {
        console.warn('⚠️ Not in secure context, getUserMedia may fail');
        // On mobile, this is critical - throw a clear error
        if (isMobile) {
          throw new Error('Microphone access requires HTTPS. Please access this site via a secure connection (https://).');
        }
      }

      // For mobile browsers, use minimal constraints for better compatibility
      // Some mobile browsers have issues with detailed audio constraints
      console.log('📱 Requesting microphone access...');
      let stream;

      if (isMobile) {
        // Mobile browsers: use minimal constraints
        console.log('📱 Using minimal constraints for mobile compatibility');
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('✅ Got microphone stream on mobile');
        } catch (mobileError) {
          console.error('❌ Mobile getUserMedia failed:', mobileError);
          // Provide more helpful error message for mobile
          if (mobileError.name === 'NotAllowedError' || mobileError.name === 'PermissionDeniedError') {
            throw new Error('Microphone permission denied. Please allow microphone access in your browser settings and try again.');
          }
          throw mobileError;
        }
      } else {
        // Desktop: try simple first, then detailed
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('✅ Got microphone stream with simple constraints');
        } catch (simpleError) {
          console.warn('⚠️ Simple constraints failed, trying with detailed constraints:', simpleError);

          // Try with detailed constraints
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: false
              }
            });
            console.log('✅ Got microphone stream with detailed constraints');
          } catch (detailedError) {
            console.error('❌ Detailed constraints also failed:', detailedError);
            throw simpleError; // Throw the original error
          }
        }
      }

      // Initialize audio context
      this.initializeAudioContext(stream);

      console.log('✅ Microphone initialization complete');
      return { success: true };

    } catch (error) {
      console.error('❌ Microphone initialization failed:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);

      // 返回详细的错误信息
      return {
        success: false,
        error: error.message,
        errorName: error.name, // NotAllowedError, NotFoundError, etc.
        errorType: this.getErrorType(error)
      };
    }
  }

  /**
   * 初始化音频上下文
   */
  initializeAudioContext(stream) {
    console.log('🎵 Initializing audio context...');

    // 创建音频上下文
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log('✅ Audio context created, sample rate:', this.audioContext.sampleRate);

    // 创建音频源
    this.microphone = this.audioContext.createMediaStreamSource(stream);
    console.log('✅ Media stream source created');

    // 创建分析器
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.microphone.connect(this.analyser);
    console.log('✅ Analyser created and connected');

    // 创建音高检测器
    this.detector = PitchDetector.forFloat32Array(this.analyser.fftSize);
    this.buffer = new Float32Array(this.analyser.fftSize);
    
    // 初始化平滑缓冲区
    this.pitchBuffer = [];
    this.BUFFER_SIZE = 5; // 使用5个样本的中值滤波
    
    console.log('✅ Pitch detector created');
  }

  /**
   * 获取中值音高（去除异常值）
   */
  getMedianPitch(pitches) {
    if (pitches.length === 0) return null;
    const sorted = [...pitches].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }

  /**
   * 获取错误类型
   */
  getErrorType(error) {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return 'permission_denied';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'no_device';
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'device_in_use';
    } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
      return 'constraints_error';
    } else if (error.name === 'TypeError') {
      return 'type_error';
    } else if (error.name === 'SecurityError') {
      return 'security_error';
    } else {
      return 'unknown_error';
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
        
        // 添加到平滑缓冲区
        this.pitchBuffer.push(pitch);
        if (this.pitchBuffer.length > this.BUFFER_SIZE) {
          this.pitchBuffer.shift();
        }

        // 计算平滑后的音高
        const smoothedPitch = this.getMedianPitch(this.pitchBuffer);
        
        callback(smoothedPitch, clarity, volume);
      } else {
        // 如果信号丢失或不清晰，清空缓冲区以避免“拖尾”
        // 但不要立即清空，允许短暂的信号丢失（可选，这里选择清空以保持反应灵敏）
        this.pitchBuffer = [];
        callback(null, clarity, volume);
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

