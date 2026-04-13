import { createContext, useContext, useState, useEffect } from 'react';
import { sampleNotes } from '../data/notes';
import { samplePdfs } from '../data/pdfs';
import { sampleImages } from '../data/images';
import { sampleVideos } from '../data/videos';
import { sampleLinks } from '../data/links';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Load data from localStorage or use sample data
    const savedNotes = localStorage.getItem('raj_notes');
    const savedPdfs = localStorage.getItem('raj_pdfs');
    const savedImages = localStorage.getItem('raj_images');
    const savedVideos = localStorage.getItem('raj_videos');
    const savedLinks = localStorage.getItem('raj_links');
    const savedBookmarks = localStorage.getItem('raj_bookmarks');

    setNotes(savedNotes ? JSON.parse(savedNotes) : sampleNotes);
    setPdfs(savedPdfs ? JSON.parse(savedPdfs) : samplePdfs);
    setImages(savedImages ? JSON.parse(savedImages) : sampleImages);
    setVideos(savedVideos ? JSON.parse(savedVideos) : sampleVideos);
    setLinks(savedLinks ? JSON.parse(savedLinks) : sampleLinks);
    setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('raj_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('raj_pdfs', JSON.stringify(pdfs));
  }, [pdfs]);

  useEffect(() => {
    localStorage.setItem('raj_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('raj_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('raj_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('raj_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleBookmark = (item) => {
    const exists = bookmarks.find(b => b.id === item.id && b.type === item.type);
    if (exists) {
      setBookmarks(bookmarks.filter(b => !(b.id === item.id && b.type === item.type)));
      showToast('बुकमार्क हटाया गया');
    } else {
      setBookmarks([...bookmarks, item]);
      showToast('बुकमार्क जोड़ा गया');
    }
  };

  const isBookmarked = (id, type) => {
    return bookmarks.some(b => b.id === id && b.type === type);
  };

  const addNote = (note) => {
    const newNote = { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setNotes(prev => [newNote, ...prev]);
    showToast('नोट्स जोड़े गए');
  };

  const addPdf = (pdf) => {
    const newPdf = { ...pdf, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setPdfs(prev => [newPdf, ...prev]);
    showToast('PDF जोड़ी गई');
  };

  const addImage = (image) => {
    const newImage = { ...image, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setImages(prev => [newImage, ...prev]);
    showToast('चित्र जोड़ा गया');
  };

  const addVideo = (video) => {
    const newVideo = { ...video, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setVideos(prev => [newVideo, ...prev]);
    showToast('वीडियो जोड़ा गया');
  };

  const addLink = (link) => {
    const newLink = { ...link, id: Date.now().toString() };
    setLinks(prev => [newLink, ...prev]);
    showToast('लिंक जोड़ा गया');
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('नोट्स हटाए गए');
  };

  const deletePdf = (id) => {
    setPdfs(prev => prev.filter(p => p.id !== id));
    showToast('PDF हटाई गई');
  };

  const deleteImage = (id) => {
    setImages(prev => prev.filter(i => i.id !== id));
    showToast('चित्र हटाया गया');
  };

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    showToast('वीडियो हटाया गया');
  };

  const deleteLink = (id) => {
    setLinks(prev => prev.filter(l => l.id !== id));
    showToast('लिंक हटाया गया');
  };

  const value = {
    notes, pdfs, images, videos, links, bookmarks,
    searchQuery, setSearchQuery,
    toast, showToast,
    toggleBookmark, isBookmarked,
    addNote, addPdf, addImage, addVideo, addLink,
    deleteNote, deletePdf, deleteImage, deleteVideo, deleteLink,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
