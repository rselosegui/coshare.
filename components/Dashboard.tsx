import React, { useState, useMemo, useEffect } from 'react';
import { Asset, Currency, Locale, User } from '../types';
import { DICTIONARY, MOCK_ASSETS, CURRENCY_RATES } from '../constants';
import { TrendingUp, ShieldCheck, Filter, ArrowUpDown, LayoutGrid, List, Grid, ArrowLeft, Search, X, Calendar, ArrowUpRight } from 'lucide-react';
import { AssetCard } from './AssetCard';

interface DashboardProps {
  user: User | null;
  currency: Currency;
  lang: Locale;
  onAssetClick: (asset: Asset) => void;
  toggleCurrency: () => void;
  onSignIn: () => void;
  onToggleWishlist: (id: string) => void;
  onBack: () => void;
  initialScroll?: number;
}

const SUB_CATEGORIES: Record<string, string[]> = {
  REAL_ESTATE: ['Villas', 'Townhouses', 'Penthouses'],
  CAR: ['Supercars', 'Desert 4x4s', 'Classics / Retromods'],
  YACHT: ['Powerboats', 'Sailing', 'Specialized'],
  MOTORBIKE: ['Superbikes', 'Adventure', 'Cruisers', 'Classics / Cafe Racers', 'Dirt / Motocross']
};

