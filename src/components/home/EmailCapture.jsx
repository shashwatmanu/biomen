import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="py-32 px-6 md:px-20 bg-black border-y border-white/5 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white">Join the Protocol <span className="text-orange-500">●</span></h2>
        <p className="text-xl text-gray-400 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
          Get exclusive access to performance protocols, early product releases, and biological optimization research.
        </p>

        {status === 'success' ? (
          <div className="bg-emerald-900/20 border border-emerald-500/30 p-8 rounded-[2rem] inline-flex items-center gap-4 text-emerald-400 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={32} />
            <div className="text-left">
              <div className="font-black uppercase tracking-widest text-lg">You're In</div>
              <div className="text-sm opacity-80">Welcome to the future of male vitality.</div>
            </div>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your primary email address" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-lg placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_30px_rgba(234,88,12,0.2)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : <>Subscribe <Send size={18} /></>}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <p className="text-red-500 text-sm font-bold mt-4 uppercase tracking-widest animate-pulse">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-xs text-gray-600 font-bold uppercase tracking-[0.2em] mt-8">
          By joining, you agree to our Protocol Terms. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default EmailCapture;
