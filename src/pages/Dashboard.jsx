import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import Header from '../components/common/Header';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'lessons',
      title: 'Bài Học',
      icon: '📖',
      path: '/lessons'
    },
    {
      id: 'math',
      title: 'Toán Cơ Bản',
      icon: '🔢',
      path: '/math-basic'
    },
    {
      id: 'quiz',
      title: 'Kiểm Tra',
      icon: '✍️',
      path: '/quiz-login'
    },
    {
      id: 'guide',
      title: 'Hướng Dẫn',
      icon: '💡',
      path: '/guide'
    }
  ];

  return (
    <div className="dashboard-page">
      <Header />

      {/* Back Button */}
      <Icon 
        onClick={() => navigate('/')}
        ariaLabel="Quay lại trang chủ"
        className="page-back-button"
      >
        <ChevronLeft />
      </Icon>

      <div className="dashboard-container">
        <div className="dashboard-grid">
          {menuItems.map((item, index) => (
            <Card 
              key={item.id}
              className="dashboard-card stagger-item"
              onClick={() => navigate(item.path)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="dashboard-card-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h2 className="dashboard-card-title">{item.title}</h2>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
