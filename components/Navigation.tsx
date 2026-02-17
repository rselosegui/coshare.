import React, { useEffect, useState } from 'react';
import { Home, Lock, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { ViewState, Locale, User } from '../types';
import { DICTIONARY } from '../constants';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  lang: Locale;
  setLang: (l: Locale) => void;
  handleLogout: () => void;
  user: User | null;
  onDashboardClick?: () => void;
  onSignIn: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, lang, setLang, handleLogout, user, onDashboardClick, onSignIn }) => {
  const t = DICTIONARY[lang];
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Keyboard Detection Logic using Visual Viewport
  useEffect(() => {
    const handleResize = () => {
        if (window.visualViewport) {
            const currentHeight = window.visualViewport.height;
            const screenHeight = window.innerHeight;
            
            // If viewport height is significantly smaller than screen height ( < 80%), assume keyboard is open
            if (currentHeight < screenHeight * 0.8) {
                setIsKeyboardOpen(true);
            } else {
                setIsKeyboardOpen(false);
            }
        }
    };
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', handleResize);
        }
    };
  }, []);

  // Mobile nav should be visible even for guests on Dashboard, but protected routes trigger auth
  if (currentView === 'LANDING' || currentView === 'AUTH') return null;

  // Don't render nav if keyboard is likely open to prevent obstruction
  if (isKeyboardOpen) return null;

  const navItems = [
    { id: 'DASHBOARD', label: t.dashboard, icon: Home, protected: false },
    { id: 'VAULT', label: t.vault, icon: Lock, protected: true },
    { id: 'PROFILE', label: 'Profile', icon: UserIcon, protected: true },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, protected: true },
  ];

  const vibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    vibrate();
    
    if (item.protected && !user) {
        onSignIn();
        return;
    }

    if (item.id === 'DASHBOARD' && onDashboardClick) {
        onDashboardClick();
        return;
    }
    setView(item.id as ViewState);
  };
  
  // Show navigation bar for all users (Guest or Logged in) when on Dashboard
  // But check user for the specific rendering of the component if needed (though layout allows guests)
  // The 'user' check at the end of original file was: if (!user) return null;
  // We want guests to see the nav so they can click 'Profile' and get prompted to sign in.
  
  return (
    <>
      {/* 
        Unified Floating Navigation 
        Visible on Mobile and Desktop
        Centered Pill Design
      */}
      <nav className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto md:min-w-[360px] bg-stone-900/95 backdrop-blur-2xl text-stone-200 z-[70] rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 animate-in slide-in-from-bottom-4 border border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
            
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`
                flex flex-col items-center justify-center gap-1 transition-all duration-300 relative px-2
                ${currentView === item.id ? 'text-white scale-110' : 'text-stone-500 hover:text-stone-300'}
              `}
            >
              <item.icon 
                size={22} 
                className={`stroke-[2] transition-transform duration-300`} 
              />
              {/* Active Dot */}
              {currentView === item.id && (
                  <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          ))}

           {/* Logout Button (Only if logged in) */}
           {user && (
               <button
                  onClick={() => { vibrate(); handleLogout(); }}
                  className="flex flex-col items-center justify-center gap-1 text-red-400 hover:text-red-300 transition-colors px-2"
                >
                  <LogOut size={22} className="stroke-[2]" />
                </button>
           )}
        </div>
      </nav>
    </>
  );
};