
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoGrid from '../components/VideoGrid';
import LoginPage from '../components/LoginPage';

const EXPIRY_DATE = new Date('2025-06-25T10:00:00');

const Index = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Check if webpage has expired
    const checkExpiry = () => {
      const now = new Date();
      if (now >= EXPIRY_DATE) {
        localStorage.removeItem('algot_user');
        localStorage.removeItem('algot_session');
        setIsLoggedIn(false);
        return;
      }
    };

    // Check existing session
    const checkSession = () => {
      const storedUser = localStorage.getItem('algot_user');
      const storedSession = localStorage.getItem('algot_session');
      
      if (storedUser && storedSession) {
        const sessionData = JSON.parse(storedSession);
        const sessionId = sessionData.id;
        const sessionUser = sessionData.user;
        
        // Check if this is the same session
        if (sessionUser === storedUser) {
          setCurrentUser(storedUser);
          setIsLoggedIn(true);
        } else {
          // Different user trying to login, clear session
          localStorage.removeItem('algot_user');
          localStorage.removeItem('algot_session');
        }
      }
    };

    checkExpiry();
    checkSession();

    // Set up expiry check interval
    const interval = setInterval(checkExpiry, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (username: string) => {
    const sessionId = Date.now().toString();
    const sessionData = {
      id: sessionId,
      user: username,
      timestamp: Date.now()
    };
    
    localStorage.setItem('algot_user', username);
    localStorage.setItem('algot_session', JSON.stringify(sessionData));
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('algot_user');
    localStorage.removeItem('algot_session');
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-1 pt-16 pb-20">
        <VideoGrid activeTab={activeTab} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
