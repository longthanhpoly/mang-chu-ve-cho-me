// Quiz Logic and State Machine

import { getQuizItems } from '../data/lessons';

// Quiz Configuration
export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 10,
  POINTS_PER_QUESTION: 10,
  MAX_SCORE: 100,
  TIME_PER_QUESTION: 60, // seconds
  OPTIONS_PER_QUESTION: 4
};

// Quiz State Machine States
export const QUIZ_STATES = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  REVIEWING: 'REVIEWING'
};

/**
 * Generate random quiz questions from lesson data
 * @returns {Array} Array of 10 quiz questions
 */
export const generateQuizQuestions = () => {
  const allItems = getQuizItems(); // Get all items from animals, nature, items, clothes, family
  
  // Randomly select 10 unique items
  const shuffled = [...allItems].sort(() => Math.random() - 0.5);
  const selectedItems = shuffled.slice(0, QUIZ_CONFIG.TOTAL_QUESTIONS);
  
  // For each selected item, create a question with 4 options
  const questions = selectedItems.map((item, index) => {
    const correctAnswer = item;
    
    // Get 3 random wrong answers from the same pool (excluding correct answer)
    const wrongOptions = allItems
      .filter(i => i.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, QUIZ_CONFIG.OPTIONS_PER_QUESTION - 1);
    
    // Combine correct and wrong answers, then shuffle
    const allOptions = [correctAnswer, ...wrongOptions]
      .sort(() => Math.random() - 0.5);
    
    return {
      id: `q${index + 1}`,
      questionNumber: index + 1,
      text: item.text,
      correctAnswerId: item.id,
      options: allOptions.map(opt => ({
        id: opt.id,
        text: opt.text,
        image: opt.image
      }))
    };
  });
  
  return questions;
};

/**
 * Initialize quiz state
 * @returns {Object} Initial quiz state
 */
export const initializeQuizState = () => {
  return {
    state: QUIZ_STATES.NOT_STARTED,
    questions: generateQuizQuestions(),
    currentQuestionIndex: 0,
    answers: Array(QUIZ_CONFIG.TOTAL_QUESTIONS).fill(null),
    score: 0,
    timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
    startTime: null,
    endTime: null
  };
};

/**
 * Check if an answer is correct
 * @param {Object} question - The question object
 * @param {string} selectedAnswerId - The selected answer ID
 * @returns {boolean} True if correct
 */
export const isAnswerCorrect = (question, selectedAnswerId) => {
  return question.correctAnswerId === selectedAnswerId;
};

/**
 * Calculate score for the quiz
 * @param {Array} questions - Array of questions
 * @param {Array} answers - Array of user answers
 * @returns {number} Total score (0-100)
 */
export const calculateScore = (questions, answers) => {
  let correctCount = 0;
  
  questions.forEach((question, index) => {
    if (answers[index] && isAnswerCorrect(question, answers[index])) {
      correctCount++;
    }
  });
  
  return correctCount * QUIZ_CONFIG.POINTS_PER_QUESTION;
};

/**
 * Process answer submission
 * @param {Object} quizState - Current quiz state
 * @param {string} answerId - Selected answer ID
 * @returns {Object} Updated quiz state
 */
export const submitAnswer = (quizState, answerId) => {
  const { questions, currentQuestionIndex, answers } = quizState;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Lock the answer
  const newAnswers = [...answers];
  newAnswers[currentQuestionIndex] = answerId;
  
  // Calculate score
  const newScore = calculateScore(questions, newAnswers);
  
  // Determine if quiz is complete
  const isLastQuestion = currentQuestionIndex === QUIZ_CONFIG.TOTAL_QUESTIONS - 1;
  const newState = isLastQuestion ? QUIZ_STATES.COMPLETED : QUIZ_STATES.IN_PROGRESS;
  
  return {
    ...quizState,
    answers: newAnswers,
    score: newScore,
    state: newState,
    endTime: isLastQuestion ? Date.now() : null
  };
};

/**
 * Handle timeout (auto-submit wrong answer)
 * @param {Object} quizState - Current quiz state
 * @returns {Object} Updated quiz state
 */
export const handleTimeout = (quizState) => {
  // Submit null (wrong answer)
  return submitAnswer(quizState, null);
};

/**
 * Move to next question
 * @param {Object} quizState - Current quiz state
 * @returns {Object} Updated quiz state
 */
export const moveToNextQuestion = (quizState) => {
  const newIndex = Math.min(
    quizState.currentQuestionIndex + 1,
    QUIZ_CONFIG.TOTAL_QUESTIONS - 1
  );
  
  return {
    ...quizState,
    currentQuestionIndex: newIndex,
    timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION
  };
};

/**
 * Move to previous question (review only)
 * @param {Object} quizState - Current quiz state
 * @returns {Object} Updated quiz state
 */
export const moveToPreviousQuestion = (quizState) => {
  const newIndex = Math.max(quizState.currentQuestionIndex - 1, 0);
  
  return {
    ...quizState,
    currentQuestionIndex: newIndex,
    state: QUIZ_STATES.REVIEWING
  };
};

/**
 * Restart quiz
 * @returns {Object} Fresh quiz state
 */
export const restartQuiz = () => {
  return initializeQuizState();
};

/**
 * Get friendly message based on score
 * @param {number} score - Final score (0-100)
 * @returns {string} Encouraging message
 */
export const getScoreMessage = (score) => {
  if (score === 100) {
    return 'Xuất sắc! Bạn đã làm bài hoàn hảo!';
  } else if (score >= 80) {
    return 'Rất tốt! Bạn đã nắm vững kiến thức!';
  } else if (score >= 60) {
    return 'Tốt lắm! Tiếp tục cố gắng nhé!';
  } else if (score >= 40) {
    return 'Bạn đang tiến bộ! Hãy ôn lại bài học nhé!';
  } else {
    return 'Đừng nản chí! Hãy xem lại bài học và thử lại!';
  }
};
