import React, { useState, useMemo } from 'react';
import { Asset, Currency, Locale, User } from '../types';
import { MOCK_ASSETS, CURRENCY_RATES } from '../constants';
import { ShieldCheck, TrendingUp, LayoutGrid, List, Grid, QrCode, Phone, MessageSquare, ArrowUpRight, FileText, Clock, FileCheck } from 'lucide-react';
import { AssetCard } from './AssetCard';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

interface ProfileProps {
  user: User;
  currency: Currency;
  lang: Locale;
  onAssetClick: (asset: Asset) => void;
  onToggleWishlist: (id: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, currency, lang, onAssetClick, onToggleWishlist }) => {
  const [activeTab, setActiveTab] = useState<'PORTFOLIO' | 'WISHLIST'>('PORTFOLIO');
  
  // Default to 'COMPACT' (Mosaic) on mobile (< 768px), 'GRID' on desktop
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'COMPACT'>(() => {
      if (typeof window !== 'undefined') {
          return window.innerWidth < 768 ? 'COMPACT' : 'GRID';
      }
      return 'GRID';
  });
  
  const rate = CURRENCY_RATES[currency];

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val * rate);
  };

  const portfolioAssets = useMemo(() => {
      return MOCK_ASSETS.filter(a => user.portfolio.includes(a.id));
  }, [user.portfolio]);

  const wishlistAssets = useMemo(() => {
      return MOCK_ASSETS.filter(a => user.wishlist.includes(a.id));
  }, [user.wishlist]);

  const displayedAssets = activeTab === 'PORTFOLIO' ? portfolioAssets : wishlistAssets;
  const totalEquity = portfolioAssets.reduce((sum, asset) => sum + asset.pricePerFraction, 0);

  // Mock Data for Wealth Chart
  const wealthData = [
    { month: 'Jan', value: totalEquity * 0.88 },
    { month: 'Feb', value: totalEquity * 0.91 },
    { month: 'Mar', value: totalEquity * 0.90 },
    { month: 'Apr', value: totalEquity * 0.95 },
    { month: 'May', value: totalEquity * 0.97 },
    { month: 'Jun', value: totalEquity },
  ];

  // Mock Data for Activity Ledger
  const activities = [
    { id: 1, type: 'PAYOUT', title: 'Q2 Dividend Payout', amount: '+ 12,500 AED', date: 'Oct 24, 2025', status: 'COMPLETED' },
    { id: 2, type: 'BOOKING', title: 'Downtown Views II Stay', amount: 'Oct 12 - 19', date: 'Oct 10, 2025', status: 'UPCOMING' },
    { id: 3, type: 'ADMIN', title: 'Title Deed Verified', amount: 'Unit 4802', date: 'Sep 28, 2025', status: 'VERIFIED' },
    { id: 4, type: 'PURCHASE', title: 'Rolls-Royce Spectre (1/8)', amount: '- 180,000 AED', date: 'Sep 15, 2025', status: 'COMPLETED' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 text-white p-3 text-xs uppercase tracking-widest font-bold shadow-xl rounded-lg">
          <p>{label}</p>
          <p className="text-white mt-1">
            {new Intl.NumberFormat(lang, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(payload[0].value * rate)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-24 px-6 md:pr-12 max-w-7xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
        
        {/* Profile Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Left Col: Membership Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                <div className="relative w-full max-w-[420px] aspect-[1.586/1] perspective-1000 group shrink-0 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-black rounded-3xl shadow-2xl shadow-stone-900/40 p-8 flex flex-col justify-between text-white overflow-hidden transition-transform duration-500 ease-out transform group-hover:rotate-y-3 group-hover:scale-102 border border-white/10">
                        {/* Card Texture */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none" />
                        <div className="flex justify-between items-start z-10">
                            <span className="font-serif font-bold text-2xl tracking-tight">coshare.</span>
                            <div className="flex items-center gap-2 opacity-80">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Elite Member</span>
                            </div>
                        </div>
                        <div className="z-10 flex gap-4 items-center">
                            <div className="bg-white p-2 rounded-lg">
                                <QrCode size={40} className="text-stone-900" />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Member ID</div>
                                <div className="font-mono text-sm tracking-widest">8842-9921-CSHR</div>
                            </div>
                        </div>
                        <div className="z-10">
                            <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Holder Name</div>
                            <div className="flex justify-between items-end">
                                <h2 className="text-xl font-bold uppercase tracking-wide text-shadow-sm">{user.firstName} {user.lastName || 'Investor'}</h2>
                                <span className="text-[10px] font-bold opacity-50">VALID THRU 12/29</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Concierge Actions */}
                <div className="w-full max-w-[420px] bg-white border border-stone-200 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                        <MessageSquare size={14} /> Family Office Concierge
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 bg-stone-50 border border-stone-100 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group rounded-2xl">
                            <Phone size={20} className="mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Request Call</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-stone-50 border border-stone-100 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group rounded-2xl">
                            <MessageSquare size={20} className="mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Chat Now</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Col: Wealth & Activity */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* Wealth Chart */}
                <div>
                    <div className="flex justify-between items-end mb-6">
                         <div>
                             <h2 className="text-4xl font-serif text-stone-900">{formatMoney(totalEquity)}</h2>
                             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Asset Equity</span>
                         </div>
                         <div className="text-right">
                             <div className="text-xl font-bold text-green-600 flex items-center justify-end gap-1">
                                <TrendingUp size={20} /> +12.4%
                             </div>
                             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">YTD Performance</span>
                         </div>
                    </div>
                    <div className="h-[250px] w-full bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={wealthData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1c1917" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#1c1917" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" hide />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Tooltip content={<CustomTooltip />} cursor={{stroke: '#e7e5e4', strokeWidth: 1}} />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#1c1917" 
                                    strokeWidth={3} 
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* The Ledger */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-3">
                        <List size={14} /> Recent Activity Ledger
                    </h3>
                    <div className="space-y-4">
                        {activities.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-full border ${item.type === 'PAYOUT' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-stone-50 border-stone-100 text-stone-500'}`}>
                                        {item.type === 'PAYOUT' && <ArrowUpRight size={18} />}
                                        {item.type === 'BOOKING' && <Clock size={18} />}
                                        {item.type === 'ADMIN' && <FileCheck size={18} />}
                                        {item.type === 'PURCHASE' && <FileText size={18} />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-900">{item.title}</div>
                                        <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">{item.date} • {item.type}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${item.type === 'PAYOUT' ? 'text-green-600' : 'text-stone-900'}`}>{item.amount}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 inline-block px-2 py-0.5 mt-1 rounded-md">{item.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* Control Bar: Tabs & View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-stone-200 mb-8 pb-1">
            <div className="flex gap-8">
                <button 
                    onClick={() => setActiveTab('PORTFOLIO')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeTab === 'PORTFOLIO' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-900'
                    }`}
                >
                    My Assets
                </button>
                <button 
                    onClick={() => setActiveTab('WISHLIST')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeTab === 'WISHLIST' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-900'
                    }`}
                >
                    Wishlist ({user.wishlist.length})
                </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-xl border border-stone-200 p-1 shadow-sm mb-4 md:mb-0">
                <button 
                    onClick={() => setViewMode('LIST')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'LIST' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    title="List View"
                >
                    <List size={18} strokeWidth={2} />
                </button>
                <button 
                    onClick={() => setViewMode('GRID')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'GRID' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    title="Grid View"
                >
                    <LayoutGrid size={18} strokeWidth={2} />
                </button>
                <button 
                    onClick={() => setViewMode('COMPACT')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'COMPACT' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    title="Compact View"
                >
                    <Grid size={18} strokeWidth={2} />
                </button>
            </div>
        </div>

        {/* Grid */}
        <div className={`
            ${viewMode === 'GRID' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}
            ${viewMode === 'LIST' ? 'flex flex-col gap-6' : ''}
            ${viewMode === 'COMPACT' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4' : ''}
        `}>
            {displayedAssets.length > 0 ? (
                displayedAssets.map(asset => (
                    <AssetCard
                        key={asset.id}
                        asset={asset}
                        viewMode={viewMode}
                        currency={currency}
                        lang={lang}
                        user={user}
                        onClick={onAssetClick}
                        onToggleWishlist={onToggleWishlist}
                        isOwned={activeTab === 'PORTFOLIO'}
                    />
                ))
            ) : (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-stone-200 rounded-3xl bg-white/50">
                    <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-300">
                        {activeTab === 'PORTFOLIO' ? <TrendingUp size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    <p className="text-stone-900 font-serif text-xl mb-2">
                        {activeTab === 'PORTFOLIO' 
                            ? "Portfolio Empty" 
                            : "Wishlist Empty"}
                    </p>
                    <p className="text-stone-400 text-sm mb-4">
                         {activeTab === 'PORTFOLIO' 
                            ? "Start your journey by acquiring your first asset fraction." 
                            : "Save your favorite assets here for quick access."}
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};