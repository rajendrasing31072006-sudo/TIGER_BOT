import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
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
import Login from './pages/Login.jsx';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">लोड हो रहा है...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const { toast } = useApp();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>लोड हो रहा है...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {user && <Header />}
      <main className={user ? "main-content" : "main-content-full"}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NoteDetail /></ProtectedRoute>} />
          <Route path="/pdfs" element={<ProtectedRoute><Pdfs /></ProtectedRoute>} />
          <Route path="/images" element={<ProtectedRoute><Images /></ProtectedRoute>} />
          <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
          <Route path="/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </main>
      {user && <BottomNav />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
