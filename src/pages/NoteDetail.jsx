import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookmark, FiShare2 } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, toggleBookmark, isBookmarked } = useApp();

  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="page-enter">
        <button className="back-btn" onClick={() => navigate('/notes')}>
          <FiArrowLeft /> वापस जाएं
        </button>
        <div className="empty-state">
          <h3>नोट्स नहीं मिला</h3>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: note.content.substring(0, 200),
        });
      } catch (err) {
        // Share cancelled
      }
    }
  };

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button className="back-btn" onClick={() => navigate('/notes')} style={{ marginBottom: 0 }}>
          <FiArrowLeft /> वापस जाएं
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`bookmark-btn ${isBookmarked(note.id) ? 'active' : ''}`}
            onClick={() => toggleBookmark({ ...note, type: 'note' })}
          >
            {isBookmarked(note.id) ? <FaBookmark /> : <FiBookmark />}
          </button>
          <button className="bookmark-btn" onClick={handleShare}>
            <FiShare2 />
          </button>
        </div>
      </div>

      <div className="note-detail">
        <div className="card-category">{note.category}</div>
        <h1 className="note-detail-title">{note.title}</h1>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          {new Date(note.createdAt).toLocaleDateString('hi-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
        <div className="note-detail-content">{note.content}</div>
      </div>
    </div>
  );
}
