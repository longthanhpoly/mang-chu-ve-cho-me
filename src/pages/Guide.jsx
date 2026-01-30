import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import './Guide.css';

const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-page">
      {/* Back Button */}
      <Icon 
        onClick={() => navigate('/dashboard')}
        ariaLabel="Quay lại"
        className="page-back-button"
      >
        <X />
      </Icon>

      <div className="guide-container">
        <div className="guide-card">
          <h1 className="guide-title">Hướng Dẫn Sử Dụng</h1>

          {/* Steps */}
          <div className="guide-steps">
            <div className="guide-step">
              <div className="guide-step-number">1</div>
              <div className="guide-step-content">
                <h3 className="guide-step-title">Chọn Bài Học</h3>
                <p className="guide-step-text">
                  Nhấn vào mục "Bài Học" và chọn chủ đề bạn muốn học. 
                  Mỗi chủ đề có nhiều từ với hình ảnh và âm thanh minh họa.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <div className="guide-step-number">2</div>
              <div className="guide-step-content">
                <h3 className="guide-step-title">Học Từ Vựng</h3>
                <p className="guide-step-text">
                  Vuốt trái/phải hoặc dùng nút mũi tên để chuyển từ. 
                  Nhấn nút "Phát âm" để nghe cách đọc từ đó.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <div className="guide-step-number">3</div>
              <div className="guide-step-content">
                <h3 className="guide-step-title">Làm Bài Kiểm Tra</h3>
                <p className="guide-step-text">
                  Sau khi học xong, bạn có thể làm bài kiểm tra để ôn tập. 
                  Mỗi câu hỏi có 60 giây và 4 lựa chọn.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <div className="guide-step-number">4</div>
              <div className="guide-step-content">
                <h3 className="guide-step-title">Xem Kết Quả</h3>
                <p className="guide-step-text">
                  Sau khi hoàn thành bài kiểm tra, bạn sẽ thấy điểm số 
                  và có thể làm lại để cải thiện kết quả.
                </p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="guide-about">
            <h2 className="guide-about-title">Về Dự Án</h2>
            <p className="guide-about-text">
              "Mang Chữ Về Cho Mẹ" là ứng dụng học chữ phổ thông được thiết kế 
              đặc biệt cho phụ huynh dân tộc thiểu số. Mục tiêu của dự án là 
              giúp mọi người có thể học tiếng Việt một cách dễ dàng và thân thiện.
            </p>
          </div>

          {/* Contact */}
          <div className="guide-contact">
            <h2 className="guide-contact-title">Liên Hệ</h2>
            <p className="guide-contact-text">
              Nếu bạn có câu hỏi hoặc góp ý, vui lòng liên hệ:<br />
              Email: contact@example.com
            </p>
          </div>

          {/* CTA */}
          <div className="guide-cta">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => navigate('/lessons')}
            >
              Bắt Đầu Học
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
