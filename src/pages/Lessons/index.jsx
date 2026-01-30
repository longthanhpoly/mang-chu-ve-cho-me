import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Card from '../../components/ui/Card';
import Icon from '../../components/ui/Icon';
import Header from '../../components/common/Header';
import { getAllLessons } from '../../data/lessons';
import './Lessons.css';

const Lessons = () => {
  const navigate = useNavigate();
  const lessons = getAllLessons();

  return (
    <div className="lessons-page">
      <Header />

      {/* Back Button */}
      <Icon 
        onClick={() => navigate('/dashboard')}
        ariaLabel="Quay lại"
        className="page-back-button"
      >
        <ChevronLeft />
      </Icon>

      <div className="lessons-container">
        <h1 className="lessons-title">Bài Học</h1>

        <div className="lessons-grid">
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id}
              className="lesson-card stagger-item"
              onClick={() => navigate(`/lessons/${lesson.id}`)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="lesson-card-icon" aria-hidden="true">
                {lesson.icon}
              </div>
              <h2 className="lesson-card-title">{lesson.title}</h2>
              <p className="lesson-card-count">
                {lesson.items.length} từ
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
