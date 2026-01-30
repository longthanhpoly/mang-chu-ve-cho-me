import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { getLessonById } from '../../data/lessons';
import { useAudio } from '../../contexts/AudioContext';
import './LessonDetail.css';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { play } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const lesson = getLessonById(lessonId);

  useEffect(() => {
    if (!lesson) {
      navigate('/lessons');
    }
  }, [lesson, navigate]);

  if (!lesson) return null;

  const currentItem = lesson.items[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === lesson.items.length - 1;

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [isLast]);

  const goToPrevious = useCallback(() => {
    if (!isFirst) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [isFirst]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') navigate('/lessons');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, navigate]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;

    if (isSwipe) {
      if (distance > 0) {
        // Swipe left - next
        goToNext();
      } else {
        // Swipe right - previous
        goToPrevious();
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Play audio
  const handlePlayAudio = () => {
    if (currentItem.audio) {
      play(currentItem.id, currentItem.audio);
    }
  };

  return (
    <div className="lesson-detail-page">
      {/* Back Button */}
      <Icon 
        onClick={() => navigate('/lessons')}
        ariaLabel="Quay lại danh sách bài học"
        className="page-back-button"
      >
        <X />
      </Icon>

      {/* Progress Bar */}
      <div className="lesson-progress-bar">
        <div 
          className="lesson-progress-fill"
          style={{ width: `${((currentIndex + 1) / lesson.items.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div 
        className="lesson-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lesson-item">
          {/* Image */}
          <img 
            src={currentItem.image}
            alt={currentItem.text}
            className="lesson-image"
            loading="lazy"
          />

          {/* Text */}
          <h1 className="lesson-text">{currentItem.text}</h1>

          {/* Audio Button */}
          {currentItem.audio && (
            <Button
              variant="primary"
              size="large"
              onClick={handlePlayAudio}
              className="lesson-audio-btn"
            >
              <Volume2 className="audio-icon" />
              Phát âm
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="lesson-navigation">
        <Button
          variant="outline"
          size="medium"
          onClick={goToPrevious}
          disabled={isFirst}
          aria-label="Từ trước"
        >
          <ChevronLeft />
        </Button>

        <span className="lesson-counter">
          {currentIndex + 1} / {lesson.items.length}
        </span>

        <Button
          variant="outline"
          size="medium"
          onClick={goToNext}
          disabled={isLast}
          aria-label="Từ tiếp theo"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default LessonDetail;
