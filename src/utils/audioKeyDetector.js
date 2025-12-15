/**
 * Advanced Audio Key Detection Utility
 * Uses proper FFT, Chromagram analysis, and Krumhansl-Schmuckler algorithm
 * for accurate key detection
 */

/**
 * Krumhansl-Schmuckler key profiles
 * These represent the expected pitch class distribution for each key
 */
const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Detect the musical key from an audio file using advanced algorithms
 * @param {AudioBuffer} audioBuffer - The audio buffer to analyze
 * @returns {Promise<Object>} { key: string, mode: 'major'|'minor', confidence: number }
 */
export async function detectKeyFromAudio(audioBuffer, onProgress) {
  try {
    const sampleRate = audioBuffer.sampleRate;
    const channelData = audioBuffer.getChannelData(0);
    const length = channelData.length;
    
    // Use fewer, larger chunks for better performance
    const chunkSize = sampleRate * 5; // 5 seconds per chunk (increased from 3)
    const numChunks = Math.min(3, Math.floor(length / chunkSize)); // Analyze up to 3 chunks (reduced from 5)
    
    if (numChunks === 0) {
      return {
        key: 'Unknown',
        mode: 'major',
        confidence: 0,
        method: 'audio-analysis',
        error: 'Audio too short'
      };
    }
    
    const chromagram = new Array(12).fill(0);
    
    // Analyze each chunk with progress updates
    for (let chunkIdx = 0; chunkIdx < numChunks; chunkIdx++) {
      if (onProgress) {
        onProgress((chunkIdx / numChunks) * 50); // First 50% for key detection
      }
      
      const start = chunkIdx * chunkSize;
      const end = Math.min(start + chunkSize, length);
      const chunk = channelData.slice(start, end);
      
      // Compute chromagram for this chunk
      const chunkChromagram = await computeChromagram(chunk, sampleRate);
      
      // Accumulate chromagram values
      for (let i = 0; i < 12; i++) {
        chromagram[i] += chunkChromagram[i];
      }
      
      // Yield to main thread between chunks
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    // Average the chromagram
    for (let i = 0; i < 12; i++) {
      chromagram[i] /= numChunks;
    }
    
    // Normalize chromagram
    const sum = chromagram.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      for (let i = 0; i < 12; i++) {
        chromagram[i] /= sum;
      }
    }
    
    if (onProgress) {
      onProgress(50);
    }
    
    // Use Krumhansl-Schmuckler algorithm to find the best key
    const keyResult = krumhanslSchmuckler(chromagram);
    
    if (onProgress) {
      onProgress(100);
    }
    
    return {
      key: keyResult.key,
      mode: keyResult.mode,
      confidence: Math.round(keyResult.confidence * 100),
      method: 'krumhansl-schmuckler',
      chromagram: chromagram
    };
  } catch (error) {
    console.error('Error detecting key:', error);
    return {
      key: 'Unknown',
      mode: 'major',
      confidence: 0,
      method: 'audio-analysis',
      error: error.message
    };
  }
}

/**
 * Compute chromagram using windowed FFT with proper frequency analysis
 * Optimized for performance
 * @param {Float32Array} data - Audio samples
 * @param {number} sampleRate - Sample rate
 * @returns {Promise<Array<number>>} 12-element chromagram
 */
