import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookmark, FiFileText, FiFile, FiImage, FiVideo } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';

export default function Bookmarks() {
  const { bookmarks, toggleBookmark } = useApp();
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch(type) {
      case 'note': return <FiFileText />;
      case 'pdf': return <FiFile />;
      case 'image': return <FiImage />;
      case 'video': return <FiVideo />;
      default: return <FiBookmark />;
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

  const handleClick = (item) => {
    switch(item.type) {
      case 'note':
        navigate(`/notes/${item.id}`);
        break;
      case 'pdf':
        navigate('/pdfs');
        break;
      case 'image':
        navigate('/images');
        break;
      case 'video':
        navigate('/videos');
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-enter">
      <h2 className="page-title">बुकमार्क</h2>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⭐</div>
          <h3>कोई बुकमार्क नहीं</h3>
          <p>आपने अभी तक कुछ भी बुकमार्क नहीं किया है। किसी भी नोट्स, PDF, चित्र या वीडियो पर बुकमार्क आइकन दबाएं।</p>
        </div>
      ) : (
        bookmarks.map(item => (
          <div key={item.id} className="card" onClick={() => handleClick(item)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: '#E3F2FD', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--primary)', fontSize: 18, flexShrink: 0
                }}>
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="card-title" style={{ fontSize: 14 }}>{item.title}</div>
                  <div className="card-category">{getTypeName(item.type)}</div>
                </div>
              </div>
              <button
                className="bookmark-btn active"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(item);
                }}
              >
                <FaBookmark />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
