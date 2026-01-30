import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Header from '../components/common/Header';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header />
      
      {/* Decorative elements */}
      <div className="decorations">
        <div className="decoration decoration-1">🌿</div>
        <div className="decoration decoration-2">🌸</div>
        <div className="decoration decoration-3">🦋</div>
        <div className="decoration decoration-4">🌺</div>
      </div>

      {/* Main Content */}
      <div className="home-container">
        {/* Title Section */}
        <header className="home-header">
          <div className="home-emoji" aria-hidden="true">📚</div>
          <h1 className="home-title">MANG CHỮ VỀ CHO MẸ</h1>
        </header>

        {/* Illustration Section */}
        <main className="home-main">
          <img 
            src="/backgrounds/illustration.webp" 
            alt="Mẹ và con đọc sách cùng nhau"
            className="home-illustration"
            loading="eager"
          />
        </main>

        {/* CTA Section */}
        <footer className="home-footer">
          <Button 
            variant="primary" 
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Bắt đầu
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Home;
