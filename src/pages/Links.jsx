import { FiExternalLink } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';

const iconMap = {
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  instagram: FaInstagram,
};

export default function Links() {
  const { links } = useApp();

  return (
    <div className="page-enter">
      <h2 className="page-title">महत्वपूर्ण लिंक</h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        हमारे सोशल मीडिया चैनल से जुड़ें और नवीनतम अपडेट प्राप्त करें
      </p>

      {links.map(link => {
        const IconComponent = iconMap[link.icon] || FiExternalLink;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <div className={`link-icon ${link.type}`}>
              <IconComponent />
            </div>
            <div className="link-info">
              <div className="link-title">{link.title}</div>
              <div className="link-url">{link.type === 'telegram' ? 'Telegram' : link.type === 'whatsapp' ? 'WhatsApp' : link.type === 'youtube' ? 'YouTube' : 'Instagram'}</div>
            </div>
            <div className="link-arrow">
              <FiExternalLink />
            </div>
          </a>
        );
      })}

      {links.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔗</div>
          <h3>कोई लिंक नहीं</h3>
          <p>अभी कोई लिंक उपलब्ध नहीं है</p>
        </div>
      )}
    </div>
  );
}
