/**
 * Text-to-Speech utility using browser's Web Speech API
 * No external dependencies required
 */

let currentUtterance = null;

/**
 * Speak text using browser's speech synthesis
 * @param {string} text - Text to speak
 * @param {string} lang - Language code (default: vi-VN for Vietnamese)
 */
export const speak = (text, lang = 'vi-VN') => {
  // Stop any ongoing speech
  if (currentUtterance) {
    window.speechSynthesis.cancel();
  }

  // Check if browser supports speech synthesis
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not supported in this browser');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8; // Slower for better comprehension
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
};
