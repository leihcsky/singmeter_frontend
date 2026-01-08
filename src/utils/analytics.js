/**
 * Google Analytics Event Utility
 * Wrapper around global gtag function
 */

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const GA_CATEGORIES = {
  USER_INTERACTION: 'User Interaction',
  VOCAL_TEST: 'Vocal Range Test',
  PITCH_DETECTOR: 'Pitch Detector',
  NAVIGATION: 'Navigation',
};

export const GA_ACTIONS = {
  CLICK: 'Click',
  START_TEST: 'Start Test',
  DETECT_NOTE: 'Detect Note',
  START_LISTENING: 'Start Listening',
};
