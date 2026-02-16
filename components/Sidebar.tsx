import React from 'react';
import { Home, Lock, User as UserIcon, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { ViewState, User, Locale } from '../types';
import { DICTIONARY } from '../constants';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User | null;
  lang: Locale;
  onSignIn: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, lang, onSignIn, onLogout }) => {
  const t = DICTIONARY[lang];

  const navItems = [
    { id: 'DASHBOARD', label: t.dashboard, icon: Home, protected: false },
    { id: 'VAULT', label: t.vault, icon: Lock, protected: true },
    { id: 'PROFILE', label: t.portfolio, icon: UserIcon, protected: true },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, protected: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.protected && !user) {
        onSignIn();
    } else {
        setView(item.id as ViewState);
    }
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 bg-stone-50/50 backdrop-blur-xl border-r border-stone-200/50 flex-col justify-between py-8 px-4 z-40 animate-in slide-in-from-left-4 duration-500">
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`
                w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 group
                ${isActive 
                  ? 'bg-stone-900 text-stone-50 shadow-lg shadow-stone-900/10' 
                  : 'text-stone-500 hover:bg-white hover:text-stone-900 hover:shadow-sm'
                }
              `}
            >
              <item.icon 
                size={18} 
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                strokeWidth={2}
              />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {/* Status Card */}
        {user ? (
            <div className="bg-white border border-stone-100 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                        <UserIcon size={14} />
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-xs font-bold text-stone-900 truncate">{user.firstName}</div>
                        <div className="text-[10px] text-stone-400 uppercase tracking-wider truncate">{user.isVerified ? 'Verified Member' : 'Guest Member'}</div>
                    </div>
                </div>
                {user.isVerified && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        <ShieldCheck size={10} /> Verified
                    </div>
                )}
            </div>
        ) : (
             <div className="bg-stone-900 p-6 rounded-2xl text-white shadow-xl shadow-stone-900/20 text-center">
                <p className="text-xs font-serif italic opacity-80 mb-4">"Ownership is the ultimate luxury."</p>
                <button 
                    onClick={onSignIn}
                    className="w-full py-2 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-stone-200 transition-colors"
                >
                    Sign In
                </button>
            </div>
        )}

        {user && (
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-50 py-3 rounded-xl transition-colors"
            >
                <LogOut size={14} /> {t.logout}
            </button>
        )}
        
        <div className="text-[10px] text-stone-300 uppercase tracking-widest text-center">
            v2.4.0 • Stable
        </div>
      </div>
    </aside>
  );
};