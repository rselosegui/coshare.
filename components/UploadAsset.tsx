import React, { useState } from 'react';
import { Locale } from '../types';
import { DICTIONARY } from '../constants';
import { ArrowLeft, Upload, CheckCircle, Car, Home, Anchor, Bike, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface UploadAssetProps {
    lang: Locale;
    onBack: () => void;
    onComplete: () => void;
}

// Normalized structure for categories matching Dashboard filters
const ASSET_HIERARCHY: any = {
    REAL_ESTATE: {
        label: 'Real Estate',
        icon: Home,
        subs: [
            { label: 'Villas' },
            { label: 'Townhouses' },
            { label: 'Penthouses' }
        ]
    },
    CAR: {
        label: 'Car',
        icon: Car,
        subs: [
             { label: 'Supercars' },
             { label: 'Desert 4x4s' },
             { label: 'Classics / Retromods' }
        ]
    },
    YACHT: {
        label: 'Yacht',
        icon: Anchor,
        subs: [
            { label: 'Powerboats' },
            { label: 'Sailing' },
            { label: 'Specialized' }
        ]
    },
    MOTORBIKE: {
        label: 'Motorbike',
        icon: Bike,
        subs: [
            { label: 'Superbikes' },
            { label: 'Adventure' },
            { label: 'Cruisers' },
            { label: 'Classics / Cafe Racers' },
            { label: 'Dirt / Motocross' }
        ]
    }
};

export const UploadAsset: React.FC<UploadAssetProps> = ({ lang, onBack, onComplete }) => {
    const t = DICTIONARY[lang];
    
    // Phase 1: Category Selection
    // Phase 2: Details Form
    // Phase 3: Upload Proof
    const [phase, setPhase] = useState<1 | 2 | 3>(1);
    
    // Path tracks the user's selection path e.g. ['YACHT', 'Powerboats']
    const [path, setPath] = useState<string[]>([]);
    const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
    
    const [isUploading, setIsUploading] = useState(false);

    // Helpers to resolve current view in Phase 1
    const getCurrentNode = () => {
        if (path.length === 0) return ASSET_HIERARCHY;
        
        // Start with root node
        let current = ASSET_HIERARCHY[path[0]];
        
        // Traverse subs
        for (let i = 1; i < path.length; i++) {
            if (current && current.subs) {
                current = current.subs.find((item: any) => item.label === path[i]);
            }
        }
        return current;
    };

    const handleSelection = (key: string, hasSubs: boolean) => {
        const newPath = [...path, key];
        if (hasSubs) {
            setPath(newPath);
        } else {
            setPath(newPath);
            setPhase(2);
        }
    };

    const handleBackInternal = () => {
        if (phase === 1) {
            if (path.length > 0) {
                const newPath = [...path];
                newPath.pop();
                setPath(newPath);
            } else {
                onBack();
            }
        } else if (phase === 2) {
            setPhase(1);
            // Optionally pop the last leaf selection to let them re-select
            const newPath = [...path];
            newPath.pop();
            setPath(newPath);
        } else if (phase === 3) {
            setPhase(2);
        }
    };

    const handleNext = () => {
        if (phase === 3) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                onComplete();
            }, 2000);
        } else {
            setPhase(phase + 1 as any);
        }
    };

    const currentNode = getCurrentNode();
    // If path is empty, we show root keys. 
    // If path is not empty, currentNode is the object (e.g. Yacht Object). We display its 'subs'.
    const optionsToDisplay = path.length === 0 
        ? Object.keys(ASSET_HIERARCHY).map(k => ({ id: k, ...ASSET_HIERARCHY[k] }))
        : currentNode.subs;

    // Derived Display Labels
    const typeLabel = path.length > 0 ? ASSET_HIERARCHY[path[0]].label : '';
    const subLabel = path.length > 1 ? path.slice(1).join(' / ') : '';

    return (
        <div className="min-h-screen bg-stone-50 pt-32 px-6 max-w-2xl mx-auto animate-in slide-in-from-bottom-8">
            <button onClick={handleBackInternal} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-12 text-stone-500 hover:text-stone-900">
                <ArrowLeft size={16} /> Back
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-serif font-medium tracking-tight mb-2 text-stone-900">{t.uploadTitle}</h1>
                <p className="text-stone-500">{t.uploadDesc}</p>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${phase >= i ? 'bg-stone-900' : 'bg-stone-200'}`} />
                ))}
            </div>

            {phase === 1 && (
                <div className="animate-in fade-in space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest mb-2 block text-stone-400">
                        {path.length === 0 ? t.uploadType : `Select ${currentNode.label} Category`}
                    </label>

                    {/* Breadcrumbs for Phase 1 */}
                    {path.length > 0 && (
                        <div className="flex items-center gap-2 mb-6 text-sm text-stone-400">
                             {path.map((segment, i) => (
                                 <React.Fragment key={i}>
                                     {i > 0 && <ChevronRight size={14} />}
                                     <span className={i === path.length - 1 ? "text-stone-900 font-bold uppercase tracking-widest" : "uppercase tracking-widest"}>
                                         {i === 0 ? ASSET_HIERARCHY[segment].label : segment}
                                     </span>
                                 </React.Fragment>
                             ))}
                        </div>
                    )}

                    <div className="grid gap-4">
                        {optionsToDisplay?.map((item: any) => {
                             const hasSubs = !!item.subs;
                             const key = item.id || item.label; 
                             
                             return (
                                <button 
                                    key={key}
                                    onClick={() => handleSelection(key, hasSubs)}
                                    className={`
                                        flex items-center justify-between p-6 border border-stone-200 bg-white rounded-2xl
                                        hover:border-stone-400 hover:shadow-md transition-all text-left group
                                    `}
                                >
                                    <div className="flex items-center gap-6 text-stone-800">
                                        {item.icon && <item.icon size={24} className="stroke-1 group-hover:scale-110 transition-transform" />}
                                        <span className="font-serif font-medium text-lg">{item.label}</span>
                                    </div>
                                    {hasSubs ? <ChevronRight size={16} className="opacity-30" /> : <div className="w-2 h-2 bg-stone-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </button>
                             );
                        })}
                    </div>
                </div>
            )}

            {phase === 2 && (
                <div className="space-y-6 animate-in fade-in">
                    <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-4">
                        <span>{typeLabel}</span>
                        {subLabel && (
                            <>
                                <ChevronRight size={12} />
                                <span className="text-stone-900">{subLabel}</span>
                            </>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest block mb-2 text-stone-500">Asset Title / Model</label>
                        <input type="text" className="w-full border-b border-stone-300 p-3 outline-none text-xl font-serif bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors" placeholder="e.g. 2024 Model S Plaid" autoFocus />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest block mb-2 text-stone-500">Estimated Value (AED)</label>
                        <input type="number" className="w-full border-b border-stone-300 p-3 outline-none text-xl font-serif bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors" placeholder="5,000,000" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest block mb-2 text-stone-500">Location</label>
                        <input type="text" className="w-full border-b border-stone-300 p-3 outline-none text-xl font-serif bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors" placeholder="Dubai, UAE" />
                    </div>

                    {/* Visibility Selector */}
                    <div className="pt-4">
                         <label className="text-xs font-bold uppercase tracking-widest block mb-4 text-stone-500">Listing Visibility</label>
                         <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setVisibility('PUBLIC')}
                                className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition-all ${visibility === 'PUBLIC' ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-200 bg-white text-stone-400 hover:border-stone-400'}`}
                            >
                                <Eye size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Public Listing</span>
                                <span className="text-[10px] opacity-60">Visible on Marketplace</span>
                            </button>
                            <button
                                onClick={() => setVisibility('PRIVATE')}
                                className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition-all ${visibility === 'PRIVATE' ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-200 bg-white text-stone-400 hover:border-stone-400'}`}
                            >
                                <EyeOff size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Private Vault</span>
                                <span className="text-[10px] opacity-60">Only visible to You</span>
                            </button>
                         </div>
                    </div>

                    <button onClick={handleNext} className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest mt-8 hover:bg-stone-800 rounded-full shadow-lg active:scale-95 transition-all">
                        Continue
                    </button>
                </div>
            )}

            {phase === 3 && (
                <div className="space-y-8 animate-in fade-in">
                    <div className="border-2 border-dashed border-stone-300 p-12 text-center rounded-3xl hover:border-stone-900 hover:bg-white transition-colors cursor-pointer relative overflow-hidden bg-stone-100/50">
                        <Upload size={48} className="mx-auto mb-4 text-stone-300" />
                        <h3 className="font-bold text-stone-700">{t.uploadProof}</h3>
                        <p className="text-sm text-stone-400 mt-2">Drag & Drop or Click to Upload</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => {}} />
                    </div>

                    <div className="bg-white p-6 border border-stone-100 rounded-2xl flex gap-4 items-start shadow-sm">
                         <div className="p-1 bg-stone-900 text-white rounded-full mt-1 shrink-0">
                            <CheckCircle size={12} />
                         </div>
                         <p className="text-xs text-stone-500 leading-relaxed">
                            By submitting, you agree to a preliminary valuation by our expert team. Verified assets receive a "Verified Seller" badge and priority listing.
                         </p>
                    </div>

                    <button 
                        onClick={handleNext} 
                        disabled={isUploading}
                        className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-800 disabled:opacity-50 rounded-full shadow-lg active:scale-95 transition-all"
                    >
                        {isUploading ? 'Verifying...' : t.uploadSubmit}
                    </button>
                </div>
            )}
        </div>
    );
};