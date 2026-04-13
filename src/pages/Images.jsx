import { useState } from 'react';
import { FiX, FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';

export default function Images() {
  const { images, toggleBookmark, isBookmarked } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('सभी');

  const categories = ['सभी', ...new Set(images.map(img => img.category))];

  const filteredImages = activeCategory === 'सभी'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="page-enter">
      <h2 className="page-title">शैक्षिक चित्र</h2>

      <div className="category-chips">
        {categories.map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="image-grid">
        {filteredImages.map(img => (
          <div key={img.id} className="image-card">
            <img
              src={img.url}
              alt={img.title}
              onClick={() => setSelectedImage(img)}
              loading="lazy"
            />
            <div className="image-card-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="image-card-title">{img.title}</span>
                <button
                  className={`bookmark-btn ${isBookmarked(img.id, 'image') ? 'active' : ''}`}
                  onClick={() => toggleBookmark({ ...img, type: 'image' })}
                  style={{ fontSize: 14 }}
                >
                  {isBookmarked(img.id, 'image') ? <FaBookmark /> : <FiBookmark />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🖼️</div>
          <h3>कोई चित्र नहीं मिला</h3>
          <p>इस श्रेणी में अभी कोई चित्र उपलब्ध नहीं है</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
            <FiX />
          </button>
          <img src={selectedImage.url} alt={selectedImage.title} />
          <p style={{ color: 'white', marginTop: 12, fontSize: 14, textAlign: 'center' }}>
            {selectedImage.title}
          </p>
        </div>
      )}
    </div>
  );
}
