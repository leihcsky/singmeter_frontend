/**
 * 音高检测工具类
 * 使用 Web Audio API 和 pitchy 库进行实时音高检测
 */

import { PitchDetector } from 'pitchy';

// 音符频率映射表 (A4 = 440Hz)
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function computeRms(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  return Math.sqrt(sum / buffer.length);
}

function isLikelyPowerLineHum(frequency) {
  if (!frequency || frequency < 45) return false;
  for (const base of [50, 60]) {
    const ratio = frequency / base;
    const harmonic = Math.round(ratio);
    if (harmonic >= 1 && harmonic <= 20 && Math.abs(ratio - harmonic) < 0.03) {
      return true;
    }
  }
  return false;
}

function getClarityThreshold(pitch, tracking = false) {
  let t;
  if (pitch < 150) t = 0.84;
  else if (pitch < 300) t = 0.87;
  else t = 0.90;
  return tracking ? Math.max(0.76, t - 0.07) : t;
}

const MIN_HUMAN_FREQUENCY = 65;
const MAX_HUMAN_FREQUENCY = 1318;

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
        // Desktop: prefer noise suppression for cleaner pitch reads; fall back if needed
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: false,
            },
          });
          console.log('✅ Got microphone stream with noise suppression');
        } catch (detailedError) {
          console.warn('⚠️ Detailed constraints failed, trying simple audio:', detailedError);
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('✅ Got microphone stream with simple constraints');
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
    this.BUFFER_SIZE = 3;
    this.consecutiveValidFrames = 0;
    this.isTracking = false;
    this.lastSmoothedPitch = null;
    this.silenceFrames = 0;
    this.missFrames = 0;
    this.calibrated = false;
    this.calibrationSamples = [];
    this.noiseFloorRms = 0.005;
    this.volumeThreshold = 1.0;
    this.MIN_CONSECUTIVE_FRAMES = 2;
    this.CALIBRATION_FRAMES = 25;
    this.SILENCE_FRAMES_TO_UNLOCK = 12;
    this.MAX_MISS_FRAMES_WHILE_LOUD = 18;
    
    console.log('✅ Pitch detector created');
  }

  /**
   * 根据环境噪声校准音量门槛（启动后约 0.5s 内完成）
   */
  calibrateNoiseFloor(rms) {
    this.calibrationSamples.push(rms);
    if (this.calibrationSamples.length < this.CALIBRATION_FRAMES) {
      return false;
    }

    const sorted = [...this.calibrationSamples].sort((a, b) => a - b);
    const p75 = sorted[Math.floor(sorted.length * 0.75)] ?? 0.005;
    const p90 = sorted[Math.floor(sorted.length * 0.9)] ?? p75;
    this.noiseFloorRms = p75;
    // 信号需明显高于环境底噪；下限 1.0 避免安静房间误触发
    this.volumeThreshold = Math.max(1.0, p90 * 100 * 4.5);
    this.calibrated = true;
    console.log(
      `✅ Noise calibrated — floor RMS: ${this.noiseFloorRms.toFixed(5)}, volume threshold: ${this.volumeThreshold.toFixed(2)}`
    );
    return true;
  }

  /**
   * 判断当前帧是否为可信的人声 pitch
   * @param {boolean} tracking 已进入跟唱模式时放宽门槛
   */
  isValidPitch(pitch, clarity, volume, tracking = false) {
    if (!pitch || pitch <= 0) return false;
    if (pitch < MIN_HUMAN_FREQUENCY || pitch > MAX_HUMAN_FREQUENCY) return false;

    const clarityMin = getClarityThreshold(pitch, tracking);
    const volumeMin = this.volumeThreshold * (tracking ? 0.65 : 1);

    if (clarity <= clarityMin) return false;
    if (volume <= volumeMin) return false;

    const humVolumeCap = this.volumeThreshold * (tracking ? 2.2 : 1.8);
    if (isLikelyPowerLineHum(pitch) && volume < humVolumeCap) {
      return false;
    }

    return true;
  }

  /**
   * 跟唱中偶发弱帧：仅过滤明显无效值，避免指针卡住
   */
  isLoosePitch(pitch, clarity, volume) {
    if (!pitch || pitch <= 0) return false;
    if (pitch < MIN_HUMAN_FREQUENCY || pitch > MAX_HUMAN_FREQUENCY) return false;
    if (volume <= this.volumeThreshold * 0.55) return false;
    if (clarity <= 0.72) return false;
    if (isLikelyPowerLineHum(pitch) && volume < this.volumeThreshold * 1.5) return false;
    return true;
  }

  isVolumeActive(volume) {
    return volume > this.volumeThreshold * 0.65;
  }

  pushPitchSample(pitch) {
    this.pitchBuffer.push(pitch);
    if (this.pitchBuffer.length > this.BUFFER_SIZE) {
      this.pitchBuffer.shift();
    }
  }

  emitSmoothedPitch() {
    const minBuffer = this.isTracking ? 2 : 3;
    if (this.pitchBuffer.length < minBuffer) return null;
    this.lastSmoothedPitch = this.getMedianPitch(this.pitchBuffer);
    return this.lastSmoothedPitch;
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
    this.calibrated = false;
    this.calibrationSamples = [];
    this.pitchBuffer = [];
    this.consecutiveValidFrames = 0;
    this.isTracking = false;
    this.lastSmoothedPitch = null;
    this.silenceFrames = 0;
    this.missFrames = 0;
    console.log('✅ Started pitch detection');

    const detect = () => {
      if (!this.isRunning) return;

      this.analyser.getFloatTimeDomainData(this.buffer);
      const [pitch, clarity] = this.detector.findPitch(this.buffer, this.audioContext.sampleRate);
      const rms = computeRms(this.buffer);
      const volume = rms * 100;

      if (!this.calibrated) {
        this.calibrateNoiseFloor(rms);
        callback(null, clarity, volume);
        requestAnimationFrame(detect);
        return;
      }

      const now = Date.now();
      if (!this.lastDebugTime || now - this.lastDebugTime > 2000) {
        this.lastDebugTime = now;
        console.log(
          `🎵 Pitch: ${pitch?.toFixed(1) || 'null'} Hz, Clarity: ${clarity.toFixed(2)}, Volume: ${volume.toFixed(2)}, Gate: ${this.volumeThreshold.toFixed(2)}, Tracking: ${this.isTracking}`
        );
      }

      const volumeActive = this.isVolumeActive(volume);
      const strictValid = this.isValidPitch(pitch, clarity, volume, false);
      const trackingValid = this.isTracking && this.isValidPitch(pitch, clarity, volume, true);

      if (volumeActive) {
        this.silenceFrames = 0;

        if (strictValid || trackingValid) {
          this.missFrames = 0;
          this.consecutiveValidFrames += 1;
          if (this.consecutiveValidFrames >= this.MIN_CONSECUTIVE_FRAMES) {
            this.isTracking = true;
          }

          this.pushPitchSample(pitch);
          const smoothed = this.emitSmoothedPitch();
          callback(smoothed, clarity, volume);
        } else if (this.isTracking) {
          this.missFrames += 1;

          if (this.isLoosePitch(pitch, clarity, volume)) {
            this.missFrames = 0;
            this.pushPitchSample(pitch);
            const smoothed = this.emitSmoothedPitch();
            callback(smoothed ?? this.lastSmoothedPitch, clarity, volume);
          } else if (this.missFrames <= this.MAX_MISS_FRAMES_WHILE_LOUD && this.lastSmoothedPitch) {
            // 音量仍在、偶发弱帧：继续输出上次平滑值，避免指针停住
            callback(this.lastSmoothedPitch, clarity, volume);
          } else {
            callback(this.lastSmoothedPitch, clarity, volume);
          }
        } else {
          this.consecutiveValidFrames = 0;
          callback(null, clarity, volume);
        }
      } else {
        this.silenceFrames += 1;
        this.missFrames = 0;

        if (this.silenceFrames >= this.SILENCE_FRAMES_TO_UNLOCK) {
          this.isTracking = false;
          this.consecutiveValidFrames = 0;
          this.pitchBuffer = [];
        }

        callback(null, clarity, volume);
      }

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

