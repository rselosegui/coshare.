import React, { useState, useEffect } from 'react';
import { Locale } from '../types';
import { DICTIONARY } from '../constants';
import { X, UploadCloud, ScanLine, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';

interface AuthProps {
  onLogin: (data: { firstName: string; isVerified: boolean }) => void;
  lang: Locale;
  onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, lang, onClose }) => {
  const t = DICTIONARY[lang];
  const [step, setStep] = useState<'LOGIN' | 'KYC_INTRO' | 'KYC_UPLOAD' | 'KYC_PROCESSING' | 'KYC_SUCCESS'>('LOGIN');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (navigator.vibrate) navigator.vibrate(10);
    setStep('KYC_INTRO');
  };

  const startKyc = () => {
      setStep('KYC_UPLOAD');
  };

  const handleFileUpload = () => {
      // Simulate file upload progress
      let p = 0;
      const interval = setInterval(() => {
          p += 10;
          setUploadProgress(p);
          if (p >= 100) {
              clearInterval(interval);
              setTimeout(() => setStep('KYC_PROCESSING'), 500);
          }
      }, 150);
  };

  useEffect(() => {
      if (step === 'KYC_PROCESSING') {
          // Simulate AML Check delay
          const timer = setTimeout(() => {
              setStep('KYC_SUCCESS');
          }, 3000);
          return () => clearTimeout(timer);
      }
  }, [step]);

  const handleFinal = (isVerified: boolean) => {
     if (navigator.vibrate) navigator.vibrate(10);
     onLogin({ 
         firstName: form.firstName || 'Guest', 
         isVerified 
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
    <div className="min-h-screen flex items-center justify-center bg-stone-50/50 backdrop-blur-sm p-6 relative overflow-hidden z-[100]">
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
      
      <div className="w-full max-w-md animate-in zoom-in-95 duration-500 bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-stone-900/10 border border-stone-100 relative">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2 text-center text-stone-900">coshare.</h1>
        <p className="text-center text-stone-400 mb-12 uppercase text-xs tracking-[0.2em]">{t.subtitle}</p>

        {step === 'LOGIN' && (
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
        )}

        {/* KYC INTRO */}
        {step === 'KYC_INTRO' && (
            <div className="text-center space-y-8 animate-in slide-in-from-right-8 duration-300">
                <div className="w-24 h-24 border-2 border-stone-200 border-dashed rounded-full mx-auto flex items-center justify-center">
                    <ShieldAlert className="w-10 h-10 text-stone-400" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{t.setupId}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">
                        To comply with UAE & KSA financial regulations (AML/KYC), we require a valid government ID.
                    </p>
                </div>
                
                <div className="bg-stone-50 p-4 rounded-2xl text-left border border-stone-100">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-stone-600 font-bold uppercase tracking-wider">
                            <CheckCircle2 size={16} className="text-stone-900" /> Emirates ID / Passport
                        </li>
                        <li className="flex items-center gap-3 text-xs text-stone-600 font-bold uppercase tracking-wider">
                            <CheckCircle2 size={16} className="text-stone-900" /> Facial Biometrics
                        </li>
                        <li className="flex items-center gap-3 text-xs text-stone-600 font-bold uppercase tracking-wider">
                            <CheckCircle2 size={16} className="text-stone-900" /> Proof of Address
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <button onClick={startKyc} className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-800 hover:shadow-lg transition-all rounded-full active:scale-95">
                        Verify Identity
                    </button>
                    <button onClick={() => handleFinal(false)} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                        Skip (Guest Mode)
                    </button>
                </div>
            </div>
        )}

        {/* KYC UPLOAD */}
        {step === 'KYC_UPLOAD' && (
             <div className="text-center space-y-8 animate-in slide-in-from-right-8 duration-300">
                <div 
                    onClick={handleFileUpload}
                    className="border-2 border-dashed border-stone-300 rounded-3xl p-10 cursor-pointer hover:border-stone-900 hover:bg-stone-50 transition-all group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <UploadCloud className="w-12 h-12 text-stone-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-stone-700">Upload Document</h3>
                        <p className="text-xs text-stone-400 mt-2 uppercase tracking-widest">Emirates ID (Front & Back)</p>
                    </div>
                    {uploadProgress > 0 && (
                        <div className="absolute bottom-0 left-0 h-1 bg-stone-900 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                    )}
                </div>
                <p className="text-xs text-stone-400">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>
        )}

        {/* KYC PROCESSING */}
        {step === 'KYC_PROCESSING' && (
            <div className="text-center space-y-8 animate-in slide-in-from-right-8 duration-300">
                <div className="w-24 h-24 bg-stone-50 rounded-full mx-auto flex items-center justify-center relative">
                    <ScanLine className="w-10 h-10 text-stone-900 animate-pulse" />
                    <div className="absolute inset-0 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">Verifying...</h3>
                    <p className="text-sm text-stone-500">Checking against global AML databases...</p>
                </div>
            </div>
        )}

        {/* KYC SUCCESS */}
        {step === 'KYC_SUCCESS' && (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-stone-900 text-white rounded-full mx-auto flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">Verification Complete</h3>
                    <p className="text-sm text-stone-500">You are now a verified investor.</p>
                </div>
                <button onClick={() => handleFinal(true)} className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-stone-800 hover:shadow-lg transition-all rounded-full active:scale-95">
                    Enter Marketplace
                </button>
            </div>
        )}

      </div>
    </div>
  );
};