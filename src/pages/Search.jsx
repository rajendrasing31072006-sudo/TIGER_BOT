import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFileText, FiFile, FiImage, FiVideo } from 'react-icons/fi';
import { useApp } from '../context/AppContext.jsx';

export default function Search() {
  const [query, setQuery] = useState('');
  const { notes, pdfs, images, videos } = useApp();
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const matched = [];

    notes.forEach(note => {
      if (note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q) || note.category.toLowerCase().includes(q)) {
        matched.push({ ...note, type: 'note', icon: FiFileText });
      }
    });

    pdfs.forEach(pdf => {
      if (pdf.title.toLowerCase().includes(q) || pdf.category.toLowerCase().includes(q)) {
        matched.push({ ...pdf, type: 'pdf', icon: FiFile });
      }
    });

    images.forEach(img => {
      if (img.title.toLowerCase().includes(q) || img.category.toLowerCase().includes(q)) {
        matched.push({ ...img, type: 'image', icon: FiImage });
      }
    });

    videos.forEach(video => {
      if (video.title.toLowerCase().includes(q) || video.category.toLowerCase().includes(q)) {
        matched.push({ ...video, type: 'video', icon: FiVideo });
      }
    });

    return matched;
  }, [query, notes, pdfs, images, videos]);

  const handleResultClick = (item) => {
    switch(item.type) {
      case 'note': navigate(`/notes/${item.id}`); break;
      case 'pdf': navigate('/pdfs'); break;
      case 'image': navigate('/images'); break;
      case 'video': navigate('/videos'); break;
      default: break;
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'note': return 'नोट्स';
      case 'pdf': return 'PDF';
      case 'image': return 'चित्र';
      case 'video': return 'वीडियो';
      default: return '';
    }
  };

  return (
    <div className="page-enter">
      <h2 className="page-title">खोजें</h2>

      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="नोट्स, PDF, वीडियो खोजें..."
          autoFocus
        />
      </div>

      {query.trim() && (
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
          {results.length} परिणाम मिले &quot;{query}&quot; के लिए
        </p>
      )}

      {results.map(item => (
        <div key={`${item.type}-${item.id}`} className="card" onClick={() => handleResultClick(item)}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#E3F2FD', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)', fontSize: 18, flexShrink: 0
            }}>
              <item.icon />
            </div>
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>{item.title}</div>
              <div className="card-category">{getTypeName(item.type)} • {item.category}</div>
            </div>
          </div>
        </div>
      ))}

      {query.trim() && results.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>कोई परिणाम नहीं मिला</h3>
          <p>कृपया अलग शब्दों से खोजें</p>
        </div>
      )}

      {!query.trim() && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>खोजें</h3>
          <p>नोट्स, PDF, चित्र या वीडियो खोजने के लिए ऊपर टाइप करें</p>
        </div>
      )}
    </div>
  );
}
