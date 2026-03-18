import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Icon from '../../components/ui/Icon';
import Header from '../../components/common/Header';
import LessonList from './LessonList';
import LessonDetail from './LessonDetail';
import QuizComponent from './QuizComponent';
import { mathLessons } from '../../data/mathLessons';
import './MathBasic.css';

const MathBasic = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list' | 'lesson' | 'quiz'
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handleLessonComplete = () => {
    setView('quiz');
  };

  const handleQuizComplete = () => {
    setView('list');
    setSelectedLesson(null);
  };

  const handleBack = () => {
    if (view === 'quiz') {
      setView('lesson');
    } else if (view === 'lesson') {
      setView('list');
      setSelectedLesson(null);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="math-basic-page">
      <Header />

      {/* Back Button */}
      <Icon 
        onClick={handleBack}
        ariaLabel="Quay lại"
        className="page-back-button"
      >
        <ChevronLeft />
      </Icon>

      <div className="math-basic-container">
        {view === 'list' && (
          <LessonList
            lessons={mathLessons.lessons}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {view === 'lesson' && selectedLesson && (
          <LessonDetail
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
          />
        )}

        {view === 'quiz' && selectedLesson && (
          <QuizComponent
            quiz={selectedLesson.quiz}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
};

export default MathBasic;
