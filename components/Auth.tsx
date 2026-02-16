import React, { useState } from 'react';
import { Locale } from '../types';
import { DICTIONARY } from '../constants';
import { X } from 'lucide-react';

interface AuthProps {
  onLogin: (data: { firstName: string; isVerified: boolean }) => void;
  lang: Locale;
  onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, lang, onClose }) => {
  const t = DICTIONARY[lang];
  const [step, setStep] = useState<'LOGIN' | 'VERIFY'>('LOGIN');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (navigator.vibrate) navigator.vibrate(10);
    setStep('VERIFY');
  };

  const handleFinal = (skip: boolean) => {
     if (navigator.vibrate) navigator.vibrate(10);
     onLogin({ 
         firstName: form.firstName || 'Guest', 
         isVerified: !skip 
     });
  };

  const fillDemo = () => {
    setForm({
      firstName: 'Ramon',
      lastName: 'Sanchiz',
      email: 'demo@coshare.ae',
      phone: '+971 50 999 9999'
    });
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50/50 backdrop-blur-sm p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
      <div className="absolute bottom-0 right-0 w-full h-2 bg-stone-900" />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-stone-900 hover:bg-stone-200 rounded-full transition-colors z-50"
      >
        <X size={24} />
      </button>
      
      <div className="w-full max-w-md animate-in zoom-in-95 duration-500 bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-stone-900/10 border border-stone-100">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2 text-center text-stone-900">coshare.</h1>
        <p className="text-center text-stone-400 mb-12 uppercase text-xs tracking-[0.2em]">{t.subtitle}</p>

        {step === 'LOGIN' ? (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500">First Name</label>
                    <input 
                        required
                        type="text" 
                        className="w-full border-b border-stone-300 p-2 outline-none bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors appearance-none font-serif text-lg"
                        value={form.firstName}
                        onChange={e => setForm({...form, firstName: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500">Last Name</label>
                    <input 
                        required
                        type="text" 
                        className="w-full border-b border-stone-300 p-2 outline-none bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors appearance-none font-serif text-lg"
                        value={form.lastName}
                        onChange={e => setForm({...form, lastName: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">Email Address</label>
                <input 
                    required
                    type="email" 
                    className="w-full border-b border-stone-300 p-2 outline-none bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors appearance-none font-serif text-lg"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                />
            </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">Phone (UAE/KSA)</label>
                <input 
                    required
                    type="tel" 
                    className="w-full border-b border-stone-300 p-2 outline-none bg-transparent text-stone-900 placeholder:text-stone-300 focus:border-stone-900 transition-colors appearance-none font-serif text-lg"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                />
            </div>

            <div className="flex items-center gap-2 pt-4">
                <input 
                    type="checkbox" 
                    id="keepSigned" 
                    checked={keepSignedIn}
                    onChange={e => setKeepSignedIn(e.target.checked)}
                    className="w-4 h-4 accent-stone-900 rounded-sm"
                />
                <label htmlFor="keepSigned" className="text-sm select-none cursor-pointer text-stone-600">{t.keepSignedIn}</label>
            </div>

            <button type="submit" className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-800 hover:shadow-lg transition-all mt-8 rounded-full active:scale-95">
                Continue
            </button>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
                {['Google', 'Apple', 'Microsoft'].map(p => (
                    <button key={p} type="button" className="border border-stone-200 py-3 text-xs font-bold hover:border-stone-900 transition-colors text-stone-600 bg-white rounded-xl">
                        {p}
                    </button>
                ))}
            </div>

            {/* Demo Creds */}
            <div className="mt-8 pt-6 border-t border-dashed border-stone-200 text-center">
                 <button 
                    type="button" 
                    onClick={fillDemo}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                 >
                    [ Tap for Demo Credentials ]
                 </button>
             </div>
          </form>
        ) : (
            <div className="text-center space-y-8 animate-in slide-in-from-right-8 duration-300">
                <div className="w-24 h-24 border-2 border-stone-200 border-dashed rounded-full mx-auto flex items-center justify-center">
                    <div className="w-20 h-20 bg-stone-100 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-900">{t.setupId}</h3>
                <p className="text-sm text-stone-500">Scan your Emirates ID or Passport to receive the "Verified" badge and unlock purchasing.</p>
                
                <div className="space-y-4">
                    <button onClick={() => handleFinal(false)} className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-800 hover:shadow-lg transition-all rounded-full active:scale-95">
                        Scan ID Document
                    </button>
                    <button onClick={() => handleFinal(true)} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                        Skip for Browsing
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};