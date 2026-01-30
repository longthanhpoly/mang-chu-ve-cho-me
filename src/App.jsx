import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/Lessons/LessonDetail';
import QuizLogin from './pages/QuizLogin';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Guide from './pages/Guide';

// Styles
import './styles/theme.css';
import './styles/motion.css';

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:lessonId" element={<LessonDetail />} />
            <Route path="/quiz-login" element={<QuizLogin />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/guide" element={<Guide />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
