import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import Notes from './pages/Notes.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import Pdfs from './pages/Pdfs.jsx';
import Images from './pages/Images.jsx';
import Videos from './pages/Videos.jsx';
import Links from './pages/Links.jsx';
import Admin from './pages/Admin.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import Search from './pages/Search.jsx';
import './App.css';

function App() {
  const { toast } = useApp();

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/pdfs" element={<Pdfs />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/links" element={<Links />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <BottomNav />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
