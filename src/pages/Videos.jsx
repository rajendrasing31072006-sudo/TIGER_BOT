import { useState } from 'react';
import { FiPlay, FiX, FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';
import { videoCategories } from '../data/videos';

export default function Videos() {
  const { videos, toggleBookmark, isBookmarked } = useApp();
  const [activeCategory, setActiveCategory] = useState('सभी');
  const [playingVideo, setPlayingVideo] = useState(null);

  const filteredVideos = activeCategory === 'सभी'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="page-enter">
      <h2 className="page-title">वीडियो लेक्चर</h2>

      <div className="category-chips">
        {videoCategories.map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredVideos.map(video => (
        <div key={video.id} className="video-card">
          <div className="video-thumbnail" onClick={() => setPlayingVideo(video)}>
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
              alt={video.title}
              loading="lazy"
            />
            <div className="video-play-btn">
              <FiPlay />
            </div>
          </div>
          <div className="video-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="video-title">{video.title}</div>
                <div className="card-category" style={{ marginTop: 4 }}>{video.category}</div>
              </div>
              <button
                className={`bookmark-btn ${isBookmarked(video.id, 'video') ? 'active' : ''}`}
                onClick={() => toggleBookmark({ ...video, type: 'video' })}
              >
                {isBookmarked(video.id, 'video') ? <FaBookmark /> : <FiBookmark />}
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredVideos.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h3>कोई वीडियो नहीं मिला</h3>
          <p>इस श्रेणी में अभी कोई वीडियो उपलब्ध नहीं है</p>
        </div>
      )}

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="video-modal-overlay">
          <button
            className="image-modal-close"
            onClick={() => setPlayingVideo(null)}
          >
            <FiX />
          </button>
          <div className="video-player-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1`}
              title={playingVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="video-modal-title">{playingVideo.title}</p>
        </div>
      )}
    </div>
  );
}
