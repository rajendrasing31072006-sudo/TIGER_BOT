import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiBookmark, FiSettings } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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
    return 'राजस्थान परीक्षा तैयारी';
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
        <button className="header-btn" onClick={() => navigate('/admin')}>
          <FiSettings />
        </button>
      </div>
    </header>
  );
}
