import React, { useState } from 'react';
import { User, Locale } from '../types';
import { ArrowLeft, Bell, MessageSquare, Save, Mail, Phone, User as UserIcon, Shield, Globe, Fingerprint, Eye, EyeOff, Smartphone, LogOut, Lock, Search, Sparkles, Tag, ShieldAlert, History } from 'lucide-react';

interface SettingsProps {
    user: User;
    lang: Locale;
    onUpdateUser: (data: Partial<User>) => void;
    onBack: () => void;
    initialTab?: 'GENERAL' | 'PRIVACY' | 'SECURITY';
}

export const Settings: React.FC<SettingsProps> = ({ user, lang, onUpdateUser, onBack, initialTab = 'GENERAL' }) => {
    const [activeTab, setActiveTab] = useState<'GENERAL' | 'PRIVACY' | 'SECURITY'>(initialTab);

    // General Form State
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [prefs, setPrefs] = useState(user.settings);

    // Privacy Form State
    const [privacy, setPrivacy] = useState(user.privacy);

    const handleSave = () => {
        if (navigator.vibrate) navigator.vibrate(10);
        onUpdateUser({
            firstName,
            lastName,
            email,
            phone,
            settings: prefs,
            privacy: privacy
        });
        onBack();
    };

    const toggleNotification = (key: keyof typeof prefs.notifications) => {
        setPrefs({
            ...prefs,
            notifications: {
                ...prefs.notifications,
                [key]: !prefs.notifications[key]
            }
        });
    };

    const togglePrivacy = (key: keyof typeof privacy) => {
        if (navigator.vibrate) navigator.vibrate(10);
        setPrivacy({
            ...privacy,
            [key]: !privacy[key]
        });
    };

    const ToggleButton = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => (
        <button 
            onClick={onClick}
            className={`
                w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0
                ${isActive ? 'bg-stone-900' : 'bg-stone-200'}
            `}
        >
            <div className={`
                w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300
                ${isActive ? 'translate-x-6' : 'translate-x-0'}
            `} />
        </button>
    );

    return (
        <div className="bg-stone-50 min-h-screen pt-28 pb-40 px-6 max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors shadow-sm">
                        <ArrowLeft size={20} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-3xl font-serif font-medium text-stone-900">Settings</h1>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 p-3 md:px-6 md:py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors rounded-full shadow-lg"
                    aria-label="Save Changes"
                >
                    <Save size={16} /> 
                    <span className="hidden md:inline">Save Changes</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-stone-200 mb-12 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setActiveTab('GENERAL')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                        activeTab === 'GENERAL' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-900'
                    }`}
                >
                    General
                </button>
                <button 
                    onClick={() => setActiveTab('PRIVACY')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                        activeTab === 'PRIVACY' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-900'
                    }`}
                >
                    Privacy
                </button>
                <button 
                    onClick={() => setActiveTab('SECURITY')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                        activeTab === 'SECURITY' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-900'
                    }`}
                >
                    Security
                </button>
            </div>

            <div className="animate-in fade-in duration-300">
                {activeTab === 'GENERAL' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Personal Information */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                                <UserIcon className="w-4 h-4" /> Personal Details
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500">First Name</label>
                                        <input 
                                            type="text" 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full border-b border-stone-300 py-2 font-serif text-lg focus:border-stone-900 outline-none transition-colors bg-transparent text-stone-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full border-b border-stone-300 py-2 font-serif text-lg focus:border-stone-900 outline-none transition-colors bg-transparent text-stone-900"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500">Email Address</label>
                                    <div className="flex items-center gap-2 border-b border-stone-300 py-2">
                                        <Mail size={16} className="text-stone-400" />
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full font-serif text-lg focus:outline-none bg-transparent text-stone-900"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500">Phone Number</label>
                                    <div className="flex items-center gap-2 border-b border-stone-300 py-2">
                                        <Phone size={16} className="text-stone-400" />
                                        <input 
                                            type="tel" 
                                            value={phone} 
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full font-serif text-lg focus:outline-none bg-transparent text-stone-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Preferences */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Concierge Preferences
                            </h2>
                            
                            <div className="mb-12">
                                <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-stone-500">Preferred Contact Method</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {(['WHATSAPP', 'EMAIL', 'PHONE'] as const).map(method => (
                                        <button
                                            key={method}
                                            onClick={() => setPrefs({...prefs, contactMethod: method})}
                                            className={`
                                                py-3 px-4 border text-xs font-bold uppercase tracking-widest transition-all rounded-xl
                                                ${prefs.contactMethod === method 
                                                    ? 'border-stone-900 bg-stone-900 text-white' 
                                                    : 'border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900'}
                                            `}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                                <Bell className="w-4 h-4" /> Notifications
                            </h2>
                            
                            <div className="space-y-4">
                                {[
                                    { key: 'newDrops', label: 'New Asset Drops', desc: 'Alerts when new inventory is listed.' },
                                    { key: 'portfolioUpdates', label: 'Portfolio Performance', desc: 'Weekly valuation and yield reports.' },
                                    { key: 'whatsapp', label: 'WhatsApp Updates', desc: 'Receive critical alerts via WhatsApp.' }
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">{item.label}</div>
                                            <div className="text-xs text-stone-500">{item.desc}</div>
                                        </div>
                                        <ToggleButton 
                                            isActive={prefs.notifications[item.key as keyof typeof prefs.notifications]}
                                            onClick={() => toggleNotification(item.key as keyof typeof prefs.notifications)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'PRIVACY' && (
                    <div className="space-y-12 max-w-3xl">
                        {/* Visibility Section */}
                        <section className="bg-white p-8 border border-stone-200 rounded-3xl relative overflow-hidden transition-colors shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-5 text-stone-900">
                                <EyeOff size={120} />
                            </div>
                            
                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl font-serif font-bold text-stone-900">Ghost Mode</span>
                                        {privacy.isGhostMode && <span className="bg-stone-900 text-white text-[10px] px-2 py-0.5 uppercase tracking-widest font-bold rounded-full">Active</span>}
                                    </div>
                                    <p className="text-sm text-stone-600 max-w-md leading-relaxed mb-6">
                                        When active, your profile is completely invisible. You will not appear in member directories, and your portfolio value is hidden from leaderboards.
                                    </p>
                                    <button 
                                        onClick={() => togglePrivacy('isGhostMode')}
                                        className={`
                                            flex items-center gap-3 px-6 py-3 border font-bold uppercase tracking-widest text-xs transition-all rounded-full
                                            ${privacy.isGhostMode ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-900'}
                                        `}
                                    >
                                        {privacy.isGhostMode ? <EyeOff size={16} /> : <Eye size={16} />}
                                        {privacy.isGhostMode ? 'Deactivate Ghost Mode' : 'Activate Ghost Mode'}
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Discovery & Profile */}
                        <section>
                             <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-stone-200 pb-2 text-stone-900">
                                <Search size={16} /> Discovery & Profile
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Mail size={20} className="text-stone-400" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Searchable by Email</div>
                                            <div className="text-xs text-stone-500">Allow other members to find you via email.</div>
                                        </div>
                                    </div>
                                    <ToggleButton isActive={privacy.searchableByEmail} onClick={() => togglePrivacy('searchableByEmail')} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Tag size={20} className="text-stone-400" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Show Vibe Tags</div>
                                            <div className="text-xs text-stone-500">Display tags like "Frequent Flyer" on your profile.</div>
                                        </div>
                                    </div>
                                    <ToggleButton isActive={privacy.showVibeTags} onClick={() => togglePrivacy('showVibeTags')} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Shield size={20} className="text-stone-400" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Public Portfolio Value</div>
                                            <div className="text-xs text-stone-500">Show total equity on community leaderboards.</div>
                                        </div>
                                    </div>
                                    <ToggleButton isActive={privacy.showPortfolioValue} onClick={() => togglePrivacy('showPortfolioValue')} />
                                </div>
                            </div>
                        </section>

                        {/* Data & Intelligence */}
                        <section>
                             <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-stone-200 pb-2 text-stone-900">
                                <Sparkles size={16} /> Data & Intelligence
                            </h2>
                            <div className="space-y-4">
                                 <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Sparkles size={20} className="text-stone-400" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Concierge AI Learning</div>
                                            <div className="text-xs text-stone-500">Allow AI to analyze browsing for personalized asset drops.</div>
                                        </div>
                                    </div>
                                    <ToggleButton isActive={privacy.allowAiLearning} onClick={() => togglePrivacy('allowAiLearning')} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Globe size={20} className="text-stone-400" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Partner Data Sharing</div>
                                            <div className="text-xs text-stone-500">Share anonymized preferences with luxury partners.</div>
                                        </div>
                                    </div>
                                    <ToggleButton isActive={privacy.dataSharing} onClick={() => togglePrivacy('dataSharing')} />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'SECURITY' && (
                    <div className="space-y-12 max-w-3xl">
                        {/* 2FA Section */}
                        <section className="bg-stone-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl shadow-stone-900/20">
                             <div className="absolute top-0 right-0 p-4 opacity-20">
                                <ShieldAlert size={100} />
                            </div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldAlert size={20} />
                                        <span className="text-xl font-serif font-bold">Two-Factor Auth</span>
                                    </div>
                                    <p className="text-sm text-stone-400 max-w-md mb-6">
                                        Protect your account with an extra layer of security. Require a code from your authenticator app when signing in.
                                    </p>
                                    <button 
                                        onClick={() => togglePrivacy('twoFactorEnabled')}
                                        className={`
                                            flex items-center gap-3 px-6 py-3 border border-white font-bold uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-stone-900 rounded-full
                                            ${privacy.twoFactorEnabled ? 'bg-white text-stone-900' : 'bg-transparent text-white'}
                                        `}
                                    >
                                        {privacy.twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Access Control */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-stone-200 pb-2 text-stone-900">
                                <Lock size={16} /> Access Control
                            </h2>
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 transition-colors shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-stone-100 rounded-full">
                                        <Fingerprint size={20} className="text-stone-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-stone-900">Biometric Vault Access</div>
                                        <div className="text-xs text-stone-500">Require FaceID/TouchID to decrypt documents.</div>
                                    </div>
                                </div>
                                <ToggleButton isActive={privacy.biometricEnabled} onClick={() => togglePrivacy('biometricEnabled')} />
                            </div>
                        </section>

                        {/* Active Sessions */}
                        <section>
                            <div className="flex items-center justify-between mb-6 border-b border-stone-200 pb-2">
                                <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-stone-900">
                                    <Smartphone size={16} /> Active Sessions
                                </h2>
                                <button className="text-[10px] font-bold uppercase text-red-600 hover:underline">
                                    Sign Out All Devices
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white p-4 border-l-4 border-green-500 rounded-r-2xl shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Smartphone size={24} className="text-stone-800" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">iPhone 15 Pro (Current)</div>
                                            <div className="text-xs text-stone-500">Dubai, UAE • Online Now</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-stone-100 rounded-2xl opacity-60 hover:opacity-100 transition-opacity bg-white">
                                    <div className="flex items-center gap-4">
                                        <Globe size={24} className="text-stone-800" />
                                        <div>
                                            <div className="font-bold text-sm text-stone-900">Chrome on MacOS</div>
                                            <div className="text-xs text-stone-500">Riyadh, KSA • 2 days ago</div>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold uppercase text-red-500 hover:underline flex items-center gap-1">
                                        <LogOut size={12} /> Revoke
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Login History Mock */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-stone-200 pb-2 text-stone-900">
                                <History size={16} /> Recent Security Events
                            </h2>
                            <div className="text-xs grid gap-2">
                                <div className="flex justify-between py-2 border-b border-stone-100">
                                    <span className="font-bold text-stone-800">Password Changed</span>
                                    <span className="text-stone-500">Oct 24, 2025 • 10:23 AM</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-stone-100">
                                    <span className="font-bold text-stone-800">New Login (Riyadh)</span>
                                    <span className="text-stone-500">Oct 22, 2025 • 09:15 PM</span>
                                </div>
                                 <div className="flex justify-between py-2 border-b border-stone-100">
                                    <span className="font-bold text-stone-800">Biometrics Enabled</span>
                                    <span className="text-stone-500">Sep 15, 2025 • 02:45 PM</span>
                                </div>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-stone-200">
                            <button className="text-xs text-red-600 font-bold uppercase tracking-widest hover:opacity-50 border border-red-200 px-6 py-3 hover:bg-red-50 rounded-full transition-colors">
                                Request Account Deletion (GDPR)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};