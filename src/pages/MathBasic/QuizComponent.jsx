import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { speak } from '../../utils/textToSpeech';

const QuizComponent = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quiz[currentQuestion];
  const isAnswered = selectedAnswer !== null;

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    const isCorrect = index === question.correctIndex;

    if (isCorrect) {
      setScore(score + 1);
      speak('Đúng rồi!');
    } else {
      speak('Chưa đúng. Thử lại nhé!');
    }

    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="quiz-result">
        <div className="result-emoji">
          {percentage === 100 ? '🎉' : percentage >= 70 ? '⭐' : '💪'}
        </div>
        <h1 className="result-title">Kết quả</h1>
        <div className="result-score">
          {score}/{quiz.length}
        </div>
        <div className="result-message">
          {percentage === 100 ? 'Xuất sắc!' : percentage >= 70 ? 'Giỏi lắm!' : 'Cố gắng thêm nhé!'}
        </div>
        <div className="result-actions">
          <Button variant="primary" size="large" onClick={handleRestart}>
            Làm lại
          </Button>
          <Button variant="outline" size="large" onClick={onComplete}>
            Về danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-component">
      <div className="quiz-header">
        <div className="quiz-progress">
          Câu {currentQuestion + 1}/{quiz.length}
        </div>
        <div className="quiz-score">Điểm: {score}</div>
      </div>

      <div className="quiz-question-area">
        <h2 className="quiz-question">{question.question}</h2>
        
        {question.visual && (
          <div className="quiz-visual">
            {question.visual.count && (
              <div className="visual-count">{question.visual.count}</div>
            )}
            <div className="visual-item">{question.visual.item}</div>
          </div>
        )}
      </div>

      <div className="quiz-options">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = selectedAnswer === index;
          
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
              key={index}
              className={optionClass}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizComponent;
