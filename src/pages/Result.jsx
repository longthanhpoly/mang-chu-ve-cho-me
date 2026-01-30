import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { getScoreMessage, restartQuiz } from '../utils/quizLogic';
import { clearQuizState } from '../utils/storage';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  const handleRestart = () => {
    clearQuizState();
    restartQuiz();
    navigate('/quiz');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-card">
          {/* Emoji based on score */}
          <div className="result-emoji" aria-hidden="true">
            {score === 100 ? '🎉' : score >= 80 ? '🌟' : score >= 60 ? '👍' : score >= 40 ? '💪' : '📚'}
          </div>

          {/* Score */}
          <div className="result-score-section">
            <h1 className="result-title">Kết Quả</h1>
            <div className="result-score">{score} điểm</div>
          </div>

          {/* Message */}
          <p className="result-message">{getScoreMessage(score)}</p>

          {/* Actions */}
          <div className="result-actions">
            <Button 
              variant="primary" 
              size="large"
              onClick={handleRestart}
            >
              Làm lại
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={handleBackToDashboard}
            >
              Trang chủ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
