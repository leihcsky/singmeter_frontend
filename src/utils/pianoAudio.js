/**
 * Realistic Piano Audio Engine
 * Uses Tone.js with real piano samples for authentic sound
 */

import * as Tone from 'tone';

/**
 * Create a realistic piano sound using sampled audio
 * This uses the Salamander Grand Piano samples hosted on Tone.js CDN
 */
export class RealisticPianoAudio {
  constructor() {
    this.sampler = null;
    this.initialized = false;
    this.isLoading = false;
  }

  /**
   * Initialize the sampler with piano samples
   */
  async initialize() {
    if (this.initialized || this.isLoading) return;

    this.isLoading = true;

    try {
      // Create sampler with Salamander Grand Piano samples
      // Using a subset of notes for faster loading
      this.sampler = new Tone.Sampler({
        urls: {
          A0: "A0.mp3",
          C1: "C1.mp3",
          "D#1": "Ds1.mp3",
          "F#1": "Fs1.mp3",
          A1: "A1.mp3",
          C2: "C2.mp3",
          "D#2": "Ds2.mp3",
          "F#2": "Fs2.mp3",
          A2: "A2.mp3",
          C3: "C3.mp3",
          "D#3": "Ds3.mp3",
          "F#3": "Fs3.mp3",
          A3: "A3.mp3",
          C4: "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          A4: "A4.mp3",
          C5: "C5.mp3",
          "D#5": "Ds5.mp3",
          "F#5": "Fs5.mp3",
          A5: "A5.mp3",
          C6: "C6.mp3",
          "D#6": "Ds6.mp3",
          "F#6": "Fs6.mp3",
          A6: "A6.mp3",
          C7: "C7.mp3",
          "D#7": "Ds7.mp3",
          "F#7": "Fs7.mp3",
          A7: "A7.mp3",
          C8: "C8.mp3"
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/"
      }).toDestination();

      // Wait for samples to load
      await Tone.loaded();

      this.initialized = true;
      this.isLoading = false;
      console.log('🎹 Piano samples loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load piano samples:', error);
      this.isLoading = false;
      throw error;
    }
  }

  /**
   * Convert frequency to note name
   * @param {number} frequency - The frequency in Hz
   * @returns {string} Note name (e.g., "C4", "A#3")
   */
  frequencyToNoteName(frequency) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = 440;
    const C0 = A4 * Math.pow(2, -4.75);
    const halfSteps = Math.round(12 * Math.log2(frequency / C0));
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = halfSteps % 12;
    return noteNames[noteIndex] + octave;
  }

  /**
   * Play a realistic piano note
   * @param {number} frequency - The frequency of the note in Hz
   * @param {number} duration - Duration in seconds (default: 2.0)
   * @param {number} velocity - Note velocity 0-1 (default: 0.7)
   */
  async playNote(frequency, duration = 2.0, velocity = 0.7) {
    // Initialize if not already done
    if (!this.initialized && !this.isLoading) {
      await this.initialize();
    }

    // Wait for initialization to complete
    if (this.isLoading) {
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (this.initialized) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }

    if (!this.sampler) {
      console.error('❌ Sampler not initialized');
      return;
    }

    try {
      // Start Tone.js audio context if not started
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      // Convert frequency to note name
      const noteName = this.frequencyToNoteName(frequency);

      // Play the note with the sampler
      // Tone.js handles the duration automatically
      this.sampler.triggerAttackRelease(noteName, duration, undefined, velocity);

      console.log(`🎹 Playing note: ${noteName} (${frequency.toFixed(2)} Hz)`);
    } catch (error) {
      console.error('❌ Error playing note:', error);
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this.sampler) {
      this.sampler.dispose();
      this.sampler = null;
      this.initialized = false;
    }
  }
}

/**
 * Singleton instance for global use
 */
let globalPianoAudio = null;

/**
 * Get or create the global piano audio instance
 */
export function getGlobalPianoAudio() {
  if (!globalPianoAudio) {
    globalPianoAudio = new RealisticPianoAudio();
  }
  return globalPianoAudio;
}

/**
 * Play a piano note using the global instance
 * @param {number} frequency - The frequency of the note in Hz
 * @param {number} duration - Duration in seconds (default: 2.0)
 * @param {number} velocity - Note velocity 0-1 (default: 0.7)
 */
export async function playPianoNote(frequency, duration = 2.0, velocity = 0.7) {
  const piano = getGlobalPianoAudio();
  await piano.playNote(frequency, duration, velocity);
}

