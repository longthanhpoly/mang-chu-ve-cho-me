import React, { useState } from 'react';
import { Settings, Share2, Volume2, VolumeX, Copy, Check } from 'lucide-react';
import Icon from '../ui/Icon';
import { useAudio } from '../../contexts/AudioContext';
import './Header.css';

const Header = () => {
  const { volume, isMuted, setVolume, toggleMute } = useAudio();
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert volume (0-1) to percentage (0-100)
  const volumePercent = Math.round(volume * 100);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value) / 100;
    setVolume(newVolume);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('MANG CHỮ VỀ CHO MẸ - Ứng dụng học tiếng Việt');
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      tiktok: `https://www.tiktok.com/share?url=${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      {/* Header Icons */}
      <div className="header-icons">
        <Icon 
          onClick={() => setShowSettings(!showSettings)}
          ariaLabel="Cài đặt"
        >
          <Settings />
        </Icon>
        <Icon 
          onClick={() => setShowShare(!showShare)}
          ariaLabel="Chia sẻ"
        >
          <Share2 />
        </Icon>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
          >
            <h3 className="modal-title">Cài đặt</h3>
            <div className="modal-body">
              {/* Mute Toggle */}
              <div className="setting-row">
                <span className="setting-label">Âm thanh</span>
                <button 
                  onClick={toggleMute}
                  className="icon-toggle"
                  aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                >
                  {isMuted ? 
                    <VolumeX className="icon-red" /> : 
                    <Volume2 className="icon-teal" />
                  }
                </button>
              </div>
              
              {/* Volume Slider */}
              <div className="setting-column">
                <label className="setting-label">Âm lượng</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volumePercent}
                  onChange={handleVolumeChange}
                  disabled={isMuted}
                  className="volume-slider"
                  aria-label="Điều chỉnh âm lượng"
                />
                <div className="volume-value">{volumePercent}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
          >
            <h3 className="modal-title">Chia sẻ</h3>
            <div className="modal-body">
              <button 
                onClick={() => handleSocialShare('facebook')}
                className="share-button share-facebook"
              >
                Facebook
              </button>
              
              <button 
                onClick={() => handleSocialShare('tiktok')}
                className="share-button share-tiktok"
              >
                TikTok
              </button>
              
              <button 
                onClick={() => handleSocialShare('twitter')}
                className="share-button share-twitter"
              >
                X (Twitter)
              </button>
              
              <button 
                onClick={handleCopyLink}
                className="share-button share-copy"
              >
                {copied ? <Check className="share-icon" /> : <Copy className="share-icon" />}
                {copied ? 'Đã sao chép!' : 'Sao chép link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
