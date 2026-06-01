import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, KeyRound } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const systemAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'biomen_deck_2026!';
    if (username === 'biolabsAdmin' && password === systemAdminPassword) {
      localStorage.setItem('biolabs_admin_session', 'authenticated_token_99');
      navigate('/admin');
    } else {
      setError('Invalid system administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030705] relative overflow-hidden flex items-center justify-center p-6">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-biomen-green/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
              <ShieldCheck size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-normal font-serif text-[#F4F6F2] tracking-tight">BIOMEN LABS</h2>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#16C784] mt-1">FOUNDERS SECURE PORTAL</p>
        </div>

        {/* Login Box */}
        <div className="bg-black/40 border border-white/10 p-8 rounded-[2rem] shadow-2xl backdrop-blur-md">
          <h3 className="text-sm font-black uppercase text-white tracking-widest border-b border-white/5 pb-4 mb-6 flex items-center gap-2">
            <Lock size={14} className="text-[#16C784]" /> SECURE CONSOLE ACCESS
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">SYSTEM USERNAME</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. biolabsAdmin" 
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-[#0FA36B] rounded-xl text-white text-xs font-semibold placeholder-gray-600 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">SECURE CREDENTIAL PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 focus:border-[#0FA36B] rounded-xl text-white text-xs font-semibold placeholder-gray-600 outline-none transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#D85A1F]/10 border border-[#D85A1F]/20 text-[#D85A1F] text-[10px] font-black uppercase tracking-wider p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-4.5 bg-[#0FA36B] hover:bg-[#16C784] text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(22,199,132,0.15)] flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
            >
              <KeyRound size={14} /> Open Executive Deck
            </button>

          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] font-black uppercase tracking-wider text-gray-500 hover:text-white transition-all"
          >
            &larr; Return to main storefront
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
