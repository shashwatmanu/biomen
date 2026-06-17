import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// Home is eager — it's the critical first render
import Home from './pages/Home';
// All other pages are lazy-loaded (code-split per-route)
const PDP = lazy(() => import('./pages/PDP'));
const Science = lazy(() => import('./pages/Science'));
const Reviews = lazy(() => import('./pages/Reviews'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Doctor = lazy(() => import('./pages/Doctor'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const ReelMaker = lazy(() => import('./pages/ReelMaker'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Refunds = lazy(() => import('./pages/Refunds'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/home/Navbar';
import PromoBar from './components/home/PromoBar';
import CartDrawer from './components/shared/CartDrawer';
import EntryPopup from './components/shared/EntryPopup';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/temp-reel' || location.pathname === '/unsubscribe';

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Dismiss the inline hero-skeleton once React has mounted
  useEffect(() => {
    const skeleton = document.getElementById('hero-skeleton');
    if (skeleton) {
      skeleton.style.opacity = '0';
      skeleton.style.pointerEvents = 'none';
      const t = setTimeout(() => skeleton.remove(), 420);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="bg-black min-h-[100dvh] relative">
      <div className="film-grain" />
      {!isAdminPage && (
        <div className="fixed top-0 left-0 w-full z-[100] bg-transparent pointer-events-none">
          {location.pathname === '/' && (
            <div className="pointer-events-auto">
              <PromoBar />
            </div>
          )}
          <Navbar />
        </div>
      )}
      
      {/* 3D Canvas removed from global scope to fix homepage overlap issue */}
      <main ref={container} className="relative w-full">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/t-core" element={<PDP />} />
            <Route path="/science" element={<Science />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<Doctor />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/temp-reel" element={<ReelMaker />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminPage && <CartDrawer />}
      {!isAdminPage && <EntryPopup />}
    </div>
  );
}

export default App;
