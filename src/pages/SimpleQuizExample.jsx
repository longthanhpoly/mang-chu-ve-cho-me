import React, { useState } from 'react';
import SimpleQuiz from '../../components/quiz/SimpleQuiz';
import Button from '../../components/ui/Button';

/**
 * Example Usage of SimpleQuiz Component
 * This demonstrates how to use the reusable SimpleQuiz component
 */
const SimpleQuizExample = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Sample questions (max 3 options each)
  const questions = [
    {
      question: "2 + 1 = ?",
      options: ["2", "3", "4"],
      correctIndex: 1
    },
    {
      question: "5 - 2 = ?",
      options: ["2", "3", "4"],
      correctIndex: 1
    },
    {
      question: "1 + 1 = ?",
      options: ["1", "2", "3"],
      correctIndex: 1
    }
  ];

  const handleAnswer = (isCorrect, selectedIndex) => {
    console.log('Answer:', { isCorrect, selectedIndex });
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question after feedback delay
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Kết quả: {score}/{questions.length}
        </h1>
        <Button variant="primary" size="large" onClick={handleRestart}>
          Làm lại
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8EBFB6' }}>
          Câu {currentQuestionIndex + 1}/{questions.length}
        </p>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Điểm: {score}
        </p>
      </div>

      <SimpleQuiz
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        autoRead={false}
      />
    </div>
  );
};

export default SimpleQuizExample;
