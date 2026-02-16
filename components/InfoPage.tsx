import React, { useEffect } from 'react';
import { Locale, InfoType } from '../types';
import { ArrowLeft, Check, Shield, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface InfoPageProps {
  type: InfoType;
  lang: Locale;
  onBack: () => void;
}

export const InfoPage: React.FC<InfoPageProps> = ({ type, lang, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'MANIFESTO':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-stone-900 mb-12 leading-[1.1]">
              Access over<br/>
              <span className="italic text-stone-400">Excess.</span>
            </h1>
            <div className="prose prose-stone prose-lg text-stone-600 font-light leading-relaxed">
              <p className="mb-6 text-xl">
                The era of heavy ownership is ending. In its place, a new philosophy of lightness.
              </p>
              <p className="mb-6">
                We believe that the true value of a supercar, a yacht, or a penthouse lies not in the title deed stored in a safe, but in the moment of experience. The Sunday drive through Jebel Hafeet. The sunset from the Palm.
              </p>
              <p className="mb-6">
                Coshare was born to dismantle the barriers to these moments. We slice the asset, digitize the equity, and handle the burden. You simply arrive.
              </p>
              <blockquote className="border-l-2 border-stone-900 pl-6 my-12 italic text-2xl font-serif text-stone-800">
                "We are not selling fractions of an asset. We are selling 100% of the lifestyle, for 12.5% of the cost."
              </blockquote>
            </div>
          </div>
        );
      case 'MEMBERSHIP':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-4">The Circle</h1>
            <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-12">Membership & Vetting</p>
            
            <div className="space-y-12">
              <section className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                 <h3 className="text-xl font-serif font-bold mb-4">The Vetting Process</h3>
                 <p className="text-stone-600 mb-6 leading-relaxed">
                   Coshare is a closed marketplace. To ensure the integrity of our community and the safety of shared assets, every member undergoes a strict verification process.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                        <Check size={16} className="text-stone-900" /> Identity Verification (Emirates ID / Passport)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                        <Check size={16} className="text-stone-900" /> AML/KYC Compliance Check
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                        <Check size={16} className="text-stone-900" /> Soft Credit Check (For active booking privileges)
                    </li>
                 </ul>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Platform Fees</h3>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="font-serif text-2xl">2.5%</span>
                        <span className="text-xs text-stone-500 uppercase">Per Transaction</span>
                      </div>
                      <p className="text-sm text-stone-500">Applied to the acquisition and resale of asset fractions.</p>
                  </div>
                  <div>
                      <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Management</h3>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="font-serif text-2xl">At Cost</span>
                        <span className="text-xs text-stone-500 uppercase">Zero Markup</span>
                      </div>
                      <p className="text-sm text-stone-500">Service charges, insurance, and maintenance are passed through directly.</p>
                  </div>
              </div>
            </div>
          </div>
        );
      case 'LEGAL':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-4">Legal Framework</h1>
             <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-12">Risk & Compliance</p>
             
             <div className="space-y-8 text-stone-600 leading-relaxed">
                <section>
                    <h3 className="text-stone-900 font-bold mb-2">SPV Structure</h3>
                    <p className="text-sm mb-4">
                        Each asset listed on Coshare is held within a dedicated Special Purpose Vehicle (SPV) registered in the Dubai International Financial Centre (DIFC) or Abu Dhabi Global Market (ADGM). When you purchase a fraction, you are purchasing shares in this SPV, which grants you usage rights and dividend entitlements.
                    </p>
                </section>
                <section>
                    <h3 className="text-stone-900 font-bold mb-2">Regulatory Disclaimer</h3>
                    <p className="text-sm mb-4">
                        Fractional ownership of luxury assets involves risk, including the loss of capital. These assets are illiquid and may fluctuate in value. Past performance is not indicative of future results. Coshare is not a registered investment advisor.
                    </p>
                </section>
                <section>
                    <h3 className="text-stone-900 font-bold mb-2">Usage Rights</h3>
                    <p className="text-sm">
                        Usage rights are governed by a rotating calendar system. Failure to adhere to asset care guidelines may result in penalties or suspension of booking privileges.
                    </p>
                </section>
                
                <div className="p-6 bg-stone-100 rounded-2xl flex items-start gap-4 mt-8">
                    <Shield size={24} className="text-stone-900 shrink-0" />
                    <div>
                        <h4 className="font-bold text-stone-900 text-sm mb-1">Smart Contract Verification</h4>
                        <p className="text-xs text-stone-500">All ownership transfers are recorded on a permissioned ledger for immutable proof of ownership.</p>
                    </div>
                </div>
             </div>
          </div>
        );
      case 'CONTACT':
        return (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-4">Concierge</h1>
                <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-12">Direct Access</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <button className="p-8 bg-stone-900 text-white rounded-3xl text-left hover:bg-stone-800 transition-colors group shadow-xl shadow-stone-900/10">
                        <Mail size={32} className="mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-serif mb-2">WhatsApp Concierge</h3>
                        <p className="text-stone-400 text-sm mb-6">24/7 dedicated support for bookings and inquiries.</p>
                        <span className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 group-hover:opacity-70 transition-opacity">Start Chat</span>
                    </button>
                    <button className="p-8 bg-white border border-stone-200 text-stone-900 rounded-3xl text-left hover:bg-stone-50 transition-colors group">
                        <Phone size={32} className="mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-serif mb-2">Private Client Office</h3>
                        <p className="text-stone-500 text-sm mb-6">Schedule a consultation with a wealth manager.</p>
                        <span className="text-xs font-bold uppercase tracking-widest border-b border-stone-900 pb-1 group-hover:opacity-70 transition-opacity">Request Call</span>
                    </button>
                </div>

                <div className="border-t border-stone-200 pt-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8">Locations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900">Dubai, UAE</h4>
                                <p className="text-sm text-stone-500 mt-1">
                                    Gate Avenue, DIFC<br/>
                                    Unit 802, Level 8<br/>
                                    Dubai International Financial Centre
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
                                <Globe size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900">Riyadh, KSA</h4>
                                <p className="text-sm text-stone-500 mt-1">
                                    Olaya Towers, Tower B<br/>
                                    Level 24, Olaya District<br/>
                                    Riyadh 12213
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 text-stone-400 hover:text-stone-900 transition-colors group"
      >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
      </button>
      {renderContent()}
    </div>
  );
};