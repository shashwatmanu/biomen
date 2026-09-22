import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import API_URL from '../utils/api';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    // If email is passed in URL, pre-fill it
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleUnsubscribe = async (e) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const res = await fetch(`${API_URL}/subscribe/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed.');
        setCancelledCount(data.cancelledEmailsCount || 0);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to process unsubscription. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Communication failure with servers. Please check your network connection.');
    }
  };

  // Auto-trigger if email is already in URL parameters
  useEffect(() => {
    if (emailParam && emailParam.includes('@')) {
      handleUnsubscribe();
    }
  }, [emailParam]);

  return (
    <div className="min-h-screen bg-[#030705] text-[#F4F6F2] relative flex items-center justify-center p-6 select-none overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0FA36B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal tracking-[0.15em] font-serif text-white uppercase">BIOMEN LABS</h1>
          <p className="text-[8px] font-black tracking-[0.25em] text-[#16C784] uppercase mt-1.5">Communication Preferences</p>
        </div>

        {/* Card Panel */}
        <div className="bg-black/30 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-6">
          
          {status === 'idle' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#BFA46A]">
                  <ShieldAlert size={26} />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="text-md font-black uppercase tracking-wider text-white">Unsubscribe Confirmation</h2>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Enter your email address below to unsubscribe from our newsletter lists and cancel any pending retention emails.
                </p>
              </div>

              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#0FA36B] outline-none text-xs font-semibold placeholder-gray-700 tracking-wide text-center"
                  required
                />
                
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D85A1F] hover:bg-[#c24f18] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  Unsubscribe From All Lists
                </button>
              </form>
            </div>
          )}

          {status === 'loading' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="animate-spin text-[#16C784]" size={36} />
              <div className="text-center space-y-1">
                <div className="text-xs font-black uppercase text-white tracking-widest">Processing Preferences</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Syncing secure databanks...</div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex items-center justify-center text-[#16C784]">
                  <CheckCircle2 size={26} />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-md font-black uppercase tracking-wider text-white">Successfully Unsubscribed</h2>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed px-4">
                  {message}
                </p>
                {cancelledCount > 0 && (
                  <p className="text-[10px] text-[#16C784] font-black uppercase tracking-wider bg-[#052E22] border border-[#0FA36B]/20 py-1.5 px-3 rounded-lg w-fit mx-auto mt-2">
                    Cancelled {cancelledCount} pending retention task{cancelledCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} /> Return to Storefront
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#D85A1F]/10 border border-[#D85A1F]/20 flex items-center justify-center text-[#D85A1F]">
                  <AlertTriangle size={26} />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-md font-black uppercase tracking-wider text-white">Unsubscribe Failed</h2>
                <p className="text-xs text-[#D85A1F] font-semibold leading-relaxed px-4">
                  {message}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setStatus('idle')}
                  className="w-full py-4 bg-[#D85A1F] hover:bg-[#c24f18] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={12} /> Return to Storefront
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info text */}
        <div className="text-center mt-6">
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
            Biomen Labs Premium Vitality &copy; 2026. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Unsubscribe;
