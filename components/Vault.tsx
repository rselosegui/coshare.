import React, { useState, useEffect } from 'react';
import { Lock, FileText, ChevronRight, Shield, Download, ChevronDown, Box, QrCode, MoreVertical, Copy, Check, ExternalLink, FileCheck, AlertTriangle, X } from 'lucide-react';
import { DICTIONARY } from '../constants';
import { Locale } from '../types';

interface VaultProps {
    lang: Locale;
}

export const Vault: React.FC<VaultProps> = ({ lang }) => {
    const t = DICTIONARY[lang];
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [scanning, setScanning] = useState(true);
    const [expandedAsset, setExpandedAsset] = useState<string | null>(null);
    
    // New State for Features
    const [activeMenu, setActiveMenu] = useState<string | null>(null); // Doc ID
    const [showQr, setShowQr] = useState<{title: string, id: string} | null>(null);
    const [copiedToken, setCopiedToken] = useState<string | null>(null);

    useEffect(() => {
        // Simulate biometric scan
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
        
        const timer = setTimeout(() => {
            setScanning(false);
            setIsUnlocked(true);
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(200);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    const copyToClipboard = (text: string, id: string) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedToken(id);
            setTimeout(() => setCopiedToken(null), 2000);
        }
    };

    // Mock Data grouped by Asset with New Fields
    const vaultAssets = [
        {
            id: '1',
            title: 'Downtown Views II Penthouse',
            type: 'REAL_ESTATE',
            tokenId: '0x71C9...3A9B',
            contract: '0x8842...9921',
            docs: [
                { id: 'd1', title: 'Title Deed (Oqood)', size: '2.4 MB', date: '2025-10-12', type: 'DEED' },
                { id: 'd2', title: 'SPA - Unit 4802', size: '5.1 MB', date: '2025-09-01', type: 'CONTRACT' },
                { id: 'd3', title: 'Home Insurance Policy', size: '1.2 MB', date: '2026-01-01', type: 'INSURANCE' }
            ]
        },
        {
            id: '3',
            title: 'Rolls-Royce Spectre',
            type: 'CAR',
            tokenId: '0x99B2...1F4C',
            contract: '0x4421...9911',
            emergencyDoc: { title: 'Vehicle License (Mulkiya)', expiry: '12/26' },
            docs: [
                { id: 'd4', title: 'Vehicle License (Mulkiya)', size: '0.8 MB', date: '2026-02-10', type: 'LICENSE' },
                { id: 'd5', title: 'Warranty Certificate', size: '1.5 MB', date: '2026-02-10', type: 'WARRANTY' }
            ]
        },
        {
            id: '2',
            title: 'Azimut Grande 27M',
            type: 'YACHT',
            tokenId: '0xAA33...BB22',
            contract: '0x1122...3344',
            emergencyDoc: { title: 'Maritime Registration', expiry: '11/25' },
            docs: [
                { id: 'd6', title: 'Maritime Registration', size: '1.8 MB', date: '2025-11-15', type: 'LICENSE' },
                { id: 'd7', title: 'Crew Management Contract', size: '3.4 MB', date: '2025-11-20', type: 'CONTRACT' }
            ]
        }
    ];

    const emergencyAssets = vaultAssets.filter(a => a.emergencyDoc);

    // Biometric Lock Screen
    if (!isUnlocked) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-stone-900 text-white z-[70] fixed inset-0 font-mono">
                <div className="relative mb-12">
                    <Shield size={80} className="text-stone-800" strokeWidth={1} />
                    <div className="absolute inset-0 animate-pulse text-white mix-blend-overlay">
                        <Shield size={80} strokeWidth={1} />
                    </div>
                </div>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 animate-pulse text-stone-400">{t.biometric}</h2>
                
                <div className="w-64 h-1 bg-stone-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-white w-full animate-[shimmer_1.5s_infinite]" />
                </div>
                
                <div className="mt-8 text-[10px] text-stone-600 font-mono uppercase">
                    ID: 884-29-X • SECURE ENCLAVE
                </div>

                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="bg-stone-900 min-h-screen text-stone-200 pt-24 pb-32 animate-in fade-in duration-700">
            <div className="max-w-5xl mx-auto px-6">
                
                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-white/50">
                            <Lock size={20} strokeWidth={1.5} />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Private Vault</span>
                        </div>
                        <h1 className="text-4xl font-serif font-medium tracking-tight text-white">Secure Storage</h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Encrypted Status</div>
                        <div className="flex items-center gap-2 justify-end text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm font-bold tracking-widest">AES-256 ACTIVE</span>
                        </div>
                    </div>
                </header>

                {/* FEATURE 1: Emergency Access Mode */}
                {emergencyAssets.length > 0 && (
                    <section className="mb-12">
                         <div className="flex items-center gap-2 mb-4 text-red-400">
                            <AlertTriangle size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Emergency Quick Access</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {emergencyAssets.map(asset => (
                                <div key={asset.id} className="bg-white/5 border border-white/10 p-6 flex items-center justify-between hover:bg-white/10 transition-colors rounded-2xl">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 text-white">{asset.title}</h3>
                                        <p className="text-xs text-white/40 uppercase tracking-wider mb-4">
                                            {asset.emergencyDoc?.title} • EXP {asset.emergencyDoc?.expiry}
                                        </p>
                                        <button 
                                            onClick={() => setShowQr({ title: asset.title, id: asset.id })}
                                            className="flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full"
                                        >
                                            <QrCode size={14} /> Show QR Code
                                        </button>
                                    </div>
                                    <div className="opacity-10">
                                        <Shield size={64} strokeWidth={0.5} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Assets Grid */}
                <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 pl-1">
                        Your Asset Folders ({vaultAssets.length})
                    </p>

                    {vaultAssets.map((asset) => (
                        <div 
                            key={asset.id} 
                            className="border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 rounded-2xl"
                        >
                            {/* Folder Head */}
                            <button 
                                onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}
                                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-3 rounded-xl border border-white/10 ${expandedAsset === asset.id ? 'bg-stone-200 text-stone-900' : 'bg-black/40 text-stone-400'} transition-colors`}>
                                        <Box size={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold tracking-tight text-stone-100">{asset.title}</h3>
                                        <span className="text-xs text-white/40 uppercase tracking-widest">{asset.docs.length} Encrypted Documents</span>
                                    </div>
                                </div>
                                {expandedAsset === asset.id ? <ChevronDown size={20} className="text-stone-400"/> : <ChevronRight size={20} className="text-stone-600" />}
                            </button>

                            {/* Expanded Content */}
                            {expandedAsset === asset.id && (
                                <div className="border-t border-white/10 bg-black/20 animate-in slide-in-from-top-2 duration-200">
                                    
                                    {/* FEATURE 2: Immutable Proof of Ownership */}
                                    <div className="p-4 px-20 bg-white/5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <FileCheck size={16} className="text-green-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-green-500">Ownership Verified on Chain</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="font-mono text-xs text-white/60 bg-black/40 px-3 py-1 rounded border border-white/10">
                                                Token ID: {asset.tokenId}
                                            </div>
                                            <button 
                                                onClick={() => copyToClipboard(asset.tokenId, asset.id)}
                                                className="hover:text-white text-white/50 transition-colors"
                                            >
                                                {copiedToken === asset.id ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                            <button className="hover:text-white text-white/50 transition-colors" title="View on Etherscan">
                                                <ExternalLink size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Docs List */}
                                    {asset.docs.map((doc, idx) => (
                                        <div 
                                            key={doc.id}
                                            className="flex items-center justify-between p-4 pl-20 pr-6 border-b border-white/5 last:border-0 hover:bg-white/5 group transition-colors relative"
                                        >
                                            <div className="flex items-center gap-4">
                                                <FileText size={16} className="text-white/40 group-hover:text-white transition-colors" />
                                                <div>
                                                    <div className="text-sm font-bold text-white/90 group-hover:text-white">{doc.title}</div>
                                                    <div className="text-[10px] text-white/40 uppercase tracking-wider flex gap-3">
                                                        <span>{doc.date}</span>
                                                        <span>•</span>
                                                        <span>{doc.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* FEATURE 3: Actionable Context Menu */}
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                                                    className="p-2 hover:bg-white text-white hover:text-stone-900 rounded-full transition-all"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {/* Context Menu Dropdown */}
                                                {activeMenu === doc.id && (
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-stone-800 text-stone-200 z-50 shadow-xl border border-white/20 animate-in zoom-in-95 duration-100 rounded-xl overflow-hidden">
                                                        <div className="flex flex-col py-1">
                                                            <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 flex items-center gap-2 transition-colors">
                                                                <Download size={14} /> Download
                                                            </button>
                                                            
                                                            {/* Smart Actions based on Doc Type */}
                                                            {doc.type === 'INSURANCE' && (
                                                                <>
                                                                    <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                                                                        File Claim
                                                                    </button>
                                                                    <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                                                                        Request Renewal
                                                                    </button>
                                                                </>
                                                            )}
                                                            {doc.type === 'DEED' && (
                                                                <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                                                                    Order Physical Copy
                                                                </button>
                                                            )}
                                                             {doc.type === 'LICENSE' && (
                                                                <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                                                                    Check Fines
                                                                </button>
                                                            )}

                                                            <div className="h-px bg-white/10 my-1"></div>
                                                            <button className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left hover:bg-white/10 text-stone-500 transition-colors">
                                                                Properties
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Click outside closer overlay */}
                                                {activeMenu === doc.id && (
                                                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 border border-dashed border-white/10 text-center rounded-2xl bg-white/5">
                    <Shield size={32} className="mx-auto text-white/20 mb-4" />
                    <p className="text-white/40 text-sm max-w-md mx-auto">
                        All documents are stored on a decentralized IPFS ledger. 
                        Access is restricted to your biometric signature.
                    </p>
                </div>

            </div>

            {/* QR Code Modal for Emergency Mode */}
            {showQr && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/90 backdrop-blur-md p-6 animate-in fade-in">
                    <div className="bg-white p-8 max-w-sm w-full text-center relative shadow-2xl animate-in zoom-in-95 rounded-3xl">
                        <button 
                            onClick={() => setShowQr(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-900"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="mb-6">
                            <h3 className="text-xl font-serif font-bold tracking-tight text-stone-900 mb-1">{showQr.title}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Official Digital Document</p>
                        </div>

                        <div className="bg-white p-4 border border-stone-200 inline-block mb-6 rounded-xl shadow-inner">
                            <QrCode size={180} className="text-stone-900" />
                        </div>

                        <div className="p-4 bg-stone-50 text-[10px] text-stone-500 font-mono uppercase tracking-wide leading-relaxed rounded-xl border border-stone-100">
                            This QR code grants temporary read-only access to the official document hosted on government servers.
                            <br/><br/>
                            <strong>Valid for 15 Minutes</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};