export const Dashboard: React.FC<DashboardProps> = ({ user, currency, lang, onAssetClick, toggleCurrency, onSignIn, onToggleWishlist, onBack, initialScroll = 0 }) => {
  const t = DICTIONARY[lang];
  const rate = CURRENCY_RATES[currency];
  const isGuest = !user;

  // Restore scroll position on mount
  useEffect(() => {
    if (initialScroll > 0) {
        window.scrollTo({ top: initialScroll, behavior: 'instant' });
    } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Default to 'COMPACT' (Mosaic) on mobile (< 768px), 'GRID' on desktop
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'COMPACT'>('GRID');

  // Enforce mobile default view on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setViewMode('COMPACT');
    }
  }, []);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val * rate);
  };

  // --- Real Data Calculation ---
  const userEquity = useMemo(() => {
    if (!user) return 0;
    return MOCK_ASSETS.filter(a => user.portfolio.includes(a.id))
                      .reduce((sum, a) => sum + a.pricePerFraction, 0);
  }, [user]);

  // Projected Yield (Mock: 12.5%)
  const projectedYield = useMemo(() => userEquity * 0.125, [userEquity]);

  const baseAssets = useMemo(() => MOCK_ASSETS.filter(asset => asset.visibility === 'PUBLIC'), []);

  const filteredAssets = useMemo(() => {
    let result = baseAssets;
    
    // 1. Search Filter
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(a => 
            a.title.toLowerCase().includes(q) ||
            a.location.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            a.type.toLowerCase().includes(q)
        );
    }

    // 2. Category Filter
    if (selectedCategory !== 'ALL') {
        result = result.filter(a => a.type === selectedCategory);
    }
    
    // 3. Subcategory Filter
    if (selectedSubcategory !== 'ALL') {
        result = result.filter(a => a.subtype === selectedSubcategory);
    }

    // 4. Sort
    return result.sort((a, b) => {
        return sortOrder === 'ASC' 
            ? a.pricePerFraction - b.pricePerFraction
            : b.pricePerFraction - a.pricePerFraction;
    });
  }, [baseAssets, selectedCategory, selectedSubcategory, sortOrder, searchQuery]);

  const availableSubtypes = useMemo(() => {
    if (selectedCategory === 'ALL') return [];
    return SUB_CATEGORIES[selectedCategory] || [];
  }, [selectedCategory]);

  const handleCategoryChange = (cat: string) => {
      setSelectedCategory(cat);
      setSelectedSubcategory('ALL');
  };

  const categories = [
      { id: 'ALL', label: 'All Assets' },
      { id: 'REAL_ESTATE', label: 'Real Estate' },
      { id: 'CAR', label: 'Cars' },
      { id: 'YACHT', label: 'Yachts' },
      { id: 'MOTORBIKE', label: 'Motorbikes' }
  ];

  return (
    <div className="pt-[72px] pb-32 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <style>{`
        .sticky-filters {
            position: sticky;
            top: 72px; /* Height of the header */
            z-index: 40;
            background: rgba(250, 250, 249, 0.95); /* Stone 50 with opacity */
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #e7e5e4;
        }
      `}</style>

      <div className="px-6 pt-10">
        {/* Back Button */}
        <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 text-stone-500 hover:text-stone-900 transition-colors group"
        >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
            {isGuest ? (
                <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-3 text-stone-900">Marketplace</h2>
            ) : (
                <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-3 text-stone-900">{t.welcome}, {user.firstName}</h2>
            )}
            
            <div className="flex items-center gap-3">
                {!isGuest && user.isVerified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-stone-50 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-md">
                    <ShieldCheck size={12} strokeWidth={2} /> {t.verified}
                </span>
                )}
                {!isGuest && user.vibeTags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-stone-200 text-stone-600 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {tag}
                </span>
                ))}
                {isGuest && (
                    <span className="text-stone-500 text-sm font-medium">Browsing Public Assets</span>
                )}
            </div>
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto">
                <button onClick={toggleCurrency} className="text-xl font-bold font-serif hover:opacity-50 transition-opacity text-stone-900">
                {currency}
                </button>
            </div>
        </header>

        {/* Financial & Timeline Overview */}
        {!isGuest && (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                
                {/* 1. White Luxury Equity Card - Sharp Borders, No Shadows */}
                <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-8 relative overflow-hidden group hover:border-stone-900 transition-colors duration-500 flex flex-col justify-between min-h-[220px]">
                     <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700 text-stone-900">
                        <TrendingUp size={160} />
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{t.equity}</span>
                        <div className="text-4xl md:text-6xl font-serif font-medium mt-3 tracking-tight text-stone-900 break-words">{formatMoney(userEquity)}</div>
                    </div>
                    <div className="flex items-end justify-between mt-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                                <TrendingUp size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-bold text-stone-600">
                                {userEquity > 0 ? '+12.5% Appreciation' : 'Start building your portfolio'}
                            </span>
                        </div>
                        {/* Yield Pill */}
                        {userEquity > 0 && (
                            <div className="hidden md:block text-right">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Proj. Annual Yield</div>
                                <div className="text-xl font-serif text-stone-900">~{formatMoney(projectedYield)}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Upcoming Timeline / Actions */}
                <div className="flex flex-col gap-4">
                     {/* Yield Card - Stark Black */}
                    <div className="bg-stone-900 text-white p-6 rounded-3xl flex items-center justify-between relative overflow-hidden group shadow-lg">
                         <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                         <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Net Yield (YTD)</span>
                            <div className="text-2xl font-serif mt-1">{formatMoney(projectedYield * 0.75)}</div>
                         </div>
                         <div className="p-3 bg-white/20 rounded-full">
                            <ArrowUpRight size={20} />
                         </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-stone-200 p-6 rounded-3xl flex-1 hover:border-stone-400 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Timeline</span>
                             <span className="text-[10px] font-bold uppercase text-stone-300">Oct 2025</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="text-[10px] font-bold text-stone-900 uppercase">12</div>
                                    <div className="text-[9px] font-bold text-stone-400 uppercase">Oct</div>
                                </div>
                                <div className="flex-1 pb-4 border-b border-stone-100 group-last:border-0">
                                    <div className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-600 transition-colors">Downtown Views Stay</div>
                                    <div className="text-[10px] text-stone-400 uppercase tracking-wide mt-0.5 flex items-center gap-1">
                                        <Calendar size={10} /> 7 Days Confirmed
                                    </div>
                                </div>
                            </div>
                             <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="text-[10px] font-bold text-stone-400 uppercase">01</div>
                                    <div className="text-[9px] font-bold text-stone-400 uppercase">Nov</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-serif font-bold text-stone-400">Q4 Dividend Payout</div>
                                    <div className="text-[10px] text-stone-300 uppercase tracking-wide mt-0.5">Pending Processing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )}
      </div>

      {/* STICKY SEARCH & FILTER BAR (COMPACT VERSION) */}
      <section className="sticky-filters px-6 py-2 md:py-3 mb-8 transition-all">
        
        {/* Global Search Bar - Slimmer */}
        <div className="relative mb-3 max-w-3xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets..." 
                className="w-full bg-white/80 border border-stone-200 rounded-xl py-2 pl-10 pr-10 font-serif text-sm md:text-base text-stone-900 focus:border-stone-900 focus:bg-white outline-none transition-all placeholder:text-stone-400 shadow-sm" 
            />
            {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-stone-200 p-0.5 rounded-full transition-colors">
                    <X size={14} className="text-stone-500" />
                </button>
            )}
        </div>

        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 md:gap-6">
             {/* Category Filters - High Contrast Pills */}
             <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 border ${
                            selectedCategory === cat.id 
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md transform scale-105' 
                            : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
             </div>

             <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
                 {/* Sort Toggle */}
                 <button 
                    onClick={() => setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors whitespace-nowrap"
                 >
                    <ArrowUpDown size={14} strokeWidth={2} />
                    <span className="hidden md:inline">Price: {sortOrder === 'ASC' ? 'Low to High' : 'High to Low'}</span>
                    <span className="md:hidden">Sort</span>
                 </button>

                 {/* View Mode Toggle */}
                 <div className="flex items-center bg-white rounded-lg border border-stone-200 p-0.5 shadow-sm">
                    <button 
                        onClick={() => setViewMode('LIST')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'LIST' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                        title="List View"
                    >
                        <List size={16} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setViewMode('GRID')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'GRID' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                        title="Grid View"
                    >
                        <LayoutGrid size={16} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setViewMode('COMPACT')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'COMPACT' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                        title="Compact View"
                    >
                        <Grid size={16} strokeWidth={2} />
                    </button>
                 </div>
             </div>
        </div>

        {/* Subcategory Filters - Compact Row */}
        {availableSubtypes.length > 0 && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2 mt-2 overflow-x-auto no-scrollbar pb-1">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest shrink-0">Type:</span>
                <div className="flex flex-wrap gap-1.5">
                    <button
                        onClick={() => setSelectedSubcategory('ALL')}
                        className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border transition-all ${
                            selectedSubcategory === 'ALL'
                            ? 'bg-stone-800 text-white border-stone-800'
                            : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'
                        }`}
                    >
                        All
                    </button>
                    {availableSubtypes.map(sub => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border transition-all ${
                                selectedSubcategory === sub
                                ? 'bg-stone-800 text-white border-stone-800'
                                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'
                            }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </section>

      {/* Asset Grid */}
      <section className="px-6">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-serif font-medium text-stone-900">{t.explore}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            {filteredAssets.length} Result{filteredAssets.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredAssets.length > 0 ? (
            <div className={`
                ${viewMode === 'GRID' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}
                ${viewMode === 'LIST' ? 'flex flex-col gap-6' : ''}
                ${viewMode === 'COMPACT' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4' : ''}
            `}>
            {filteredAssets.map((asset) => (
                <AssetCard
                    key={asset.id}
                    asset={asset}
                    viewMode={viewMode}
                    currency={currency}
                    lang={lang}
                    user={user}
                    onClick={onAssetClick}
                    onToggleWishlist={onToggleWishlist}
                    isOwned={user?.portfolio.includes(asset.id)}
                />
            ))}
            </div>
        ) : (
            <div className="py-32 text-center border-2 border-dashed border-stone-200 rounded-3xl bg-white">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                     <Filter className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-2">No assets found</h3>
                <p className="text-stone-500 mb-6">Try adjusting your filters or search query.</p>
                <button 
                    onClick={() => { setSelectedCategory('ALL'); setSelectedSubcategory('ALL'); setSearchQuery(''); }}
                    className="px-6 py-2 bg-white border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest hover:border-stone-900 transition-colors shadow-sm"
                >
                    Clear All Filters
                </button>
            </div>
        )}
      </section>
    </div>
  );
};