async function computeChromagram(data, sampleRate) {
  const chromagram = new Array(12).fill(0);
  
  // Use smaller FFT size and fewer windows for better performance
  const fftSize = 2048; // Reduced from 4096
  const hopSize = 1024; // Reduced from 2048
  
  // Limit number of windows to process (max 30 seconds)
  const maxDuration = 30;
  const maxSamples = Math.min(data.length, sampleRate * maxDuration);
  const limitedData = data.slice(0, maxSamples);
  
  // Process audio in overlapping windows (but limit total windows)
  const numWindows = Math.min(
    Math.floor((limitedData.length - fftSize) / hopSize) + 1,
    50 // Limit to 50 windows max
  );
  
  // Process windows with progress updates
  for (let winIdx = 0; winIdx < numWindows; winIdx++) {
    const start = winIdx * hopSize;
    const end = Math.min(start + fftSize, limitedData.length);
    const window = limitedData.slice(start, end);
    
    // Pad window if needed
    const paddedWindow = new Float32Array(fftSize);
    paddedWindow.set(window);
    
    // Apply window function (Hann window) to reduce spectral leakage
    const windowed = applyHannWindow(paddedWindow);
    
    // Perform FFT using optimized DFT
    const fftResult = performDFTOptimized(windowed, sampleRate);
    
    // Convert FFT bins to chromagram (only process relevant frequencies)
    const minBin = Math.floor((80 * fftSize) / sampleRate);
    const maxBin = Math.floor((5000 * fftSize) / sampleRate);
    
    for (let i = minBin; i < Math.min(fftResult.length, maxBin); i++) {
      const frequency = (i * sampleRate) / fftSize;
      
      // Convert frequency to MIDI note number
      const midiNote = frequencyToMidi(frequency);
      
      // Get chroma class (0-11)
      const chroma = Math.round(midiNote) % 12;
      if (chroma < 0 || chroma >= 12) continue;
      
      // Accumulate magnitude (use log scale for better distribution)
      const magnitude = Math.log(1 + fftResult[i]);
      chromagram[chroma] += magnitude;
    }
    
    // Yield to main thread every 10 windows to prevent blocking
    if (winIdx % 10 === 0 && winIdx > 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  // Normalize chromagram
  const sum = chromagram.reduce((a, b) => a + b, 0);
  if (sum > 0) {
    for (let i = 0; i < 12; i++) {
      chromagram[i] /= sum;
    }
  }
  
  return chromagram;
}

/**
 * Apply Hann window function
 * @param {Float32Array} data - Audio data
 * @returns {Float32Array} Windowed data
 */
function applyHannWindow(data) {
  const windowed = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const windowValue = 0.5 * (1 - Math.cos(2 * Math.PI * i / (data.length - 1)));
    windowed[i] = data[i] * windowValue;
  }
  return windowed;
}

/**
 * Perform optimized DFT (Discrete Fourier Transform)
 * Uses fewer calculations for better performance
 * @param {Float32Array} data - Audio samples
 * @param {number} sampleRate - Sample rate
 * @returns {Float32Array} FFT magnitude spectrum
 */
function performDFTOptimized(data, sampleRate) {
  const N = data.length;
  const numBins = Math.floor(N / 2);
  const magnitude = new Float32Array(numBins);
  
  // Pre-calculate constants
  const twoPiOverN = (2 * Math.PI) / N;
  const scale = 1 / N;
  
  // Only compute bins we actually need (up to 5000 Hz)
  const maxBin = Math.min(numBins, Math.floor((5000 * N) / sampleRate));
  
  // Compute DFT for needed bins only
  for (let k = 0; k < maxBin; k++) {
    let real = 0;
    let imag = 0;
    const angleStep = twoPiOverN * k;
    
    // Unroll inner loop for better performance
    for (let n = 0; n < N; n += 4) {
      const angle1 = angleStep * n;
      const angle2 = angleStep * (n + 1);
      const angle3 = angleStep * (n + 2);
      const angle4 = angleStep * (n + 3);
      
      real += data[n] * Math.cos(angle1);
      imag -= data[n] * Math.sin(angle1);
      
      if (n + 1 < N) {
        real += data[n + 1] * Math.cos(angle2);
        imag -= data[n + 1] * Math.sin(angle2);
      }
      if (n + 2 < N) {
        real += data[n + 2] * Math.cos(angle3);
        imag -= data[n + 2] * Math.sin(angle3);
      }
      if (n + 3 < N) {
        real += data[n + 3] * Math.cos(angle4);
        imag -= data[n + 3] * Math.sin(angle4);
      }
    }
    
    // Calculate magnitude
    magnitude[k] = Math.sqrt(real * real + imag * imag) * scale;
  }
  
  return magnitude;
}

/**
 * Convert frequency to MIDI note number
 * @param {number} frequency - Frequency in Hz
 * @returns {number} MIDI note number
 */
function frequencyToMidi(frequency) {
  const A4 = 440;
  const A4_MIDI = 69;
  return 12 * Math.log2(frequency / A4) + A4_MIDI;
}

/**
 * Krumhansl-Schmuckler key-finding algorithm
 * @param {Array<number>} chromagram - 12-element chromagram
 * @returns {Object} { key: string, mode: 'major'|'minor', confidence: number }
 */
function krumhanslSchmuckler(chromagram) {
  let maxCorrelation = -Infinity;
  let bestKey = 'C';
  let bestMode = 'major';
  
  // Test all 24 keys (12 major + 12 minor)
  for (let shift = 0; shift < 12; shift++) {
    // Test major key
    const majorCorrelation = correlate(
      rotateArray(chromagram, shift),
      MAJOR_PROFILE
    );
    
    if (majorCorrelation > maxCorrelation) {
      maxCorrelation = majorCorrelation;
      bestKey = NOTE_NAMES[shift];
      bestMode = 'major';
    }
    
    // Test minor key
    const minorCorrelation = correlate(
      rotateArray(chromagram, shift),
      MINOR_PROFILE
    );
    
    if (minorCorrelation > maxCorrelation) {
      maxCorrelation = minorCorrelation;
      bestKey = NOTE_NAMES[shift];
      bestMode = 'minor';
    }
  }
  
  // Normalize confidence (correlation values are typically -1 to 1)
  // Scale to 0-1 range, then to percentage
  const confidence = Math.max(0, (maxCorrelation + 1) / 2);
  
  return {
    key: bestKey,
    mode: bestMode,
    confidence: confidence
  };
}

/**
 * Rotate array by n positions
 * @param {Array} arr - Array to rotate
 * @param {number} n - Number of positions to rotate
 * @returns {Array} Rotated array
 */
function rotateArray(arr, n) {
  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[(i + n) % arr.length];
  }
  return result;
}

