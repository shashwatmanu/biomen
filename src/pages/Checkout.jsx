import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, ArrowLeft, Loader2, Sparkles, CheckCircle2, Lock, User, UserPlus, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import API_URL from '../utils/api';

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // States
  const [mode, setMode] = useState('guest'); // guest, login, register
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState('');
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  // User State
  const [token, setToken] = useState(localStorage.getItem('biolabs_token') || '');
  const [user, setUser] = useState(null);

  // Form Fields
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // Fetch profile if token exists
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setMode('profile');
        if (data.shippingAddress) {
          setStreet(data.shippingAddress.street || '');
          setCity(data.shippingAddress.city || '');
          setState(data.shippingAddress.state || '');
          setPostalCode(data.shippingAddress.postalCode || '');
          setCountry(data.shippingAddress.country || 'India');
        }
      } else {
        // Token expired or invalid
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('biolabs_token');
    setToken('');
    setUser(null);
    setMode('guest');
  };

  const handleEmailBlur = async (email, name) => {
    if (!email || !email.includes('@')) return;
    try {
      await fetch(`${API_URL}/email-flows/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: name ? name.trim().split(' ')[0] : 'Customer',
          flow: 'Cart Recovery',
          testMode: false
        })
      });
      console.log('Cart recovery event logged for email:', email);
    } catch (err) {
      console.error('Failed to trigger Cart Recovery flow:', err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('biolabs_token', data.token);
        setToken(data.token);
        setUser(data);
        setMode('profile');
        if (data.shippingAddress) {
          setStreet(data.shippingAddress.street || '');
          setCity(data.shippingAddress.city || '');
          setState(data.shippingAddress.state || '');
          setPostalCode(data.shippingAddress.postalCode || '');
          setCountry(data.shippingAddress.country || 'India');
        }
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, phone: regPhone, password: regPassword })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('biolabs_token', data.token);
        setToken(data.token);
        setUser(data);
        setMode('profile');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    const { checkoutUrl } = useCartStore.getState();
    if (checkoutUrl) {
      setLoading(true);
      setLoadingState('initiating');
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout');
      }
      window.location.href = checkoutUrl;
      return;
    } else {
      setError('Checkout URL not found. Please try adding items to cart again.');
      return;
    }

    /* === LEGACY BACKEND & RAZORPAY CODE BACKUP ===
    if (!window.Razorpay) {
      setError('Payment gateway is still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setLoadingState('initiating');
    setError('');

    const shippingAddress = { street, city, state, postalCode, country };
    const guestDetails = user ? null : { name: guestName, email: guestEmail, phone: guestPhone };

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const isLaunchDiscountApplied = localStorage.getItem('launch_discount_applied') === 'true';
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items,
          shippingAddress,
          guestDetails,
          paymentMethod: 'Razorpay',
          couponCode: isLaunchDiscountApplied ? 'FOUNDER10' : undefined
        })
      });
      const data = await res.json();

      if (res.ok) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TWLQzUgvFPgN4h',
          amount: data.razorpayOrder.amount,
          currency: data.razorpayOrder.currency,
          name: 'Biomen Labs',
          description: 'Protocol Purchase',
          order_id: data.razorpayOrder.id,
          handler: async function (response) {
            setLoading(true);
            setLoadingState('verifying');
            try {
              const verifyRes = await fetch(`${API_URL}/orders/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              const verifyData = await verifyRes.json();

              if (verifyRes.ok) {
                setSuccessOrder(verifyData.order);
                clearCart();
                window.scrollTo(0, 0);

                // If user logged in and address was new, optionally update their address in background
                if (token && user && (!user.shippingAddress || user.shippingAddress.street !== street)) {
                  fetch(`${API_URL}/auth/address`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(shippingAddress)
                  }).catch(console.error);
                }
              } else {
                setError(verifyData.error || 'Payment verification failed.');
              }
            } catch (verifyErr) {
              setError('Server connection failed during verification.');
            } finally {
              setLoading(false);
              setLoadingState('');
            }
          },
          prefill: {
            name: user ? user.name : guestName,
            email: user ? user.email : guestEmail,
            contact: user ? user.phone : guestPhone
          },
          theme: {
            color: '#16C784'
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setLoadingState('');
              setError('Payment cancelled by user.');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          setError(`Payment failed: ${response.error.description}`);
          setLoading(false);
          setLoadingState('');
        });
        rzp.open();
      } else {
        setError(data.error || 'Failed to place order.');
        setLoading(false);
        setLoadingState('');
      }
    } catch (err) {
      setError('Server connection failure. Please try again.');
      setLoading(false);
      setLoadingState('');
    }
    === END LEGACY CODE === */
  };

  if (loading && (loadingState === 'initiating' || loadingState === 'verifying')) {
    return (
      <div className="bg-biomen-bg-primary min-h-screen text-biomen-text-primary pt-[176px] md:pt-[144px] pb-24 px-6 md:px-20 flex items-center justify-center">
        <div className="max-w-xl w-full bg-gradient-to-b from-white/5 to-transparent border border-[#0FA36B] p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-biomen-accent/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="bg-biomen-surface p-6 rounded-full border border-biomen-accent/20 text-biomen-accent inline-block mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-t-[#16C784] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ margin: '-2px' }} />
            <img 
              src="/logo/logo_white_symbol.webp" 
              alt="Biomen Labs Logo" 
              className="w-12 h-12 object-contain animate-[spin_4s_linear_infinite]"
            />
          </div>
          
          <h1 className="text-4xl font-black uppercase tracking-tight text-biomen-text-primary mb-2">
            {loadingState === 'verifying' ? 'Confirming Order...' : 'Securing Protocol...'}
          </h1>
          <p className="text-biomen-accent font-mono font-bold tracking-widest text-xs uppercase mb-8">
            {loadingState === 'verifying' ? 'Verifying transaction with payment gateway' : 'Initializing secure checkout session'}
          </p>

          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/10 rounded-2xl p-6 text-left space-y-4">
            <h3 className="text-biomen-gold font-black uppercase text-xs tracking-wider text-center">Do Not Close This Window</h3>
            <p className="text-xs text-biomen-text-primary leading-relaxed font-semibold text-center">
              Please do not hit the back button, refresh the page, or close this window. Your vitality protocol is being secured.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (successOrder) {
    return (
      <div className="bg-biomen-bg-primary min-h-screen text-biomen-text-primary pt-[176px] md:pt-[144px] pb-24 px-6 md:px-20 flex items-center justify-center">
        <div className="max-w-xl w-full bg-gradient-to-b from-white/5 to-transparent border border-[#0FA36B] p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-biomen-accent/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="bg-biomen-surface p-6 rounded-full border border-biomen-accent/20 text-biomen-accent inline-block mb-8">
            <CheckCircle2 size={48} />
          </div>
          
          <h1 className="text-4xl font-black uppercase tracking-tight text-biomen-text-primary mb-2">Order Confirmed!</h1>
          <p className="text-biomen-accent font-mono font-bold tracking-widest text-xs uppercase mb-8">
            Order Reference: #{successOrder._id}
          </p>

          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/10 rounded-2xl p-6 text-left space-y-4 mb-8">
            <h3 className="text-biomen-gold font-black uppercase text-xs tracking-wider">Delivery Breakdown</h3>
            <p className="text-xs text-biomen-text-primary leading-relaxed font-semibold">
              Preparing premium cGMP batch extracts. Tracking link will be dispatched to <strong className="text-biomen-text-primary">{successOrder.user ? user?.email : successOrder.guestDetails?.email}</strong>.
            </p>
            <div className="pt-4 border-t border-biomen-text-primary/5 flex justify-between text-xs font-black uppercase text-biomen-text-primary">
              <span>Total Paid</span>
              <span className="text-emerald-400">₹{successOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="btn-sweep w-full py-[18px] bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02]"
          >
            Return to Home Protocol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-biomen-bg-primary min-h-screen text-biomen-text-primary pt-[176px] md:pt-[144px] pb-24 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-biomen-surface/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link to="/" className="flex items-center gap-2 text-biomen-text-secondary hover:text-biomen-text-primary transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-16 leading-none">
          SECURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3]">CHECKOUT</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Toggles if not logged in */}
            {!user && (
              <div className="grid grid-cols-3 gap-2 bg-biomen-bg-primary/40 border border-biomen-text-primary/10 p-1.5 rounded-2xl">
                <button 
                  onClick={() => { setMode('guest'); setError(''); }}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'guest' ? 'bg-biomen-surface text-biomen-accent border border-[#0FA36B]/20' : 'text-biomen-text-secondary hover:text-biomen-text-primary'}`}
                >
                  Guest Checkout
                </button>
                <button 
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-biomen-surface text-biomen-accent border border-[#0FA36B]/20' : 'text-biomen-text-secondary hover:text-biomen-text-primary'}`}
                >
                  Account Login
                </button>
                <button 
                  onClick={() => { setMode('register'); setError(''); }}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'register' ? 'bg-biomen-surface text-biomen-accent border border-[#0FA36B]/20' : 'text-biomen-text-secondary hover:text-biomen-text-primary'}`}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-xs font-bold text-red-500 uppercase tracking-wide text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Sub-form based on mode */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-8 rounded-3xl space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold flex items-center gap-2">
                  <LogIn size={16} /> Sign In to Your Account
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="PASSWORD" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-sweep w-full py-[18px] bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : 'Authenticate'}
                </button>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-8 rounded-3xl space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold flex items-center gap-2">
                  <UserPlus size={16} /> Create Customer Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="FULL NAME" 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    onBlur={(e) => handleEmailBlur(e.target.value, regName)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="PHONE NUMBER" 
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="CREATE PASSWORD" 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-sweep w-full py-[18px] bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : 'Register Profile'}
                </button>
              </form>
            )}

            {user && (
              <div className="bg-biomen-surface/30 border border-[#0FA36B]/20 p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-biomen-accent" size={20} />
                  <div>
                    <div className="font-bold text-biomen-text-primary uppercase text-xs tracking-wider">Signed in as {user.name}</div>
                    <div className="text-[10px] text-biomen-text-secondary font-mono">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] font-black uppercase text-biomen-copper hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut size={12} /> Log Out
                </button>
              </div>
            )}

            {/* Direct Checkout Order Details / Address Form */}
            {(mode === 'guest' || user) && (
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                
                {/* Guest Personal Fields */}
                {!user && (
                  <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-8 rounded-3xl space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold">
                      1. Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        placeholder="FULL NAME" 
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="EMAIL ADDRESS" 
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        onBlur={(e) => handleEmailBlur(e.target.value, guestName)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                      <input 
                        type="tel" 
                        placeholder="PHONE NUMBER" 
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Shipping Details */}
                <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-8 rounded-3xl space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold">
                    {user ? '1. Shipping Address' : '2. Shipping Address'}
                  </h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="STREET ADDRESS" 
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                      required
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <input 
                        type="text" 
                        placeholder="CITY" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="STATE" 
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="PIN CODE" 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="COUNTRY" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-4 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-mono font-bold uppercase tracking-widest"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Payment CTA */}
                <button 
                  type="submit" 
                  disabled={loading || items.length === 0}
                  className="btn-sweep w-full py-5 px-6 bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary font-black text-xl uppercase tracking-widest rounded-xl transition-all shadow-[0_0_35px_rgba(216,90,31,0.25)] flex items-center justify-center gap-3 hover:scale-[1.02] duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : `COMPLETE TRANSACTION (₹${Math.max(0, localStorage.getItem('launch_discount_applied') === 'true' ? Math.round(subtotal * 0.90) : subtotal).toLocaleString('en-IN')})`}
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Cart items & Gifts recap (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-biomen-bg-secondary/90 border border-biomen-text-primary/10 p-8 rounded-[2.5rem]">
              <h2 className="text-xl font-black text-biomen-text-primary uppercase tracking-wider mb-6 pb-4 border-b border-white/15">Order Details</h2>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
                {items.length === 0 ? (
                  <p className="text-xs text-biomen-text-secondary uppercase tracking-wider">No products added yet.</p>
                ) : (
                  items.map(item => (
                    <div key={`${item.id}-${item.isSubscription}`} className="flex justify-between items-center bg-biomen-bg-primary/40 border border-biomen-text-primary/5 p-4 rounded-xl">
                      <div className="text-left">
                        <h4 className="text-xs font-black text-biomen-text-primary uppercase tracking-wider leading-relaxed">{item.title}</h4>
                        <div className="text-[10px] text-biomen-accent font-bold uppercase tracking-wider mt-0.5">Quantity: {item.quantity}</div>
                      </div>
                      <span className="text-xs font-black text-biomen-text-primary font-mono">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Total calculations */}
              <div className="pt-4 border-t border-white/15 space-y-3 font-mono text-xs uppercase text-biomen-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-biomen-text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
                {localStorage.getItem('launch_discount_applied') === 'true' && (
                  <div className="flex justify-between text-biomen-accent">
                    <span>Launch Discount (FOUNDER10)</span>
                    <span>-₹{Math.round(subtotal * 0.10).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-biomen-accent">FREE</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-biomen-text-primary/10 font-sans text-lg font-black text-biomen-text-primary">
                  <span>Total Due</span>
                  <span className="text-biomen-accent">
                    ₹{Math.max(0, localStorage.getItem('launch_discount_applied') === 'true' ? Math.round(subtotal * 0.90) : subtotal).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Free gifts list */}
            {items.length > 0 && (
              <div className="bg-biomen-surface/30 border border-[#0FA36B]/20 p-6 rounded-3xl space-y-4 text-left">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-gold flex items-center gap-1.5">
                  🎁 FREE PROTOCOL ADDONS INCLUDED
                </h3>
                <ul className="text-[9px] font-black uppercase tracking-wider text-biomen-text-primary space-y-2">
                  <li className="flex justify-between items-center bg-biomen-bg-primary/30 p-2.5 border border-biomen-text-primary/5 rounded-lg">
                    <span>• TRAVEL TIN CONTAINER</span>
                    <span className="text-biomen-accent">FREE</span>
                  </li>
                  <li className="flex justify-between items-center bg-biomen-bg-primary/30 p-2.5 border border-biomen-text-primary/5 rounded-lg">
                    <span>• 90-DAY VITALITY RESET JOURNAL</span>
                    <span className="text-biomen-accent">FREE</span>
                  </li>
                  <li className="flex justify-between items-center bg-biomen-bg-primary/30 p-2.5 border border-biomen-text-primary/5 rounded-lg">
                    <span>• WORKOUT TRACKER APP KEY</span>
                    <span className="text-biomen-accent">FREE</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Guarantee and Shipping stats */}
            <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary">
              <div className="bg-biomen-bg-primary/30 border border-biomen-text-primary/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
                <Truck size={18} className="text-biomen-accent" />
                <span>SHIPS WITHIN 24H</span>
              </div>
              <div className="bg-biomen-bg-primary/30 border border-biomen-text-primary/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
                <ShieldCheck size={18} className="text-biomen-accent" />
                <span>90-DAY CONFIDENCE</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
