// localStorage utilities for quiz state persistence

const QUIZ_STATE_KEY = 'quiz_state';
const AUTH_STATE_KEY = 'auth_state';

// Quiz State Management
export const saveQuizState = (state) => {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

export const loadQuizState = () => {
  try {
    const state = localStorage.getItem(QUIZ_STATE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Failed to load quiz state:', error);
    return null;
  }
};

export const clearQuizState = () => {
  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz state:', error);
  }
};

// Auth State Management
export const saveAuthState = (state) => {
  try {
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save auth state:', error);
  }
};

export const loadAuthState = () => {
  try {
    const state = localStorage.getItem(AUTH_STATE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Failed to load auth state:', error);
    return null;
  }
};

export const clearAuthState = () => {
  try {
    localStorage.removeItem(AUTH_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear auth state:', error);
  }
};