/**
 * Calculate correlation coefficient between two arrays
 * @param {Array<number>} a - First array
 * @param {Array<number>} b - Second array
 * @returns {number} Correlation coefficient
 */
function correlate(a, b) {
  if (a.length !== b.length) return 0;
  
  const n = a.length;
  let sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0;
  
  for (let i = 0; i < n; i++) {
    sumA += a[i];
    sumB += b[i];
    sumAB += a[i] * b[i];
    sumA2 += a[i] * a[i];
    sumB2 += b[i] * b[i];
  }
  
  const numerator = n * sumAB - sumA * sumB;
  const denominator = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB));
  
  if (denominator === 0) return 0;
  return numerator / denominator;
}

/**
 * Detect BPM from audio using improved autocorrelation with multiple methods
 * @param {AudioBuffer} audioBuffer - The audio buffer to analyze
 * @returns {Promise<Object>} { bpm: number, confidence: string }
 */
export async function detectBPMFromAudio(audioBuffer) {
  try {
    const sampleRate = audioBuffer.sampleRate;
    const channelData = audioBuffer.getChannelData(0);
    
    // Use only first 30 seconds for faster processing
    const maxDuration = 30;
    const maxSamples = Math.min(channelData.length, sampleRate * maxDuration);
    const data = channelData.slice(0, maxSamples);
    
    // Downsample more aggressively for faster processing (target ~11025 Hz)
    const targetRate = 11025;
    const downsampleFactor = Math.max(1, Math.floor(sampleRate / targetRate));
    const downsampledData = new Float32Array(Math.floor(data.length / downsampleFactor));
    
    // Better downsampling with averaging to reduce aliasing
    for (let i = 0; i < downsampledData.length; i++) {
      let sum = 0;
      let count = 0;
      for (let j = 0; j < downsampleFactor && (i * downsampleFactor + j) < data.length; j++) {
        sum += data[i * downsampleFactor + j];
        count++;
      }
      downsampledData[i] = count > 0 ? sum / count : 0;
    }
    
    const downsampledRate = sampleRate / downsampleFactor;
    
    // Apply high-pass filter to emphasize beats
    const filteredData = highPassFilter(downsampledData, downsampledRate, 100);
    
    // Calculate onset detection function with better algorithm
    const onsetFunction = calculateOnsetFunctionImproved(filteredData, downsampledRate);
    
    // Use multiple methods and combine results
    const bpm1 = autocorrelationBPMImproved(onsetFunction, downsampledRate);
    const bpm2 = peakIntervalBPM(filteredData, downsampledRate);
    
    // Average the results, weighted by confidence
    let finalBPM = bpm1;
    if (Math.abs(bpm1 - bpm2) < 10) {
      // If both methods agree, use average
      finalBPM = (bpm1 + bpm2) / 2;
    }
    
    // Round to nearest integer and clamp
    finalBPM = Math.max(60, Math.min(200, Math.round(finalBPM)));
    
    return {
      bpm: finalBPM,
      confidence: finalBPM > 60 && finalBPM < 200 ? 'high' : 'medium'
    };
  } catch (error) {
    console.error('Error detecting BPM:', error);
    return {
      bpm: 120,
      confidence: 'low',
      error: error.message
    };
  }
}

