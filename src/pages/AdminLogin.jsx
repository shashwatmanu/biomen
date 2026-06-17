import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief authentication delay for UX
    setTimeout(() => {
      const systemAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'biomen_deck_2026!';
      if (username === 'biolabsAdmin' && password === systemAdminPassword) {
        localStorage.setItem('biolabs_admin_session', 'authenticated_token_99');
        navigate('/admin');
      } else {
        setError('Invalid administrator credentials. Access denied.');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#030705] relative overflow-hidden flex items-center justify-center p-6">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(22,199,132,0.07) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(15,163,107,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-md w-full relative z-10">

        {/* Brand Banner */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784] shadow-[0_0_40px_rgba(22,199,132,0.15)]">
              <ShieldCheck size={28} />
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-[0.15em] text-white">BIOMEN LABS</h2>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#16C784] mt-2">Founders Secure Portal</p>
        </div>

        {/* Login Box */}
        <div
          className={`bg-black/40 border border-white/8 p-8 rounded-[2rem] shadow-2xl backdrop-blur-md transition-all ${shake ? 'shake-animation' : ''}`}
          style={{ borderColor: error ? 'rgba(216,90,31,0.3)' : 'rgba(255,255,255,0.08)' }}
        >
          <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/5 pb-5 mb-7 flex items-center gap-2">
            <Lock size={12} className="text-[#16C784]" /> Secure Console Access
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">
                Administrator Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="biolabsAdmin"
                required
                autoComplete="username"
                className="w-full px-4 py-3.5 bg-white/3 border border-white/8 focus:border-[#0FA36B]/60 rounded-2xl text-white text-sm font-semibold placeholder-gray-700 outline-none transition-all hover:border-white/15"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">
                Secure Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-12 bg-white/3 border border-white/8 focus:border-[#0FA36B]/60 rounded-2xl text-white text-sm font-semibold placeholder-gray-700 outline-none transition-all hover:border-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-all cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#D85A1F]/10 border border-[#D85A1F]/20 text-[#D85A1F] text-[10px] font-black uppercase tracking-wider p-3.5 rounded-xl text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#0FA36B] hover:bg-[#16C784] disabled:bg-[#0FA36B]/50 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(22,199,132,0.15)] hover:shadow-[0_0_40px_rgba(22,199,132,0.25)] flex items-center justify-center gap-2.5 hover:scale-[1.01] cursor-pointer disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <KeyRound size={14} />
                  Open Executive Deck
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-300 transition-all"
          >
            ← Return to storefront
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(3px); }
        }
        .shake-animation { animation: shake 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
