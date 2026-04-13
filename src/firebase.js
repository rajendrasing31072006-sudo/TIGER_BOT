import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBaUIwUCtdxFA36LBCwE1fRdu4jgwS13_k",
  authDomain: "rajasthan-exam-app.firebaseapp.com",
  projectId: "rajasthan-exam-app",
  storageBucket: "rajasthan-exam-app.firebasestorage.app",
  messagingSenderId: "900904682363",
  appId: "1:900904682363:web:3f85e2a0007612a46873de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