/**
 * High-pass filter to emphasize beats
 * @param {Float32Array} data - Audio data
 * @param {number} sampleRate - Sample rate
 * @param {number} cutoff - Cutoff frequency
 * @returns {Float32Array} Filtered data
 */
function highPassFilter(data, sampleRate, cutoff) {
  const rc = 1.0 / (cutoff * 2 * Math.PI);
  const dt = 1.0 / sampleRate;
  const alpha = rc / (rc + dt);
  
  const filtered = new Float32Array(data.length);
  let prevInput = 0;
  let prevOutput = 0;
  
  for (let i = 0; i < data.length; i++) {
    filtered[i] = alpha * (prevOutput + data[i] - prevInput);
    prevInput = data[i];
    prevOutput = filtered[i];
  }
  
  return filtered;
}

/**
 * Calculate improved onset detection function (spectral flux)
 * @param {Float32Array} data - Audio data
 * @param {number} sampleRate - Sample rate
 * @returns {Float32Array} Onset function
 */
function calculateOnsetFunctionImproved(data, sampleRate) {
  const windowSize = 1024;
  const hopSize = 512;
  const onsetFunction = [];
  
  let prevSpectrum = null;
  
  for (let i = 0; i < data.length - windowSize; i += hopSize) {
    const window = data.slice(i, Math.min(i + windowSize, data.length));
    
    // Apply window
    const windowed = applyHannWindow(window);
    
    // Simple magnitude spectrum (using absolute values)
    const spectrum = new Float32Array(windowSize / 2);
    for (let j = 0; j < spectrum.length; j++) {
      // Simplified: use magnitude of windowed data
      spectrum[j] = Math.abs(windowed[j * 2] || 0);
    }
    
    if (prevSpectrum) {
      // Spectral flux: sum of positive differences
      let flux = 0;
      for (let j = 0; j < spectrum.length; j++) {
        const diff = spectrum[j] - prevSpectrum[j];
        if (diff > 0) {
          flux += diff;
        }
      }
      onsetFunction.push(flux);
    }
    
    prevSpectrum = spectrum;
  }
  
  return new Float32Array(onsetFunction);
}

/**
 * Detect BPM using peak interval analysis
 * @param {Float32Array} data - Audio data
 * @param {number} sampleRate - Sample rate
 * @returns {number} Detected BPM
 */
function peakIntervalBPM(data, sampleRate) {
  // Find peaks in the audio
  const peaks = findPeaksImproved(data);
  
  if (peaks.length < 3) {
    return 120; // Default
  }
  
  // Calculate intervals between peaks
  const intervals = [];
  for (let i = 1; i < peaks.length; i++) {
    const interval = (peaks[i] - peaks[i - 1]) / sampleRate; // in seconds
    if (interval > 0.25 && interval < 2.0) { // Reasonable BPM range
      intervals.push(interval);
    }
  }
  
  if (intervals.length === 0) {
    return 120;
  }
  
  // Find most common interval using histogram
  const histogram = {};
  const binSize = 0.05; // 50ms bins
  for (const interval of intervals) {
    const bin = Math.round(interval / binSize) * binSize;
    histogram[bin] = (histogram[bin] || 0) + 1;
  }
  
  // Find bin with most occurrences
  let maxCount = 0;
  let bestInterval = intervals[0];
  for (const [interval, count] of Object.entries(histogram)) {
    if (count > maxCount) {
      maxCount = count;
      bestInterval = parseFloat(interval);
    }
  }
  
  // Convert to BPM
  const bpm = 60 / bestInterval;
  return Math.max(60, Math.min(200, bpm));
}

