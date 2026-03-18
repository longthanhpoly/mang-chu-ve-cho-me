import React from 'react';
import Card from '../../components/ui/Card';

const LessonList = ({ lessons, onSelectLesson }) => {
  const getLessonIcon = (lessonId) => {
    const icons = {
      'lesson_1': '🔢',
      'lesson_2': '➕',
      'lesson_3': '➖'
    };
    return icons[lessonId] || '📚';
  };

  return (
    <div className="lesson-list">
      <h1 className="lesson-list-title">Toán Cơ Bản</h1>
      
      <div className="lesson-list-grid">
        {lessons.map((lesson, index) => (
          <Card
            key={lesson.id}
            className="lesson-card stagger-item"
            onClick={() => onSelectLesson(lesson)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="lesson-card-icon" aria-hidden="true">
              {getLessonIcon(lesson.id)}
            </div>
            <h2 className="lesson-card-title">{lesson.title}</h2>
            <div className="lesson-card-goals">
              {lesson.goal.map((g, i) => (
                <div key={i} className="lesson-goal-item">• {g}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
