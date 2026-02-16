import React, { useState } from 'react';
import { Locale, User, ViewState } from '../types';
import { DICTIONARY } from '../constants';
import { LogIn, User as UserIcon, Lock, Settings, LogOut, ChevronDown, LayoutGrid, Globe } from 'lucide-react';

interface HeaderProps {
  lang: Locale;
  setLang: (l: Locale) => void;
  user: User | null;
  onSignIn: () => void;
  onLogoClick: () => void;
  setView: (view: ViewState) => void;
  onLogout: () => void;
  onDashboardClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, user, onSignIn, onLogoClick, setView, onLogout, onDashboardClick }) => {
  const t = DICTIONARY[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Wrapper to allow animation to play before unmounting/navigation
  const handleMobileSignIn = () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(15);
      }
      setTimeout(() => {
          onSignIn();
      }, 350);
  };

  const handleDashboardNav = () => {
      if (onDashboardClick) {
          onDashboardClick();
      } else {
          setView('DASHBOARD');
      }
  };

  const toggleLanguage = () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(10);
      }
      setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] bg-stone-50/80 backdrop-blur-xl border-b border-stone-200/50 px-6 py-4 flex justify-between items-center h-[72px] transition-all duration-500">
        <button onClick={onLogoClick} className="text-2xl font-serif font-bold tracking-tight hover:opacity-70 transition-opacity text-stone-900">
          coshare.
        </button>
        
        <div className="flex items-center gap-6">
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            className="hover:bg-stone-100 rounded-full px-3 py-1 transition-colors"
            aria-label="Toggle Language"
          >
            {/* Desktop View */}
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-stone-500">
                EN / AR
            </span>
            
            {/* Mobile View */}
            <span className="md:hidden text-stone-600">
                <Globe size={20} strokeWidth={1.5} />
            </span>
          </button>
          
          {!user ? (
            /* Desktop Sign In Button */
            <button onClick={onSignIn} className="hidden md:flex px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-widest hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-900/20 active:scale-95 transition-all items-center gap-2 rounded-full">
               <LogIn size={14} />
               <span>{t.signIn}</span>
            </button>
          ) : (
            /* Desktop User Dropdown */
            <div 
              className="relative group hidden md:block"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
               <button 
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity py-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                   <span className="text-xs font-bold uppercase tracking-wider text-stone-600">{user.firstName}</span>
                   <div className="w-9 h-9 bg-stone-200 text-stone-600 rounded-full flex items-center justify-center border border-stone-100 shadow-sm">
                       <UserIcon size={16} />
                   </div>
                   <ChevronDown size={12} className={`text-stone-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
               </button>

               {/* Dropdown Menu */}
               <div className={`
                  absolute top-full right-0 w-60 bg-white/90 backdrop-blur-xl border border-stone-100 shadow-2xl shadow-stone-900/10 rounded-2xl overflow-hidden
                  transition-all duration-200 origin-top-right mt-2
                  ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
               `}>
                  <div className="p-2 flex flex-col gap-1">
                      <button 
                          onClick={() => { handleDashboardNav(); setIsMenuOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors text-left rounded-xl"
                      >
                          <LayoutGrid size={14} /> {t.dashboard}
                      </button>
                      <button 
                          onClick={() => { setView('VAULT'); setIsMenuOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors text-left rounded-xl"
                      >
                          <Lock size={14} /> {t.vault}
                      </button>
                      <button 
                          onClick={() => { setView('PROFILE'); setIsMenuOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors text-left rounded-xl"
                      >
                          <UserIcon size={14} /> Profile
                      </button>
                      <button 
                          onClick={() => { setView('SETTINGS'); setIsMenuOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors text-left rounded-xl"
                      >
                          <Settings size={14} /> Settings
                      </button>
                      <div className="h-px bg-stone-100 my-1 mx-2" />
                      <button 
                          onClick={() => { onLogout(); setIsMenuOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-50 text-red-600 transition-colors text-left rounded-xl"
                      >
                          <LogOut size={14} /> Sign Out
                      </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Floating Sign In Button (Only when !user) */}
      {!user && (
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-4 duration-500">
            <button 
                onClick={handleMobileSignIn} 
                className="group relative w-16 h-16 bg-stone-900 text-white rounded-full shadow-2xl shadow-stone-900/30 flex items-center justify-center transition-all duration-200 active:scale-90 border-[4px] border-stone-50 active:bg-stone-800"
                aria-label={t.signIn}
            >
                {/* Ping ring */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_linear_infinite] opacity-50" />
                
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="relative z-10"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <g className="transition-transform duration-200 ease-out group-active:translate-x-4">
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </g>
                </svg>
            </button>
        </div>
      )}
    </>
  );
};