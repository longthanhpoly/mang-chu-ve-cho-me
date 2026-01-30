import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { useAuth } from '../contexts/AuthContext';
import { 
  initializeQuizState, 
  submitAnswer, 
  handleTimeout, 
  moveToNextQuestion,
  QUIZ_STATES,
  QUIZ_CONFIG
} from '../utils/quizLogic';
import { saveQuizState, loadQuizState, clearQuizState } from '../utils/storage';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateDisplayName, signOut } = useAuth();
  
  const [quizState, setQuizState] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_CONFIG.TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [displayName, setDisplayName] = useState('');

  // Check auth and initialize quiz
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate('/quiz-login', { replace: true });
      return;
    }

    // Wait for user object
    if (!user) return;

    // Check if student needs name
    if (user.role === 'student' && !user.displayName) {
      setShowNamePrompt(true);
      return;
    }

    // Initialize quiz if not already done
    if (!quizState) {
      const savedState = loadQuizState();
      if (savedState && savedState.state !== QUIZ_STATES.COMPLETED) {
        setQuizState(savedState);
        setTimeRemaining(savedState.timeRemaining || QUIZ_CONFIG.TIME_PER_QUESTION);
      } else {
        const newState = initializeQuizState();
        newState.state = QUIZ_STATES.IN_PROGRESS;
        newState.startTime = Date.now();
        setQuizState(newState);
        clearQuizState();
      }
    }
  }, [user, isAuthenticated, navigate, quizState]);

  // Save state
  useEffect(() => {
    if (quizState && quizState.state !== QUIZ_STATES.COMPLETED) {
      saveQuizState({ ...quizState, timeRemaining });
    }
  }, [quizState, timeRemaining]);

  // Timer
  useEffect(() => {
    if (!quizState || quizState.state !== QUIZ_STATES.IN_PROGRESS) return;
    if (selectedAnswer !== null) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, selectedAnswer]);

  const handleTimeUp = () => {
    const newState = handleTimeout(quizState);
    setQuizState(newState);
    
    if (newState.state !== QUIZ_STATES.COMPLETED) {
      setTimeout(() => {
        const nextState = moveToNextQuestion(newState);
        setQuizState(nextState);
        setSelectedAnswer(null);
        setTimeRemaining(QUIZ_CONFIG.TIME_PER_QUESTION);
      }, 1000);
    } else {
      clearQuizState();
      setTimeout(() => {
        navigate('/result', { state: { score: newState.score } });
      }, 1500);
    }
  };

  const handleNameSubmit = () => {
    if (!displayName.trim()) {
      alert('Vui lòng nhập tên của bạn');
      return;
    }

    updateDisplayName(displayName.trim());
    setShowNamePrompt(false);
    
    const newState = initializeQuizState();
    newState.state = QUIZ_STATES.IN_PROGRESS;
    newState.startTime = Date.now();
    setQuizState(newState);
  };

  const handleAnswerSelect = (answerId) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerId);
    const newState = submitAnswer(quizState, answerId);
    setQuizState(newState);

    setTimeout(() => {
      if (newState.state !== QUIZ_STATES.COMPLETED) {
        const nextState = moveToNextQuestion(newState);
        setQuizState(nextState);
        setSelectedAnswer(null);
        setTimeRemaining(QUIZ_CONFIG.TIME_PER_QUESTION);
      } else {
        clearQuizState();
        navigate('/result', { state: { score: newState.score } });
      }
    }, 1000);
  };

  // Name prompt modal
  if (showNamePrompt) {
    return (
      <div className="quiz-page">
        <div className="name-prompt-modal">
          <div className="name-prompt-content">
            <h2 className="name-prompt-title">Xin chào!</h2>
            <p className="name-prompt-text">Vui lòng nhập tên của bạn để bắt đầu làm bài kiểm tra</p>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tên của bạn"
              className="name-input"
              autoFocus
            />
            <Button variant="primary" size="large" onClick={handleNameSubmit}>
              Bắt đầu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading
  if (!quizState) {
    return (
      <div className="quiz-page">
        <div className="quiz-loading">Đang tải...</div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  const isAnswered = currentAnswer !== null;

  return (
    <div className="quiz-page">
      {/* Back Button */}
      <Icon 
        onClick={() => navigate('/dashboard')} 
        ariaLabel="Quay lại" 
        className="page-back-button"
      >
        <ChevronLeft />
      </Icon>

      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-score">Điểm: {quizState.score}</div>
        <Icon onClick={signOut} ariaLabel="Đăng xuất">
          <LogOut />
        </Icon>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-bar">
        <div 
          className="quiz-progress-fill"
          style={{ 
            width: `${((quizState.currentQuestionIndex + 1) / QUIZ_CONFIG.TOTAL_QUESTIONS) * 100}%` 
          }}
        />
      </div>

      {/* Question Counter & Timer */}
      <div className="quiz-info">
        <div className="quiz-counter">
          Câu {quizState.currentQuestionIndex + 1}/{QUIZ_CONFIG.TOTAL_QUESTIONS}
        </div>
        {!isAnswered && (
          <div className={`quiz-timer ${timeRemaining <= 10 ? 'quiz-timer-warning' : ''}`}>
            ⏱ {timeRemaining}s
          </div>
        )}
      </div>

      {/* Question */}
      <div className="quiz-question">
        <h2 className="quiz-question-text">{currentQuestion.text}</h2>
      </div>

      {/* Options */}
      <div className="quiz-options">
        {currentQuestion.options.map((option) => {
          const isSelected = (selectedAnswer || currentAnswer) === option.id;
          const isCorrect = option.id === currentQuestion.correctAnswerId;
          
          let optionClass = 'quiz-option';
          if (isAnswered) {
            if (isSelected && isCorrect) {
              optionClass += ' quiz-option-correct';
            } else if (isSelected && !isCorrect) {
              optionClass += ' quiz-option-wrong';
            }
          }

          return (
            <button
              key={option.id}
              className={optionClass}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={isAnswered}
            >
              <img 
                src={option.image} 
                alt={option.text}
                className="quiz-option-image"
                loading="lazy"
              />
              <span className="quiz-option-text">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
