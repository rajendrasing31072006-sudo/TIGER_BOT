import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';
import { FiPhone, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Login() {
  const { loginWithGoogle, sendOtp, verifyOtp, authError, setAuthError, confirmationResult } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch {
      // Error handled in AuthContext
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      setAuthError('कृपया सही फ़ोन नंबर दर्ज करें।');
      return;
    }
    setSending(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      await sendOtp(formattedPhone, 'recaptcha-container');
      setOtpSent(true);
    } catch {
      // Error handled in AuthContext
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setAuthError('कृपया 6 अंकों का OTP दर्ज करें।');
      return;
    }
    setVerifying(true);
    try {
      await verifyOtp(otp);
    } catch {
      // Error handled in AuthContext
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">📚</div>
          <h1>राजस्थान परीक्षा तैयारी</h1>
          <p>BSTC, REET, Patwari, Police, LDC</p>
        </div>

        <div className="login-card">
          <h2>लॉगिन करें</h2>
          <p className="login-subtitle">अपना अकाउंट एक्सेस करने के लिए लॉगिन करें</p>

          {authError && (
            <div className="auth-error">
              {authError}
            </div>
          )}

          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={22} />
            <span>Google से लॉगिन करें</span>
          </button>

          <div className="login-divider">
            <span>या</span>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="phone-input-group">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  className="phone-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="मोबाइल नंबर दर्ज करें"
                  maxLength={10}
                />
              </div>
              <button type="submit" className="otp-btn" disabled={sending || phone.length < 10}>
                {sending ? (
                  <span className="btn-loading">OTP भेज रहे हैं...</span>
                ) : (
                  <>
                    <FiPhone />
                    <span>OTP भेजें</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <p className="otp-info">
                OTP भेजा गया: +91{phone}
                <button type="button" className="change-phone-btn" onClick={() => { setOtpSent(false); setOtp(''); setAuthError(null); }}>
                  बदलें
                </button>
              </p>
              <input
                type="text"
                className="otp-input"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6 अंकों का OTP दर्ज करें"
                maxLength={6}
                autoFocus
              />
              <button type="submit" className="verify-btn" disabled={verifying || otp.length < 6}>
                {verifying ? (
                  <span className="btn-loading">सत्यापित कर रहे हैं...</span>
                ) : (
                  <>
                    <FiCheck />
                    <span>OTP सत्यापित करें</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="login-footer">
          लॉगिन करके आप हमारी सेवा की शर्तों से सहमत होते हैं
        </p>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
