import React, { useState, useRef, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { AssetDetail } from './components/AssetDetail';
import { Auth } from './components/Auth';
import { Vault } from './components/Vault';
import { Landing } from './components/Landing';
import { UploadAsset } from './components/UploadAsset';
import { Profile } from './components/Profile';
import { Header } from './components/Header';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { InfoPage } from './components/InfoPage';
import { ConciergeChat } from './components/ConciergeChat';
import { ViewState, Locale, Currency, Asset, User, InfoType } from './types';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('LANDING');
  // Simple history tracking for back button
  const [previousView, setPreviousView] = useState<ViewState | null>(null);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [lang, setLang] = useState<Locale>('en');
  const [currency, setCurrency] = useState<Currency>('AED');
  
  const [authRedirect, setAuthRedirect] = useState<ViewState>('DASHBOARD');
  const [infoPageType, setInfoPageType] = useState<InfoType>('MANIFESTO');
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- Scroll Restoration Logic ---
  const dashboardScrollRef = useRef(0);

  // Track scroll position whenever we are on the dashboard
  useEffect(() => {
    const handleScroll = () => {
      if (view === 'DASHBOARD') {
        dashboardScrollRef.current = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleDashboardClick = () => {
    if (view === 'DASHBOARD') {
        // Second tap: Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // First tap: Navigate to dashboard (component will handle restoring scroll)
        setView('DASHBOARD');
    }
  };
  // --------------------------------

  const handleLogin = (data: { firstName: string; isVerified: boolean }) => {
    setUser({
      firstName: data.firstName,
      lastName: 'Al-Falasi', // Mock last name
      email: 'member@coshare.ae',
      phone: '+971 50 000 0000',
      isVerified: data.isVerified,
      vibeTags: ['Art Patron', 'Global Citizen'],
      wishlist: [],
      portfolio: ['1', '3'], // Mock initial portfolio
      settings: {
        contactMethod: 'WHATSAPP',
        notifications: {
          email: true,
          push: true,
          whatsapp: true,
          newDrops: true,
          portfolioUpdates: true
        }
      },
      privacy: {
        isGhostMode: false,
        biometricEnabled: true,
        dataSharing: false,
        searchableByEmail: true,
        showVibeTags: true,
        showPortfolioValue: false,
        allowAiLearning: true,
        twoFactorEnabled: false
      }
    });
    setView(authRedirect);
  };

  const updateUser = (updates: Partial<User>) => {
      if (user) {
          setUser({ ...user, ...updates });
      }
  };

  const toggleWishlist = (assetId: string) => {
    if (!user) {
        setAuthRedirect(view);
        setView('AUTH');
        return;
    }
    const currentWishlist = user.wishlist || [];
    const newWishlist = currentWishlist.includes(assetId)
        ? currentWishlist.filter(id => id !== assetId)
        : [...currentWishlist, assetId];
        
    setUser({ ...user, wishlist: newWishlist });
  };

  const handlePurchase = (assetId: string) => {
      if (!user) {
          setAuthRedirect('ASSET_DETAIL');
          setView('AUTH');
          return;
      }
      if (!user.portfolio.includes(assetId)) {
          setUser({
              ...user,
              portfolio: [...user.portfolio, assetId]
          });
      }
      setView('PROFILE');
  };

  const handleAssetClick = (asset: Asset) => {
    setPreviousView(view); // Track where we came from
    setSelectedAsset(asset);
    setView('ASSET_DETAIL');
  };

  const handleBack = () => {
    setSelectedAsset(null);
    if (previousView && previousView !== 'ASSET_DETAIL') {
        setView(previousView);
    } else {
        setView('DASHBOARD');
    }
  };
  
  const handleInfoNav = (type: InfoType) => {
      setInfoPageType(type);
      setView('INFO');
  };

  const toggleCurrency = () => {
      const ord: Currency[] = ['AED', 'USD', 'EUR', 'GBP'];
      const idx = ord.indexOf(currency);
      setCurrency(ord[(idx + 1) % ord.length]);
  };

  const handleUploadComplete = () => {
      if (user) {
          setUser({
              ...user,
              vibeTags: [...user.vibeTags, 'Pending Seller']
          });
      }
      setView('DASHBOARD');
  };

  const handleLogoClick = () => {
      if (view === 'LANDING') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          handleDashboardClick();
      }
  };

  const handleLogout = () => {
      setUser(null);
      setView('LANDING');
      dashboardScrollRef.current = 0; // Reset scroll on logout
  };

  const renderView = () => {
    switch (view) {
      case 'LANDING':
          return (
            <Landing 
                lang={lang} 
                setLang={setLang} 
                onSignIn={() => {
                    setAuthRedirect('DASHBOARD');
                    setView('AUTH');
                }}
                onListAsset={() => {
                    if (user) {
                        setView('UPLOAD');
                    } else {
                        setAuthRedirect('UPLOAD');
                        setView('AUTH');
                    }
                }}
                onViewAll={() => {
                    setView('DASHBOARD');
                }}
                onInfoNav={handleInfoNav}
            />
          );
      case 'AUTH':
          return <Auth 
                    onLogin={handleLogin} 
                    lang={lang} 
                    onClose={() => setView('LANDING')}
                 />;
      case 'UPLOAD':
          return (
            <UploadAsset 
                lang={lang} 
                onBack={() => setView(user ? 'DASHBOARD' : 'LANDING')}
                onComplete={handleUploadComplete}
            />
          );
      case 'DASHBOARD':
        return (
          <Dashboard 
            user={user} 
            currency={currency} 
            lang={lang} 
            onAssetClick={handleAssetClick}
            toggleCurrency={toggleCurrency}
            onSignIn={() => {
                setAuthRedirect('DASHBOARD');
                setView('AUTH');
            }}
            onToggleWishlist={toggleWishlist}
            onBack={() => setView('LANDING')}
            initialScroll={dashboardScrollRef.current}
          />
        );
      case 'PROFILE':
          if (!user) return null;
          return (
              <Profile
                user={user}
                currency={currency}
                lang={lang}
                onAssetClick={handleAssetClick}
                onToggleWishlist={toggleWishlist}
                onBrowse={() => setView('DASHBOARD')}
                onOpenChat={() => setIsChatOpen(true)}
              />
          );
      case 'ASSET_DETAIL':
        if (!selectedAsset) return null;
        return (
          <AssetDetail 
            asset={selectedAsset} 
            currency={currency} 
            lang={lang} 
            onBack={handleBack}
            user={user}
            onToggleWishlist={toggleWishlist}
            onPurchase={handlePurchase}
          />
        );
      case 'VAULT':
        return <Vault lang={lang} />;
      case 'SETTINGS':
        if (!user) return null;
        return (
            <Settings 
                user={user} 
                lang={lang} 
                onUpdateUser={updateUser}
                onBack={() => setView('DASHBOARD')}
                initialTab="GENERAL"
            />
        );
      case 'PRIVACY':
        if (!user) return null;
        // Re-use Settings component but default to Privacy tab
        return (
            <Settings 
                user={user} 
                lang={lang} 
                onUpdateUser={updateUser}
                onBack={() => setView('DASHBOARD')}
                initialTab="PRIVACY"
            />
        );
      case 'INFO':
          return (
              <InfoPage 
                  type={infoPageType}
                  lang={lang}
                  onBack={() => setView('LANDING')}
              />
          );
      default:
        return null;
    }
  };

  return (
    <main className="bg-stone-50 min-h-screen text-stone-900 antialiased selection:bg-stone-900 selection:text-white relative">
      {/* Global Header */}
      {view !== 'AUTH' && (
          <Header 
            lang={lang} 
            setLang={setLang} 
            user={user} 
            onSignIn={() => {
                setAuthRedirect('DASHBOARD');
                setView('AUTH');
            }}
            onLogoClick={handleLogoClick}
            setView={setView}
            onLogout={handleLogout}
            onDashboardClick={handleDashboardClick}
          />
      )}

      {/* Navigation (Floating Dock - Mobile & Desktop) */}
      <Navigation 
        user={user}
        currentView={view}
        setView={setView}
        lang={lang}
        setLang={setLang}
        handleLogout={handleLogout}
        onDashboardClick={handleDashboardClick}
        onSignIn={() => {
            setAuthRedirect('DASHBOARD');
            setView('AUTH');
        }}
      />

      {/* Dynamic Content Area - Full width */}
      <div className={`min-h-screen transition-all duration-300`}>
        {renderView()}
      </div>
      
      {/* Concierge Chat Overlay */}
      {user && (
          <ConciergeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
      
      {/* Global "Status" Heartbeat (Only show when logged in) */}
      {user && (
        <div className="fixed bottom-4 right-4 hidden md:flex items-center gap-2 pointer-events-none z-40 opacity-50 mix-blend-difference text-stone-500">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Status: Ready</span>
        </div>
      )}
    </main>
  );
};

export default App;