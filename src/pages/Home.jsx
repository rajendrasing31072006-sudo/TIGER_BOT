import { useNavigate } from 'react-router-dom';
import { FiFileText, FiFile, FiImage, FiVideo, FiLink, FiBookmark } from 'react-icons/fi';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { path: '/notes', icon: '📝', label: 'नोट्स', desc: 'टॉपिक वाइज नोट्स' },
    { path: '/pdfs', icon: '📄', label: 'PDF', desc: 'पीडीएफ डाउनलोड करें' },
    { path: '/images', icon: '🖼️', label: 'चित्र', desc: 'मानचित्र एवं चार्ट' },
    { path: '/videos', icon: '🎬', label: 'वीडियो', desc: 'वीडियो लेक्चर' },
    { path: '/links', icon: '🔗', label: 'महत्वपूर्ण लिंक', desc: 'सोशल मीडिया लिंक' },
    { path: '/bookmarks', icon: '⭐', label: 'बुकमार्क', desc: 'सेव किए गए आइटम' },
  ];

  const exams = [
    { name: 'BSTC प्रवेश परीक्षा', badge: 'bstc' },
    { name: 'REET Level-1 & Level-2', badge: 'reet' },
    { name: 'पटवारी भर्ती परीक्षा', badge: 'patwari' },
    { name: 'राजस्थान पुलिस कांस्टेबल', badge: 'other' },
    { name: 'LDC / क्लर्क भर्ती', badge: 'other' },
  ];

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <div className="home-hero">
        <h1>राजस्थान परीक्षा तैयारी</h1>
        <p>BSTC | REET | पटवारी | पुलिस | LDC</p>
        <p style={{ marginTop: 8, fontSize: 13, opacity: 0.8 }}>
          सभी प्रतियोगी परीक्षाओं की तैयारी एक ही ऐप में
        </p>
      </div>

      {/* Category Grid */}
      <h3 className="page-title" style={{ fontSize: 16 }}>विषय श्रेणी</h3>
      <div className="category-grid">
        {categories.map(cat => (
          <div
            key={cat.path}
            className="category-card"
            onClick={() => navigate(cat.path)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, display: 'block' }}>
              {cat.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Target Exams */}
      <h3 className="page-title" style={{ fontSize: 16 }}>लक्षित परीक्षाएं</h3>
      <div className="exam-cards">
        {exams.map((exam, i) => (
          <div key={i} className="exam-card">
            <span className={`exam-badge ${exam.badge}`}>
              {exam.badge.toUpperCase()}
            </span>
            <span className="exam-name">{exam.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
