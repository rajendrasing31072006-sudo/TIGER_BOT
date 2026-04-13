import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google लॉगिन विफल। कृपया पुनः प्रयास करें।');
      }
      throw error;
    }
  };

  const sendOtp = async (phoneNumber, recaptchaContainer) => {
    setAuthError(null);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
          size: 'invisible',
          callback: () => {},
          'expired-callback': () => {
            window.recaptchaVerifier = null;
          }
        });
      }
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      return result;
    } catch (error) {
      window.recaptchaVerifier = null;
      if (error.code === 'auth/invalid-phone-number') {
        setAuthError('अमान्य फ़ोन नंबर। कृपया +91 के साथ 10 अंक दर्ज करें।');
      } else if (error.code === 'auth/too-many-requests') {
        setAuthError('बहुत अधिक प्रयास। कृपया कुछ देर बाद पुनः प्रयास करें।');
      } else {
        setAuthError('OTP भेजने में विफल। कृपया पुनः प्रयास करें।');
      }
      throw error;
    }
  };

  const verifyOtp = async (otp) => {
    setAuthError(null);
    try {
      if (!confirmationResult) {
        setAuthError('कृपया पहले OTP भेजें।');
        throw new Error('No confirmation result');
      }
      await confirmationResult.confirm(otp);
      setConfirmationResult(null);
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        setAuthError('गलत OTP। कृपया सही OTP दर्ज करें।');
      } else if (error.code === 'auth/code-expired') {
        setAuthError('OTP की समय सीमा समाप्त। कृपया नया OTP भेजें।');
      } else if (!error.message?.includes('No confirmation')) {
        setAuthError('OTP सत्यापन विफल। कृपया पुनः प्रयास करें।');
      }
      throw error;
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      window.recaptchaVerifier = null;
      setConfirmationResult(null);
    } catch (error) {
      setAuthError('लॉगआउट विफल।');
    }
  };

  const value = {
    user,
    loading,
    authError,
    confirmationResult,
    loginWithGoogle,
    sendOtp,
    verifyOtp,
    logout,
    setAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
