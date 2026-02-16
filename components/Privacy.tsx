import React, { useState } from 'react';
import { User, Locale } from '../types';
import { ArrowLeft, Shield, Eye, EyeOff, Fingerprint, Globe, Smartphone, LogOut } from 'lucide-react';

interface PrivacyProps {
    user: User;
    lang: Locale;
    onUpdateUser: (data: Partial<User>) => void;
    onBack: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ user, lang, onUpdateUser, onBack }) => {
    const [privacy, setPrivacy] = useState(user.privacy);

    const togglePrivacy = (key: keyof typeof privacy) => {
        if (navigator.vibrate) navigator.vibrate(10);
        const newPrivacy = { ...privacy, [key]: !privacy[key] };
        setPrivacy(newPrivacy);
        onUpdateUser({ privacy: newPrivacy });
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-32 px-6 max-w-3xl mx-auto animate-in slide-in-from-right-8 duration-500">
             {/* Header */}
             <div className="flex items-center gap-4 mb-12 border-b border-black pb-6">
                <button onClick={onBack} className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                    <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
                <h1 className="text-3xl font-extrabold tracking-tighter uppercase">Privacy & Security</h1>
            </div>

            <div className="space-y-12">
                
                {/* Visibility Section */}
                <section className="bg-gray-50 p-8 border border-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield size={120} />
                    </div>
                    
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Globe size={16} /> Public Visibility
                    </h2>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-bold">Ghost Mode</span>
                                {privacy.isGhostMode && <span className="bg-black text-white text-[10px] px-2 py-0.5 uppercase tracking-widest font-bold">Active</span>}
                            </div>
                            <p className="text-sm text-gray-500 max-w-md">
                                When enabled, your profile and portfolio value are completely hidden from member directories and leaderboards. Concierge can still contact you.
                            </p>
                        </div>
                        <button 
                            onClick={() => togglePrivacy('isGhostMode')}
                            className={`
                                flex items-center gap-3 px-6 py-3 border border-black font-bold uppercase tracking-widest text-xs transition-all
                                ${privacy.isGhostMode ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}
                            `}
                        >
                            {privacy.isGhostMode ? <EyeOff size={16} /> : <Eye size={16} />}
                            {privacy.isGhostMode ? 'Hidden' : 'Visible'}
                        </button>
                    </div>
                </section>

                {/* Security Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-black pb-2">
                        <Fingerprint size={16} /> Security Settings
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-black transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <Fingerprint size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Biometric Vault Access</div>
                                    <div className="text-xs text-gray-500">Require FaceID/TouchID to view documents.</div>
                                </div>
                            </div>
                             <button 
                                onClick={() => togglePrivacy('biometricEnabled')}
                                className={`
                                    w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out
                                    ${privacy.biometricEnabled ? 'bg-black' : 'bg-gray-200'}
                                `}
                            >
                                <div className={`
                                    w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                                    ${privacy.biometricEnabled ? 'translate-x-6' : 'translate-x-0'}
                                `} />
                            </button>
                        </div>

                         <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-black transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Data Sharing</div>
                                    <div className="text-xs text-gray-500">Allow anonymized data sharing with partners.</div>
                                </div>
                            </div>
                             <button 
                                onClick={() => togglePrivacy('dataSharing')}
                                className={`
                                    w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out
                                    ${privacy.dataSharing ? 'bg-black' : 'bg-gray-200'}
                                `}
                            >
                                <div className={`
                                    w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                                    ${privacy.dataSharing ? 'translate-x-6' : 'translate-x-0'}
                                `} />
                            </button>
                        </div>
                    </div>
                </section>

                 {/* Active Sessions (Mock) */}
                 <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-black pb-2">
                        <Smartphone size={16} /> Active Sessions
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center opacity-100">
                            <div className="flex items-center gap-4">
                                <Smartphone size={24} className="text-green-500" />
                                <div>
                                    <div className="font-bold text-sm">iPhone 15 Pro (This Device)</div>
                                    <div className="text-xs text-gray-500">Dubai, UAE • Online Now</div>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Active</span>
                        </div>

                         <div className="flex justify-between items-center opacity-50">
                            <div className="flex items-center gap-4">
                                <Globe size={24} />
                                <div>
                                    <div className="font-bold text-sm">Chrome on MacOS</div>
                                    <div className="text-xs text-gray-500">Riyadh, KSA • 2 days ago</div>
                                </div>
                            </div>
                            <button className="text-xs font-bold uppercase text-red-500 hover:underline flex items-center gap-1">
                                <LogOut size={12} /> Revoke
                            </button>
                        </div>
                    </div>
                 </section>

                 <div className="mt-12 pt-8 border-t border-gray-200">
                     <button className="text-xs text-red-600 font-bold uppercase tracking-widest hover:opacity-50">
                         Request Account Deletion (GDPR)
                     </button>
                 </div>

            </div>
        </div>
    );
};
