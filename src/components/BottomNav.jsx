import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiFile, FiImage, FiVideo } from 'react-icons/fi';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'होम' },
    { path: '/notes', icon: FiFileText, label: 'नोट्स' },
    { path: '/pdfs', icon: FiFile, label: 'PDF' },
    { path: '/images', icon: FiImage, label: 'चित्र' },
    { path: '/videos', icon: FiVideo, label: 'वीडियो' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <item.icon />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
