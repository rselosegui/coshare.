import React from 'react';
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
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, lang, setLang, handleLogout, user, onDashboardClick }) => {
  const t = DICTIONARY[lang];

  // Mobile nav should be visible even for guests on Dashboard, but protected routes trigger auth
  if (currentView === 'LANDING' || currentView === 'AUTH') return null;

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
    
    if (item.id === 'DASHBOARD' && onDashboardClick) {
        onDashboardClick();
        return;
    }

    // Guest Handling: If trying to access protected route without user, redirect to Auth (handled by parent usually, but we can signal view change to triggers)
    // Actually, App.tsx handles the view switch. If we switch to VAULT and user is null, App doesn't strictly block it but the component might check. 
    // Better UX: Trigger Auth modal if guest clicks protected link.
    // However, `Navigation` is only rendered if `!user` check was passed in previous code. 
    // Let's allow guest navigation and let App.tsx or Sidebar logic apply. 
    // Since this is mobile nav, let's assume we want to show it for guests too on Dashboard?
    // Original code: if (!user) return null; -> so Mobile Nav was HIDDEN for guests.
    // Let's KEEP it hidden for guests to maintain original behavior, or show it?
    // Project brief implies strict auth. Let's stick to "User must be logged in to see bottom nav" or at least it only showed for users.
    // BUT "Sidebar" shows for guests. Consistency? 
    // Let's make Mobile Nav visible for guests but clicking protected items prompts login.
    
    // UPDATE: To match Sidebar behavior, we should show it. But `App.tsx` logic might need update.
    // For now, let's keep it simple: If user is null, clicking protected item -> opens Auth.
    // Since we don't have `onSignIn` prop here, we can setView('AUTH') via a wrapper or assume `setView` handles it if we pass a special state?
    // Actually, `App.tsx` `renderView` for `VAULT` doesn't check user. 
    // Let's revert to: Only show for User (as per original code), OR modify App to pass onSignIn.
    // I will stick to: Only show for User.
    setView(item.id as ViewState);
  };
  
  if (!user) return null;

  return (
    <>
      {/* 
        MOBILE ONLY BOTTOM NAVIGATION 
        Hidden on Desktop (md:hidden)
        Updated to Floating Pill design
      */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-stone-900/95 backdrop-blur-2xl text-stone-200 z-[70] rounded-2xl shadow-2xl shadow-black/20 transition-transform duration-300 animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between px-6 py-3">
            
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`
                flex flex-col items-center justify-center gap-1 transition-all duration-300 relative
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

           {/* Logout Button (Mobile) */}
           <button
              onClick={() => { vibrate(); handleLogout(); }}
              className="flex flex-col items-center justify-center gap-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={22} className="stroke-[2]" />
            </button>
        </div>
      </nav>
    </>
  );
};