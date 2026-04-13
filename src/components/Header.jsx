import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiSearch, FiBookmark, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'राजस्थान परीक्षा तैयारी';
    if (path === '/notes' || path.startsWith('/notes/')) return 'नोट्स';
    if (path === '/pdfs') return 'PDF';
    if (path === '/images') return 'चित्र';
    if (path === '/videos') return 'वीडियो';
    if (path === '/links') return 'महत्वपूर्ण लिंक';
    if (path === '/admin') return 'एडमिन पैनल';
    if (path === '/bookmarks') return 'बुकमार्क';
    if (path === '/search') return 'खोजें';
    if (path === '/profile') return 'प्रोफ़ाइल';
    return 'राजस्थान परीक्षा तैयारी';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-title">
        <span>{getTitle()}</span>
      </div>
      <div className="header-actions">
        <button className="header-btn" onClick={() => navigate('/search')}>
          <FiSearch />
        </button>
        <button className="header-btn" onClick={() => navigate('/bookmarks')}>
          <FiBookmark />
        </button>
        {isAdmin && (
          <button className="header-btn" onClick={() => navigate('/admin')}>
            <FiSettings />
          </button>
        )}
        {user && (
          <button className="header-btn user-avatar-btn" onClick={handleLogout} title="लॉगआउट">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="user-avatar" />
            ) : (
              <FiLogOut />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
