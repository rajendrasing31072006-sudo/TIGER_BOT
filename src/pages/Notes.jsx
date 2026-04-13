import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';
import { noteCategories } from '../data/notes';

export default function Notes() {
  const { notes, toggleBookmark, isBookmarked } = useApp();
  const [activeCategory, setActiveCategory] = useState('सभी');
  const navigate = useNavigate();

  const filteredNotes = activeCategory === 'सभी'
    ? notes
    : notes.filter(n => n.category === activeCategory);

  return (
    <div className="page-enter">
      <h2 className="page-title">नोट्स</h2>

      {/* Category Filter */}
      <div className="category-chips">
        {noteCategories.map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      {filteredNotes.map(note => (
        <div key={note.id} className="card" onClick={() => navigate(`/notes/${note.id}`)}>
          <div className="card-category">{note.category}</div>
          <h3 className="card-title">{note.title}</h3>
          <p className="card-content" style={{ maxHeight: 60, overflow: 'hidden' }}>
            {note.content.substring(0, 100)}...
          </p>
          <div className="card-meta">
            <span>{new Date(note.createdAt).toLocaleDateString('hi-IN')}</span>
            <button
              className={`bookmark-btn ${isBookmarked(note.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark({ ...note, type: 'note' });
              }}
            >
              {isBookmarked(note.id) ? <FaBookmark /> : <FiBookmark />}
            </button>
          </div>
        </div>
      ))}

      {filteredNotes.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>कोई नोट्स नहीं मिले</h3>
          <p>इस श्रेणी में अभी कोई नोट्स उपलब्ध नहीं हैं</p>
        </div>
      )}
    </div>
  );
}
