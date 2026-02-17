import React, { useState } from 'react';
import { Asset, Currency, Locale, User } from '../types';
import { CURRENCY_RATES } from '../constants';
import { Heart, ArrowRight, MapPin } from 'lucide-react';

interface AssetCardProps {
    asset: Asset;
    viewMode: 'GRID' | 'LIST' | 'COMPACT';
    currency: Currency;
    lang: Locale;
    user: User | null;
    onClick: (asset: Asset) => void;
    onToggleWishlist: (id: string) => void;
    isOwned?: boolean;
}

const ImageWithBlur = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={`overflow-hidden relative bg-stone-100 ${className || 'w-full h-full'}`}>
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-700 ease-out ${loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-105'}`}
            />
        </div>
    );
};

export const AssetCard: React.FC<AssetCardProps> = ({ asset, viewMode, currency, lang, user, onClick, onToggleWishlist, isOwned }) => {
    const rate = CURRENCY_RATES[currency];
    const formatMoney = (val: number) => {
        return new Intl.NumberFormat(lang, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val * rate);
    };

    return (
        <div 
            onClick={() => onClick(asset)}
            className={`
                group cursor-pointer transition-all duration-300 animate-in fade-in bg-white
                ${viewMode === 'GRID' 
                    ? 'flex flex-col rounded-3xl overflow-hidden border border-stone-200 hover:border-stone-900 hover:shadow-xl hover:shadow-stone-900/5' 
                    : ''
                }
                ${viewMode === 'LIST' 
                    ? 'flex flex-col md:flex-row gap-6 p-4 rounded-3xl border border-stone-100 hover:border-stone-900' 
                    : ''
                }
                ${viewMode === 'COMPACT' 
                    ? 'flex flex-col gap-2 rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-400' 
                    : ''
                }
            `}
        >
            {/* Image Container */}
            <div className={`
                relative overflow-hidden
                ${viewMode === 'GRID' ? 'aspect-[4/3] w-full border-b border-stone-100' : ''}
                ${viewMode === 'LIST' ? 'w-full md:w-72 aspect-[4/3] md:aspect-video shrink-0 rounded-2xl' : ''}
                ${viewMode === 'COMPACT' ? 'aspect-square w-full' : ''}
            `}>
                <ImageWithBlur src={asset.imageUrl} alt={asset.title} />
                
                {/* Tags */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {isOwned ? (
                        <div className="bg-stone-900/90 backdrop-blur-md text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            Owned
                        </div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-stone-900 uppercase tracking-widest rounded-full shadow-sm border border-stone-100">
                            {asset.fractionsAvailable}/8 Avail
                        </div>
                    )}
                </div>

                {/* Wishlist Button */}
                {!isOwned && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(asset.id);
                        }}
                        className={`
                            absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all z-20 shadow-sm border
                            ${user?.wishlist?.includes(asset.id) 
                                ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800' 
                                : 'bg-white/90 text-stone-900 border-white hover:border-stone-200'}
                        `}
                    >
                            <Heart size={16} fill={user?.wishlist?.includes(asset.id) ? "currentColor" : "none"} strokeWidth={2} />
                    </button>
                )}
                
                {/* Grid View Overlay Gradient */}
                {viewMode === 'GRID' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
            </div>
            
            {/* Content Container */}
            <div className={`
                flex-1 flex flex-col justify-between
                ${viewMode === 'GRID' ? 'p-6' : ''}
                ${viewMode === 'LIST' ? 'py-2' : ''}
                ${viewMode === 'COMPACT' ? 'px-1 pb-2' : ''}
            `}>
                <div>
                    <div className="flex justify-between items-start gap-4">
                        <h4 className={`
                            font-serif font-medium text-stone-900 leading-tight
                            ${viewMode === 'COMPACT' ? 'text-sm' : 'text-xl'}
                        `}>
                            {asset.title}
                        </h4>
                        {viewMode === 'GRID' && (
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 text-stone-900">
                                <ArrowRight size={16} />
                            </div>
                        )}
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-2 text-stone-500 ${viewMode === 'COMPACT' ? 'text-[10px]' : 'text-xs uppercase tracking-wider font-bold'}`}>
                        <MapPin size={viewMode === 'COMPACT' ? 10 : 12} />
                        {asset.location}
                    </div>

                    {/* Extended description only in List View */}
                    {viewMode === 'LIST' && (
                        <p className="mt-3 text-sm text-stone-600 line-clamp-2 max-w-2xl leading-relaxed">
                            {asset.description}
                        </p>
                    )}

                    {/* Specs row only in List View */}
                    {viewMode === 'LIST' && (
                        <div className="flex gap-6 mt-4">
                            {asset.specs.slice(0, 3).map(spec => (
                                <div key={spec.label} className="text-xs">
                                    <span className="text-stone-400 uppercase tracking-widest block mb-0.5">{spec.label}</span>
                                    <span className="font-bold text-stone-700">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`
                    flex justify-between items-center
                    ${viewMode === 'GRID' ? 'mt-6 border-t border-stone-100 pt-4' : ''}
                    ${viewMode === 'COMPACT' ? 'mt-2' : ''}
                    ${viewMode === 'LIST' ? 'mt-4 border-none pt-0 md:justify-end md:gap-8' : ''}
                `}>
                    <span className={`font-serif text-stone-900 ${viewMode === 'COMPACT' ? 'text-sm' : 'text-xl'}`}>
                        {formatMoney(asset.pricePerFraction)} 
                        <span className={`font-sans text-stone-400 font-normal ${viewMode === 'COMPACT' ? 'text-[10px]' : 'text-xs'}`}> / 12.5%</span>
                    </span>
                    
                    {viewMode === 'LIST' && (
                        <button className="hidden md:block px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all rounded-full shadow-md hover:shadow-lg">
                            View Asset
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};