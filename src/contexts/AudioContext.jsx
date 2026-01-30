import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7); // 0 to 1
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const audioRef = useRef(null);

  /**
   * Play audio file
   * @param {string} audioId - Unique identifier for the audio
   * @param {string} audioSrc - Path to audio file
   */
  const play = useCallback((audioId, audioSrc) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create new audio element
    const audio = new Audio(audioSrc);
    audio.volume = isMuted ? 0 : volume;
    audio.preload = 'none';

    // Handle audio end
    audio.addEventListener('ended', () => {
      setCurrentAudioId(null);
      audioRef.current = null;
    });

    // Handle errors
    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      setCurrentAudioId(null);
      audioRef.current = null;
    });

    // Play audio (safe for mobile Safari)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audioRef.current = audio;
          setCurrentAudioId(audioId);
        })
        .catch((error) => {
          console.error('Audio play failed:', error);
          setCurrentAudioId(null);
        });
    }
  }, [isMuted, volume]);

  /**
   * Stop currently playing audio
   */
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setCurrentAudioId(null);
  }, []);

  /**
   * Set volume (0 to 1)
   * @param {number} newVolume - Volume level (0 to 1)
   */
  const changeVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    
    // Apply to currently playing audio
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = clampedVolume;
    }
  }, [isMuted]);

  /**
   * Toggle mute on/off
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      
      // Apply to currently playing audio
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : volume;
      }
      
      return newMuted;
    });
  }, [volume]);

  const value = {
    isMuted,
    volume,
    currentAudioId,
    play,
    stop,
    setVolume: changeVolume,
    toggleMute
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
