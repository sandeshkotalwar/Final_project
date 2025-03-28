import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ChatbotPage from './pages/ChatbotPage';
import StoryPage from './pages/StoryPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, onLogin, onRegister }) {
  const location = useLocation();

  // Conditionally render Navbar only on the Home page
  const showNavbar = location.pathname === '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={onLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup onRegister={onRegister} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/chatbot"
          element={
            isAuthenticated ? (
              <ChatbotPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/story"
          element={
            isAuthenticated ? (
              <StoryPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;