import React from 'react';
import { DICTIONARY, MOCK_ASSETS } from '../constants';
import { Locale, InfoType, Asset } from '../types';
import { ArrowRight, Diamond, ShieldCheck, TrendingUp, Instagram, Twitter, Linkedin } from 'lucide-react';

interface LandingProps {
  lang: Locale;
  setLang: (l: Locale) => void;
  onSignIn: () => void;
  onListAsset: () => void;
  onViewAll: () => void;
  onInfoNav: (type: InfoType) => void;
}

export const Landing: React.FC<LandingProps> = ({ lang, setLang, onSignIn, onListAsset, onViewAll, onInfoNav }) => {
  const t = DICTIONARY[lang];

  // Select specific featured assets: 1 Real Estate, 1 Classic Car, 1 Sailing Boat
  const featuredAssets = [
      MOCK_ASSETS.find(a => a.type === 'REAL_ESTATE'),
      MOCK_ASSETS.find(a => a.subtype === 'Classics / Retromods'),
      MOCK_ASSETS.find(a => a.subtype === 'Sailing')
  ].filter((a): a is Asset => !!a);

  const moments = [
    {
       src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
       title: "Private Sanctuary",
       location: "Palm Jumeirah, Dubai"
    },
    {
       src: "https://images.unsplash.com/photo-1544143890-7d721115e45c?q=80&w=2938&auto=format&fit=crop",
       title: "Sunset at 27 Knots",
       location: "The World Islands"
    },
    {
       src: "https://images.unsplash.com/photo-1631295868223-63260951cb75?q=80&w=2831&auto=format&fit=crop",
       title: "The Sunday Drive",
       location: "Jebel Hafeet, Al Ain"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="max-w-5xl">
            <h2 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8 text-stone-900">
                {/* Mobile: This feeling. */}
                <span className="block md:hidden">{(t as any).landingTitle1Mobile}</span>
                {/* Desktop: This pure feeling. */}
                <span className="hidden md:block">{t.landingTitle1}</span>
                
                <span className="block italic text-stone-500">{t.landingTitle2}</span>
            </h2>
            <p className="text-xl md:text-2xl text-stone-500 font-light mb-12 max-w-2xl leading-relaxed">
                {t.landingSub}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
                <button onClick={onViewAll} className="px-10 py-5 bg-stone-900 text-stone-50 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all rounded-full shadow-xl shadow-stone-900/20">
                    {t.startJourney} <ArrowRight size={16} />
                </button>
                <button onClick={onListAsset} className="px-10 py-5 bg-white border border-stone-200 text-stone-900 font-bold uppercase tracking-widest hover:border-stone-900 hover:bg-stone-50 transition-all rounded-full">
                    {t.listAsset}
                </button>
            </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white rounded-3xl mx-4 shadow-sm border border-stone-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <div className="p-12 group hover:bg-stone-50 transition-colors duration-300">
                <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-800">
                    <Diamond size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-stone-900">{t.valueProp1}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">True ownership. Lower barrier to entry. Divide the cost, multiply the lifestyle.</p>
            </div>
            <div className="p-12 group hover:bg-stone-50 transition-colors duration-300">
                <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-800">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-stone-900">{t.valueProp2}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">White-glove management. Maintenance, insurance, and storage are handled by coshare.</p>
            </div>
            <div className="p-12 group hover:bg-stone-50 transition-colors duration-300">
                 <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-800">
                    <TrendingUp size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-stone-900">{t.valueProp3}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Monetize your unused weeks. Smart rent-back programs to offset ownership costs.</p>
            </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
            <h3 className="text-4xl font-serif text-stone-900">{t.explore}</h3>
            <button onClick={onViewAll} className="text-sm border-b border-stone-900 pb-1 hover:opacity-50 transition-opacity uppercase tracking-widest font-bold">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAssets.map((asset) => (
                <div key={asset.id} className="group cursor-pointer" onClick={onViewAll}>
                    <div className="aspect-[4/5] overflow-hidden rounded-3xl mb-6 relative shadow-md group-hover:shadow-xl transition-all duration-500">
                         <img 
                            src={asset.imageUrl} 
                            alt={asset.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {asset.type.replace('_', ' ')}
                        </div>
                    </div>
                    <h4 className="font-serif text-2xl mb-2 text-stone-900 group-hover:text-stone-600 transition-colors">{asset.title}</h4>
                    <p className="text-sm text-stone-500 font-medium uppercase tracking-wider">{asset.location}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Moments of Ownership Gallery */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-t border-stone-200 pt-16">
            <h3 className="text-5xl font-serif text-stone-900 leading-tight">Moments of<br/>Ownership</h3>
            <p className="text-stone-500 max-w-xs text-right hidden md:block mt-4 md:mt-0 leading-relaxed">
                Curated experiences from our members across the Emirates and the Kingdom.
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moments.map((m, i) => (
                <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-900 cursor-none">
                    <img 
                        src={m.src} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
                        alt={m.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">{m.location}</div>
                        <div className="text-3xl font-serif italic text-white">{m.title}</div>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            
            {/* Logo */}
            <div className="text-3xl font-serif font-bold tracking-tight text-stone-900">coshare.</div>
            
            {/* Links */}
            <nav className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600">
                <button onClick={() => onInfoNav('MANIFESTO')} className="hover:text-stone-900 transition-colors">Manifesto</button>
                <button onClick={() => onInfoNav('MEMBERSHIP')} className="hover:text-stone-900 transition-colors">Membership</button>
                <button onClick={() => onInfoNav('LEGAL')} className="hover:text-stone-900 transition-colors">Legal</button>
                <button onClick={() => onInfoNav('CONTACT')} className="hover:text-stone-900 transition-colors">Contact</button>
            </nav>

            {/* Socials & Copyright */}
            <div className="flex items-center gap-6">
                <div className="flex gap-4 text-stone-400">
                    <button className="hover:text-stone-900 transition-colors"><Instagram size={18} /></button>
                    <button className="hover:text-stone-900 transition-colors"><Twitter size={18} /></button>
                    <button className="hover:text-stone-900 transition-colors"><Linkedin size={18} /></button>
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest hidden md:block">
                    © 2026 Coshare
                </div>
            </div>
            
            {/* Mobile Copyright */}
             <div className="text-[10px] text-stone-400 uppercase tracking-widest md:hidden">
                © 2026 Coshare
            </div>
        </div>
      </footer>
    </div>
  );
};