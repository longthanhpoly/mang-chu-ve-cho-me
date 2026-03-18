import React, { useState } from 'react';
import { Volume2, Check, X } from 'lucide-react';
import { speak } from '../../utils/textToSpeech';
import './SimpleQuiz.css';

/**
 * SimpleQuiz - Reusable quiz component for math questions
 * 
 * Props:
 * @param {Object} question - Question object { question: string, options: string[], correctIndex: number }
 * @param {Function} onAnswer - Callback when user answers (isCorrect: boolean)
 * @param {boolean} autoRead - Auto-read question on mount (default: false)
 */
const SimpleQuiz = ({ question, onAnswer, autoRead = false }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Auto-read question on mount
  React.useEffect(() => {
    if (autoRead && question.question) {
      speak(question.question);
    }
  }, [autoRead, question.question]);

  const handleOptionClick = (index) => {
    if (hasAnswered) return; // Prevent multiple selections

    setSelectedIndex(index);
    setHasAnswered(true);

    const isCorrect = index === question.correctIndex;
    
    // Audio feedback
    if (isCorrect) {
      speak('Đúng rồi!');
    } else {
      speak('Sai rồi. Thử lại nhé!');
    }

    // Callback to parent
    if (onAnswer) {
      setTimeout(() => {
        onAnswer(isCorrect, index);
      }, 1500);
    }
  };

  const handleReadQuestion = () => {
    speak(question.question);
  };

  const handleReadOption = (option) => {
    speak(option);
  };

  const getOptionClassName = (index) => {
    const baseClass = 'simple-quiz-option';
    
    if (!hasAnswered) {
      return baseClass;
    }

    const isCorrect = index === question.correctIndex;
    const isSelected = index === selectedIndex;

    if (isSelected && isCorrect) {
      return `${baseClass} simple-quiz-correct`;
    } else if (isSelected && !isCorrect) {
      return `${baseClass} simple-quiz-wrong`;
    } else if (isCorrect) {
      return `${baseClass} simple-quiz-show-correct`;
    }

    return baseClass;
  };

  const getOptionIcon = (index) => {
    if (!hasAnswered) return null;

    const isCorrect = index === question.correctIndex;
    const isSelected = index === selectedIndex;

    if (isSelected && isCorrect) {
      return <Check className="option-icon icon-correct" />;
    } else if (isSelected && !isCorrect) {
      return <X className="option-icon icon-wrong" />;
    } else if (isCorrect) {
      return <Check className="option-icon icon-correct" />;
    }

    return null;
  };

  return (
    <div className="simple-quiz">
      {/* Question */}
      <div className="simple-quiz-question-area">
        <button 
          className="simple-quiz-question"
          onClick={handleReadQuestion}
          aria-label="Đọc câu hỏi"
        >
          <h2 className="question-text">{question.question}</h2>
          <Volume2 className="question-audio-icon" />
        </button>
      </div>

      {/* Options */}
      <div className="simple-quiz-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClassName(index)}
            onClick={() => handleOptionClick(index)}
            disabled={hasAnswered}
            aria-label={`Lựa chọn ${option}`}
          >
            <div className="option-content">
              <span className="option-text">{option}</span>
              <button
                className="option-audio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadOption(option);
                }}
                aria-label={`Đọc ${option}`}
              >
                <Volume2 className="option-audio-icon" />
              </button>
            </div>
            {getOptionIcon(index)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimpleQuiz;
