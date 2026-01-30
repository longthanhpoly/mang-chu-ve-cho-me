import React, { createContext, useContext, useState, useEffect } from 'react';
import { isTeacher as checkIsTeacher } from '../data/teachers';
import { saveAuthState, loadAuthState, clearAuthState } from '../utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state on mount
  useEffect(() => {
    const savedAuth = loadAuthState();
    if (savedAuth) {
      setUser(savedAuth);
    }
    setIsLoading(false);
  }, []);

  // Save auth state whenever it changes
  useEffect(() => {
    if (user) {
      saveAuthState(user);
    } else {
      clearAuthState();
    }
  }, [user]);

  /**
   * Determine user role based on email
   * @param {string} email - User email
   * @returns {string} 'teacher' or 'student'
   */
  const determineRole = (email) => {
    return checkIsTeacher(email) ? 'teacher' : 'student';
  };

  /**
   * Sign in with Google
   * Placeholder - would integrate with Google OAuth in production
   */
  const signInWithGoogle = async () => {
    // Placeholder implementation
    // In production, this would use Google OAuth
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulated Google sign-in
        // Change email to test different roles:
        // - 'nhatlinhtl@gmail.com' for teacher
        // - 'student@example.com' for student
        const mockEmail = 'student@example.com';
        const role = determineRole(mockEmail);
        
        const userData = {
          email: mockEmail,
          name: role === 'teacher' ? 'Giáo Viên' : null,
          role,
          provider: 'google',
          displayName: null // Student will need to enter name
        };
        
        setUser(userData);
        resolve(userData);
      }, 500); // Reduced delay for better UX
    });
  };

  /**
   * Sign in with email/password
   * Placeholder - would integrate with backend in production
   */
  const signInWithEmail = async (email, password) => {
    // Placeholder implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email và mật khẩu không được để trống'));
          return;
        }
        
        const role = determineRole(email);
        
        const userData = {
          email,
          name: role === 'teacher' ? 'Teacher User' : 'Student User',
          role,
          provider: 'email',
          displayName: role === 'teacher' ? 'Teacher User' : null
        };
        
        setUser(userData);
        resolve(userData);
      }, 1000);
    });
  };

  /**
   * Sign up with email/password
   * Placeholder - would integrate with backend in production
   */
  const signUpWithEmail = async (email, password, displayName) => {
    // Placeholder implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email và mật khẩu không được để trống'));
          return;
        }
        
        if (!displayName && determineRole(email) !== 'teacher') {
          reject(new Error('Vui lòng nhập tên của bạn'));
          return;
        }
        
        const role = determineRole(email);
        
        const userData = {
          email,
          name: displayName || 'New User',
          role,
          provider: 'email',
          displayName: role === 'student' ? displayName : null
        };
        
        setUser(userData);
        resolve(userData);
      }, 1000);
    });
  };

  /**
   * Update user display name
   * Required for students before taking quiz
   */
  const updateDisplayName = (displayName) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      displayName
    };
    
    setUser(updatedUser);
  };

  /**
   * Sign out
   */
  const signOut = () => {
    setUser(null);
    clearAuthState();
    // Also clear quiz state when signing out
    try {
      localStorage.removeItem('quiz_state');
    } catch (e) {
      console.error('Failed to clear quiz state:', e);
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  /**
   * Check if user is teacher
   */
  const isTeacher = () => {
    return user?.role === 'teacher';
  };

  /**
   * Check if user is student
   */
  const isStudent = () => {
    return user?.role === 'student';
  };

  const value = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    updateDisplayName,
    signOut,
    isAuthenticated,
    isTeacher,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
