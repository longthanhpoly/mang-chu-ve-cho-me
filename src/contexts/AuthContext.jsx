import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { isTeacher as checkIsTeacher } from '../data/teachers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lắng nghe trạng thái đăng nhập từ Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const role = checkIsTeacher(firebaseUser.email) ? 'teacher' : 'student';
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || null,
          photoURL: firebaseUser.photoURL || null,
          role,
          provider: firebaseUser.providerData[0]?.providerId || 'unknown',
          // displayName dùng cho học viên nhập tên riêng khi làm bài
          displayName: role === 'teacher' ? (firebaseUser.displayName || firebaseUser.email) : null,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Đăng nhập bằng Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      // Người dùng tắt popup — không coi là lỗi nghiêm trọng
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        throw new Error('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.');
      }
      if (err.code === 'auth/popup-blocked') {
        throw new Error('Trình duyệt đã chặn popup. Vui lòng cho phép popup và thử lại.');
      }
      throw new Error('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  // Đăng nhập bằng email/password
  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        throw new Error('Email hoặc mật khẩu không đúng.');
      }
      if (err.code === 'auth/invalid-email') {
        throw new Error('Định dạng email không hợp lệ.');
      }
      if (err.code === 'auth/too-many-requests') {
        throw new Error('Quá nhiều lần thử. Vui lòng đợi một lúc rồi thử lại.');
      }
      throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  // Đăng ký tài khoản mới bằng email/password
  const signUpWithEmail = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Cập nhật tên hiển thị trên Firebase
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return result.user;
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        throw new Error('Email này đã được dùng. Hãy đăng nhập hoặc dùng email khác.');
      }
      if (err.code === 'auth/weak-password') {
        throw new Error('Mật khẩu quá yếu. Vui lòng dùng ít nhất 6 ký tự.');
      }
      if (err.code === 'auth/invalid-email') {
        throw new Error('Định dạng email không hợp lệ.');
      }
      throw new Error('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  // Cập nhật tên học viên (nhập trước khi làm bài)
  const updateDisplayName = (displayName) => {
    if (!user) return;
    setUser((prev) => ({ ...prev, displayName }));
  };

  // Đăng xuất
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Xoá trạng thái quiz khi đăng xuất
      localStorage.removeItem('quiz_state');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const isAuthenticated = () => user !== null;
  const isTeacher = () => user?.role === 'teacher';
  const isStudent = () => user?.role === 'student';

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
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
