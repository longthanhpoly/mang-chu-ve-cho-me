import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIMus1C-JYd4YkfXzFZ80pGOvLH3b0_0s",
  authDomain: "mang-chu-ve-cho-me.firebaseapp.com",
  projectId: "mang-chu-ve-cho-me",
  storageBucket: "mang-chu-ve-cho-me.firebasestorage.app",
  messagingSenderId: "320999692021",
  appId: "1:320999692021:web:3c5348aefde0b0ae1f17bc",
  measurementId: "G-Z8KJEGTWV4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Yêu cầu chọn tài khoản mỗi lần đăng nhập
googleProvider.setCustomParameters({ prompt: 'select_account' });
