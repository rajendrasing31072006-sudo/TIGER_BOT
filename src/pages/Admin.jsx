import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { noteCategories } from '../data/notes';
import { videoCategories } from '../data/videos';

export default function Admin() {
  const { addNote, addPdf, addImage, addVideo, addLink,
          notes, pdfs, images, videos, links,
          deleteNote, deletePdf, deleteImage, deleteVideo, deleteLink } = useApp();
  const [activeTab, setActiveTab] = useState('notes');

  const tabs = [
    { id: 'notes', label: 'नोट्स' },
    { id: 'pdfs', label: 'PDF' },
    { id: 'images', label: 'चित्र' },
    { id: 'videos', label: 'वीडियो' },
    { id: 'links', label: 'लिंक' },
    { id: 'manage', label: 'प्रबंधन' },
  ];

  return (
    <div className="page-enter">
      <h2 className="page-title">एडमिन पैनल</h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        यहाँ से आप नोट्स, PDF, चित्र, वीडियो और लिंक अपलोड कर सकते हैं
      </p>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'notes' && <AddNoteForm onAdd={addNote} />}
      {activeTab === 'pdfs' && <AddPdfForm onAdd={addPdf} />}
      {activeTab === 'images' && <AddImageForm onAdd={addImage} />}
      {activeTab === 'videos' && <AddVideoForm onAdd={addVideo} />}
      {activeTab === 'links' && <AddLinkForm onAdd={addLink} />}
      {activeTab === 'manage' && (
        <ManageContent
          notes={notes} pdfs={pdfs} images={images} videos={videos} links={links}
          onDeleteNote={deleteNote} onDeletePdf={deletePdf}
          onDeleteImage={deleteImage} onDeleteVideo={deleteVideo}
          onDeleteLink={deleteLink}
        />
      )}
    </div>
  );
}

function AddNoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('भूगोल');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, category, content });
    setTitle('');
    setContent('');
  };

  return (
    <form className="admin-section" onSubmit={handleSubmit}>
      <h3>नया नोट्स जोड़ें</h3>
      <div className="form-group">
        <label className="form-label">शीर्षक</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="नोट्स का शीर्षक लिखें" required />
      </div>
      <div className="form-group">
        <label className="form-label">श्रेणी</label>
        <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
          {noteCategories.filter(c => c !== 'सभी').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">विषय-वस्तु</label>
        <textarea className="form-textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="नोट्स की विषय-वस्तु लिखें..." required />
      </div>
      <button type="submit" className="submit-btn">नोट्स जोड़ें</button>
    </form>
  );
}

function AddPdfForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('सामान्य ज्ञान');
  const [url, setUrl] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd({ title, category, url, size: size || 'Unknown' });
    setTitle('');
    setUrl('');
    setSize('');
  };

  return (
    <form className="admin-section" onSubmit={handleSubmit}>
      <h3>नई PDF जोड़ें</h3>
      <div className="form-group">
        <label className="form-label">शीर्षक</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="PDF का शीर्षक" required />
      </div>
      <div className="form-group">
        <label className="form-label">श्रेणी</label>
        <input className="form-input" value={category} onChange={e => setCategory(e.target.value)} placeholder="जैसे: सामान्य ज्ञान, गणित" />
      </div>
      <div className="form-group">
        <label className="form-label">PDF URL</label>
        <input className="form-input" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/file.pdf" required />
      </div>
      <div className="form-group">
        <label className="form-label">फ़ाइल साइज़</label>
        <input className="form-input" value={size} onChange={e => setSize(e.target.value)} placeholder="जैसे: 2.5 MB" />
      </div>
      <button type="submit" className="submit-btn">PDF जोड़ें</button>
    </form>
  );
}

function AddImageForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('मानचित्र');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd({ title, category, url });
    setTitle('');
    setUrl('');
  };

  return (
    <form className="admin-section" onSubmit={handleSubmit}>
      <h3>नया चित्र जोड़ें</h3>
      <div className="form-group">
        <label className="form-label">शीर्षक</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="चित्र का शीर्षक" required />
      </div>
      <div className="form-group">
        <label className="form-label">श्रेणी</label>
        <input className="form-input" value={category} onChange={e => setCategory(e.target.value)} placeholder="जैसे: मानचित्र, चार्ट" />
      </div>
      <div className="form-group">
        <label className="form-label">चित्र URL</label>
        <input className="form-input" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/image.jpg" required />
      </div>
      <button type="submit" className="submit-btn">चित्र जोड़ें</button>
    </form>
  );
}

function AddVideoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('भूगोल');
  const [videoId, setVideoId] = useState('');

  const extractVideoId = (input) => {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : input;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !videoId.trim()) return;
    onAdd({ title, category, videoId: extractVideoId(videoId) });
    setTitle('');
    setVideoId('');
  };

  return (
    <form className="admin-section" onSubmit={handleSubmit}>
      <h3>नया वीडियो जोड़ें</h3>
      <div className="form-group">
        <label className="form-label">शीर्षक</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="वीडियो का शीर्षक" required />
      </div>
      <div className="form-group">
        <label className="form-label">श्रेणी</label>
        <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
          {videoCategories.filter(c => c !== 'सभी').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">YouTube लिंक या Video ID</label>
        <input className="form-input" value={videoId} onChange={e => setVideoId(e.target.value)} placeholder="https://youtube.com/watch?v=... या Video ID" required />
      </div>
      <button type="submit" className="submit-btn">वीडियो जोड़ें</button>
    </form>
  );
}

function AddLinkForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('telegram');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd({ title, url, type, icon: type });
    setTitle('');
    setUrl('');
  };

  return (
    <form className="admin-section" onSubmit={handleSubmit}>
      <h3>नया लिंक जोड़ें</h3>
      <div className="form-group">
        <label className="form-label">शीर्षक</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="लिंक का शीर्षक" required />
      </div>
      <div className="form-group">
        <label className="form-label">प्रकार</label>
        <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">URL</label>
        <input className="form-input" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." required />
      </div>
      <button type="submit" className="submit-btn">लिंक जोड़ें</button>
    </form>
  );
}

function ManageContent({ notes, pdfs, images, videos, links,
                         onDeleteNote, onDeletePdf, onDeleteImage, onDeleteVideo, onDeleteLink }) {
  return (
    <div className="admin-section">
      <h3>सामग्री प्रबंधन</h3>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: 'var(--primary)' }}>नोट्स ({notes.length})</h4>
        {notes.map(note => (
          <div key={note.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>{note.title}</span>
            <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: 'var(--primary)' }}>PDF ({pdfs.length})</h4>
        {pdfs.map(pdf => (
          <div key={pdf.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>{pdf.title}</span>
            <button className="delete-btn" onClick={() => onDeletePdf(pdf.id)}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: 'var(--primary)' }}>चित्र ({images.length})</h4>
        {images.map(img => (
          <div key={img.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>{img.title}</span>
            <button className="delete-btn" onClick={() => onDeleteImage(img.id)}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: 'var(--primary)' }}>वीडियो ({videos.length})</h4>
        {videos.map(video => (
          <div key={video.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>{video.title}</span>
            <button className="delete-btn" onClick={() => onDeleteVideo(video.id)}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: 'var(--primary)' }}>लिंक ({links.length})</h4>
        {links.map(link => (
          <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13 }}>{link.title}</span>
            <button className="delete-btn" onClick={() => onDeleteLink(link.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