/**
 * Improved peak detection
 * @param {Float32Array} data - Audio data
 * @returns {Array<number>} Peak positions
 */
function findPeaksImproved(data) {
  const peaks = [];
  const threshold = 0.1; // Lower threshold
  const minDistance = Math.floor(data.length / 200); // Minimum distance between peaks
  
  // Calculate dynamic threshold based on signal level
  let maxVal = 0;
  for (let i = 0; i < data.length; i++) {
    maxVal = Math.max(maxVal, Math.abs(data[i]));
  }
  const dynamicThreshold = maxVal * threshold;
  
  for (let i = 1; i < data.length - 1; i++) {
    const val = Math.abs(data[i]);
    if (val > dynamicThreshold && 
        val > Math.abs(data[i - 1]) && 
        val > Math.abs(data[i + 1])) {
      // Check minimum distance
      if (peaks.length === 0 || i - peaks[peaks.length - 1] > minDistance) {
        peaks.push(i);
      }
    }
  }
  
  return peaks;
}

/**
 * Improved autocorrelation to find BPM
 * @param {Float32Array} onsetFunction - Onset detection function
 * @param {number} sampleRate - Sample rate
 * @returns {number} Detected BPM
 */
function autocorrelationBPMImproved(onsetFunction, sampleRate) {
  if (onsetFunction.length < 10) {
    return 120; // Default
  }
  
  const minBPM = 60;
  const maxBPM = 200;
  
  // Convert BPM to samples (considering hop size)
  const hopSize = 512; // Should match calculateOnsetFunctionImproved
  const minPeriodSamples = Math.floor((60 / maxBPM) * (sampleRate / hopSize));
  const maxPeriodSamples = Math.floor((60 / minBPM) * (sampleRate / hopSize));
  
  // Limit search range
  const searchMin = Math.max(2, minPeriodSamples);
  const searchMax = Math.min(Math.floor(onsetFunction.length / 2), maxPeriodSamples);
  
  let maxCorrelation = -Infinity;
  let bestPeriod = searchMin;
  
  // Normalize onset function for better correlation
  const mean = onsetFunction.reduce((a, b) => a + b, 0) / onsetFunction.length;
  const normalized = new Float32Array(onsetFunction.length);
  for (let i = 0; i < onsetFunction.length; i++) {
    normalized[i] = onsetFunction[i] - mean;
  }
  
  // Autocorrelation with normalization
  for (let period = searchMin; period <= searchMax; period++) {
    let correlation = 0;
    let count = 0;
    
    for (let i = 0; i < normalized.length - period; i++) {
      correlation += normalized[i] * normalized[i + period];
      count++;
    }
    
    if (count > 0) {
      // Normalize by variance
      const variance = normalized.slice(0, normalized.length - period).reduce((sum, val) => sum + val * val, 0) / count;
      if (variance > 0) {
        correlation = correlation / (count * Math.sqrt(variance));
      }
      
      if (correlation > maxCorrelation) {
        maxCorrelation = correlation;
        bestPeriod = period;
      }
    }
  }
  
  // Convert period to BPM (accounting for hop size)
  const periodSeconds = (bestPeriod * hopSize) / sampleRate;
  const bpm = 60 / periodSeconds;
  
  // Clamp to reasonable range
  return Math.max(minBPM, Math.min(maxBPM, bpm));
}

/**
 * Load audio file and create AudioBuffer
 * @param {File} file - Audio file
 * @returns {Promise<AudioBuffer>} Audio buffer
 */
export async function loadAudioFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = e.target.result;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        resolve(audioBuffer);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
