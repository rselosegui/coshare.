import React, { useState, useEffect } from 'react';
import { Asset, Currency, Locale, CalendarWeek, User } from '../types';
import { DICTIONARY, CURRENCY_RATES, generateWeeks } from '../constants';
import { ArrowLeft, MapPin, Info, CheckCircle, Heart, Share2, Sparkles, X, Copy, Mail, MessageCircle, Twitter, Check, Minus, Lock, Calendar, TrendingUp, Shield } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AssetDetailProps {
  asset: Asset;
  currency: Currency;
  lang: Locale;
  onBack: () => void;
  user: User | null;
  onToggleWishlist: (id: string) => void;
  onPurchase: (id: string) => void;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({ asset, currency, lang, onBack, user, onToggleWishlist, onPurchase }) => {
  const t = DICTIONARY[lang];
  const rate = CURRENCY_RATES[currency];
  const [weeks, setWeeks] = useState<CalendarWeek[]>([]);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Purchase Ceremony State
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Scroll to top when asset detail loads
    window.scrollTo(0, 0);
    
    setWeeks(generateWeeks());
    // Simulate AI Concierge fetch
    if (process.env.API_KEY) {
        setLoadingAi(true);
        const fetchAi = async () => {
             try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const model = asset.type === 'REAL_ESTATE' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
                const response = await ai.models.generateContent({
                    model: model,
                    contents: `Write a short, luxurious, 2-sentence marketing hook for a fractional ownership asset: ${asset.title} in ${asset.location}. Focus on lifestyle.`,
                });
                setAiInsight(response.text || asset.description);
             } catch (e) {
                 setAiInsight(asset.description);
             } finally {
                 setLoadingAi(false);
             }
        }
        fetchAi();
    } else {
        setAiInsight(asset.description);
    }
  }, [asset]);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val * rate);
  };

  const toggleRentBack = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(10);
    const newWeeks = [...weeks];
    if (!newWeeks[index].isBooked) {
        newWeeks[index].isRentBack = !newWeeks[index].isRentBack;
        setWeeks(newWeeks);
    }
  };

  const initiatePurchase = () => {
      setProcessing(true);
      setTimeout(() => {
          setProcessing(false);
          setShowPurchaseSuccess(true);
      }, 1500);
  };

  const completePurchaseFlow = () => {
      setShowPurchaseSuccess(false);
      onPurchase(asset.id);
  };

  const isWishlisted = user?.wishlist?.includes(asset.id);
  const isOwned = user?.portfolio?.includes(asset.id);

  const handleShare = (platform: 'whatsapp' | 'x' | 'email' | 'copy') => {
      const url = window.location.href; 
      const text = `Check out ${asset.title} on Coshare.`;
      
      switch (platform) {
          case 'whatsapp':
              window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
              break;
          case 'x':
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
              break;
          case 'email':
              window.location.href = `mailto:?subject=${encodeURIComponent(asset.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
              break;
          case 'copy':
              navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              break;
      }
  };

  // --- Dynamic Stats Helpers ---
  const getHighLevelStats = () => {
      const d = asset.details as any;
      switch (asset.type) {
          case 'REAL_ESTATE':
              return [
                  { label: 'Built Area', value: d.bua },
                  { label: 'Bedrooms', value: d.bedrooms },
                  { label: 'Completion', value: d.completionYear }
              ];
          case 'CAR':
              return [
                  { label: '0-100 km/h', value: d.acceleration || 'N/A' },
                  { label: 'Year', value: d.year },
                  { label: 'Mileage', value: d.odometer }
              ];
          case 'YACHT':
              return [
                  { label: 'Length', value: d.length },
                  { label: 'Guests', value: d.guests },
                  { label: 'Built', value: d.yearBuilt }
              ];
          case 'MOTORBIKE':
              return [
                  { label: 'Power', value: d.power },
                  { label: 'Weight', value: d.weight },
                  { label: 'Year', value: d.year }
              ];
          default:
              return [];
      }
  };

  const formatKey = (key: string) => {
      return key.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className={`bg-stone-50 min-h-screen pt-24 ${user ? 'pb-32' : 'pb-12'} animate-in slide-in-from-right-8 duration-500 ease-in-out`}>
      {/* Nav Actions */}
      <div className="flex justify-between items-center px-6 mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors shadow-sm">
                <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={() => setShowShare(true)}
                className="p-3 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-all shadow-sm"
            >
                <Share2 size={20} strokeWidth={1.5} />
            </button>
            <button 
                onClick={() => onToggleWishlist(asset.id)}
                className={`p-3 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-all shadow-sm ${isWishlisted ? 'text-red-500' : 'text-stone-900'}`}
            >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Gallery */}
        <div className="relative aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 group">
          <img src={asset.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={asset.title} />
          <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-md p-8 rounded-tr-3xl">
             <h1 className="text-3xl font-serif font-medium tracking-tight text-stone-900">{asset.title}</h1>
             <div className="flex items-center gap-2 mt-2 text-sm font-bold uppercase tracking-wider text-stone-500">
                <MapPin size={14} strokeWidth={2} /> {asset.location}
             </div>
          </div>
        </div>

        {/* High-Level Stats Bar */}
        <div className="flex bg-white rounded-2xl shadow-sm border border-stone-100 mb-12 py-4 px-6 justify-between md:justify-around">
            {getHighLevelStats().map((stat, idx) => (
                <div key={idx} className={`flex-1 text-center ${idx !== 0 ? 'border-l border-stone-100' : ''}`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{stat.label}</div>
                    <div className="text-xl md:text-2xl font-serif text-stone-900">{stat.value}</div>
                </div>
            ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Col: Specs & AI */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* AI Insight */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                    {loadingAi ? (
                        <div className="animate-pulse h-12 bg-stone-100 w-full rounded-xl" />
                    ) : (
                        <p className="text-xl font-medium leading-relaxed font-serif italic text-stone-700 flex gap-3">
                            <Sparkles size={24} className="shrink-0 mt-1 text-stone-400" strokeWidth={1.5} />
                            "{aiInsight}"
                        </p>
                    )}
                </div>

                {/* Technical Sheet */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-stone-200 pb-2 flex items-center justify-between text-stone-900">
                        <span>Technical Specifications</span>
                        <Minus size={16} />
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
                        {Object.entries(asset.details).map(([key, value]) => {
                            if (!value) return null;
                            if (Array.isArray(value)) {
                                return (
                                    <div key={key} className="col-span-2">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{formatKey(key)}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {value.map((v: string) => (
                                                <span key={v} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-600">{v}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={key}>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{formatKey(key)}</div>
                                    <div className="font-medium text-stone-800 text-sm md:text-base border-b border-stone-100 pb-1">{String(value)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Map Mock */}
                <div className="h-72 bg-stone-100 w-full relative overflow-hidden rounded-3xl border border-stone-200">
                     <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#a8a29e 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-stone-900 px-5 py-2.5 text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                        <MapPin size={14} /> ASSET LOCATION
                     </div>
                </div>
            </div>

            {/* Right Col: Smart Calendar or Owner Privileges */}
            <div className="space-y-8">
                {isOwned ? (
                    // --- OWNER VIEW: Functional Calendar ---
                    <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm animate-in fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold uppercase tracking-widest text-stone-900">{t.bookWeek}</span>
                            <span className="text-[10px] bg-green-100 text-green-800 px-3 py-1 font-bold uppercase tracking-wide rounded-full">Owner Access</span>
                        </div>

                        <div className="space-y-3">
                            {weeks.map((week, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => toggleRentBack(idx)}
                                    className={`
                                        relative p-4 border rounded-2xl transition-all duration-200 cursor-pointer flex justify-between items-center shadow-sm
                                        ${week.isBooked 
                                            ? 'bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed' 
                                            : week.isRentBack
                                                ? 'bg-stone-900 text-white border-stone-900'
                                                : 'bg-white border-stone-100 hover:border-stone-300 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className="text-sm font-medium">
                                        {new Date(week.startDate).toLocaleDateString(lang, {month: 'short', day: 'numeric'})} - 
                                        {new Date(new Date(week.startDate).getTime() + 6*24*60*60*1000).toLocaleDateString(lang, {month: 'short', day: 'numeric'})}
                                    </div>
                                    
                                    {week.isBooked ? (
                                        <span className="text-[10px] font-bold uppercase">Reserved</span>
                                    ) : week.isRentBack ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase text-green-400">+{formatMoney(week.price)}</span>
                                            <CheckCircle size={16} className="text-green-400" strokeWidth={2}/>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-current rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-stone-100">
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-stone-500">Projected Rent-Back</span>
                                <span className="font-bold text-green-600">
                                    {formatMoney(weeks.filter(w => w.isRentBack).reduce((acc, curr) => acc + curr.price, 0))}
                                </span>
                            </div>
                            <button disabled className="w-full py-4 bg-stone-100 text-stone-400 font-bold uppercase tracking-widest cursor-default rounded-xl">
                                Asset Owned
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- NON-OWNER VIEW: Sales Pitch ---
                    <div className="bg-stone-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[500px] animate-in slide-in-from-right-4 duration-700 shadow-2xl shadow-stone-900/30">
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 text-white/50">
                                <Lock size={20} strokeWidth={1.5} />
                                <span className="text-xs font-bold tracking-[0.2em] uppercase">Private Ledger</span>
                            </div>
                            
                            <h3 className="text-4xl font-serif italic leading-tight mb-3">
                                The Privileges<br/>of Ownership.
                            </h3>
                            <p className="text-sm text-white/60 mb-8 leading-relaxed">
                                Join the circle to unlock the booking ledger, monetize unused weeks, and access white-glove concierge services.
                            </p>

                            {/* Value Grid */}
                            <div className="space-y-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 mb-8">
                                <div className="bg-white/5 p-5 flex items-center justify-between group hover:bg-white/10 transition-colors backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp size={20} className="text-white/80" strokeWidth={1}/>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">Proj. Yield</span>
                                    </div>
                                    <span className="text-xl font-serif">8-12%</span>
                                </div>
                                <div className="bg-white/5 p-5 flex items-center justify-between group hover:bg-white/10 transition-colors backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={20} className="text-white/80" strokeWidth={1}/>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">Usage</span>
                                    </div>
                                    <span className="text-xl font-serif">44 Days</span>
                                </div>
                                <div className="bg-white/5 p-5 flex items-center justify-between group hover:bg-white/10 transition-colors backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <Shield size={20} className="text-white/80" strokeWidth={1}/>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">Warranty</span>
                                    </div>
                                    <span className="text-xl font-serif">Full</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3 text-center">
                                {asset.fractionsAvailable} Fractions Remaining
                            </div>
                            <button 
                                onClick={initiatePurchase}
                                disabled={processing}
                                className="w-full py-4 bg-white text-stone-900 font-bold uppercase tracking-widest hover:bg-stone-200 transition-all active:scale-95 rounded-full flex items-center justify-center gap-2 shadow-lg"
                            >
                                {processing ? 'Processing...' : `Acquire 1/8 • ${formatMoney(asset.pricePerFraction)}`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
              <div className="bg-white p-8 rounded-3xl max-w-sm w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
                <button onClick={() => setShowShare(false)} className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <X size={20} strokeWidth={1.5} />
                </button>
                <h3 className="text-xl font-serif font-bold tracking-tight mb-6 text-stone-900">Share Asset</h3>
                
                <div className="grid grid-cols-1 gap-3">
                    <button 
                        onClick={() => handleShare('whatsapp')}
                        className="flex items-center justify-center gap-3 p-4 border border-stone-200 rounded-xl hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group"
                    >
                        <MessageCircle size={20} strokeWidth={1.5} />
                        <span className="text-sm font-bold uppercase tracking-widest">WhatsApp</span>
                    </button>
                    <button 
                        onClick={() => handleShare('x')}
                        className="flex items-center justify-center gap-3 p-4 border border-stone-200 rounded-xl hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group"
                    >
                        <Twitter size={20} strokeWidth={1.5} />
                        <span className="text-sm font-bold uppercase tracking-widest">X (Twitter)</span>
                    </button>
                     <button 
                        onClick={() => handleShare('email')}
                        className="flex items-center justify-center gap-3 p-4 border border-stone-200 rounded-xl hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group"
                    >
                        <Mail size={20} strokeWidth={1.5} />
                        <span className="text-sm font-bold uppercase tracking-widest">Email</span>
                    </button>
                    <button 
                        onClick={() => handleShare('copy')}
                        className="flex items-center justify-center gap-3 p-4 border border-stone-200 rounded-xl hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group"
                    >
                        {copied ? <CheckCircle size={20} className="text-green-500" strokeWidth={1.5} /> : <Copy size={20} strokeWidth={1.5} />}
                        <span className="text-sm font-bold uppercase tracking-widest">
                            {copied ? 'Link Copied' : 'Copy Link'}
                        </span>
                    </button>
                </div>
              </div>
          </div>
      )}

      {/* Purchase Success Modal */}
      {showPurchaseSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
              <div className="bg-white p-12 max-w-lg w-full text-center relative shadow-2xl rounded-3xl animate-in zoom-in-95 duration-500 border border-white/20">
                    <div className="mx-auto w-24 h-24 bg-stone-900 text-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                        <Check size={48} strokeWidth={3} className="animate-[spin_0.5s_ease-out_reverse]" />
                    </div>
                    <h2 className="text-4xl font-serif font-medium tracking-tight mb-4 text-stone-900">Welcome to the Club</h2>
                    <p className="text-stone-500 mb-10 text-lg leading-relaxed">
                        You are now a fractional owner of <strong>{asset.title}</strong>. 
                        The asset has been added to your portfolio and the digital title deed is being minted to your Vault.
                    </p>
                    <button 
                        onClick={completePurchaseFlow}
                        className="w-full bg-stone-900 text-white py-5 font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-full shadow-xl"
                    >
                        View My Portfolio
                    </button>
              </div>
          </div>
      )}
    </div>
  );
};