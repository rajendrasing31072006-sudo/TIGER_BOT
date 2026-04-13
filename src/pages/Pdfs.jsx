import { useState } from 'react';
import { FiFile, FiEye, FiDownload, FiBookmark, FiX } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext.jsx';

export default function Pdfs() {
  const { pdfs, toggleBookmark, isBookmarked } = useApp();
  const [viewingPdf, setViewingPdf] = useState(null);

  return (
    <div className="page-enter">
      <h2 className="page-title">PDF डाउनलोड</h2>

      {pdfs.map(pdf => (
        <div key={pdf.id} className="pdf-card">
          <div className="pdf-icon">
            <FiFile />
          </div>
          <div className="pdf-info">
            <div className="pdf-title">{pdf.title}</div>
            <div className="pdf-meta">
              <span>{pdf.category}</span>
              <span>{pdf.size}</span>
            </div>
          </div>
          <div className="pdf-actions">
            <button
              className={`bookmark-btn ${isBookmarked(pdf.id) ? 'active' : ''}`}
              onClick={() => toggleBookmark({ ...pdf, type: 'pdf' })}
              style={{ fontSize: 16 }}
            >
              {isBookmarked(pdf.id) ? <FaBookmark /> : <FiBookmark />}
            </button>
            <button
              className="pdf-btn pdf-view-btn"
              onClick={() => setViewingPdf(pdf)}
              title="देखें"
            >
              <FiEye />
            </button>
            <a
              href={pdf.url}
              download
              className="pdf-btn pdf-download-btn"
              title="डाउनलोड"
            >
              <FiDownload />
            </a>
          </div>
        </div>
      ))}

      {pdfs.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📄</div>
          <h3>कोई PDF नहीं मिली</h3>
          <p>अभी कोई PDF उपलब्ध नहीं है</p>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="pdf-viewer-overlay">
          <div className="pdf-viewer-header">
            <span className="pdf-viewer-title">{viewingPdf.title}</span>
            <button className="pdf-viewer-close" onClick={() => setViewingPdf(null)}>
              <FiX />
            </button>
          </div>
          <iframe
            className="pdf-viewer-frame"
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingPdf.url)}&embedded=true`}
            title={viewingPdf.title}
          />
        </div>
      )}
    </div>
  );
}
