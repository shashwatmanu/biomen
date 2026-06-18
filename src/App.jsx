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
import Navbar from './components/home/Navbar';
import PromoBar from './components/home/PromoBar';
import CartDrawer from './components/shared/CartDrawer';
import EntryPopup from './components/shared/EntryPopup';
import BotanicalParticles from './components/shared/BotanicalParticles';

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



  // Centralized dynamic SEO metadata update protocol
  useEffect(() => {
    let title = "BIOMEN LABS® | T-CORE Premium Masculine Vitality Support";
    let desc = "BIOMEN LABS® T-CORE is a premium clinical herbal formula built to support daily vitality, testosterone baseline rhythm, stress resilience, and masculine recovery. Proudly Made in India.";
    
    switch (location.pathname) {
      case '/':
        title = "BIOMEN LABS® | T-CORE Premium Masculine Vitality Support";
        desc = "BIOMEN LABS® T-CORE is a premium clinical herbal formula built to support daily vitality, testosterone baseline rhythm, stress resilience, and masculine recovery. Proudly Made in India.";
        break;
      case '/products/t-core':
        title = "T-CORE Daily Masculine Vitality Support | BIOMEN LABS®";
        desc = "Shop T-CORE by BIOMEN LABS. A focused 5-ingredient clinical formula supporting daily energy, physical performance, and consistency.";
        break;
      case '/science':
        title = "Science, Ingredients & Clinical Stack | BIOMEN LABS®";
        desc = "Discover the science behind the T-CORE stack: KSM-66 Ashwagandha, Shilajit, Tongkat Ali, Fenugreek, and Piperine. Backed by clinical research.";
        break;
      case '/reviews':
        title = "Customer Reviews & Real Shifts | BIOMEN LABS®";
        desc = "Read authentic reviews and transformation results from customers using the T-CORE daily vitality system.";
        break;
      case '/about':
        title = "Our Story, Quality & Sourcing Philosophy | BIOMEN LABS®";
        desc = "Learn about the mission, values, and strict testing standards behind BIOMEN LABS and our masculine health products.";
        break;
      case '/faq':
        title = "Help Desk & Frequently Asked Questions | BIOMEN LABS®";
        desc = "Got questions about T-CORE dosage, shipping, side effects, or safety? Read our comprehensive FAQ list.";
        break;
      case '/contact':
        title = "Contact Support & Help Desk | BIOMEN LABS®";
        desc = "Contact the BIOMEN LABS customer support team for inquiries, order updates, or consultation booking assistance.";
        break;
      case '/consultation':
        title = "Doctor Consultation & Advisory | BIOMEN LABS®";
        desc = "Book a consultation with certified Ayurvedic and health experts at BIOMEN LABS for personalized wellness guidance.";
        break;
      case '/terms':
        title = "Terms & Conditions of Service | BIOMEN LABS®";
        desc = "Review the official Terms and Conditions of service governing the use of the BIOMEN LABS platform and product ordering.";
        break;
      case '/privacy':
        title = "Privacy Policy & Information Security | BIOMEN LABS®";
        desc = "Your data safety matters. Read our Privacy Policy to understand how BIOMEN LABS collects, stores, and protects your information.";
        break;
      case '/refunds':
        title = "Refund & Cancellation Policy | BIOMEN LABS®";
        desc = "Read our 90-day money-back guarantee, refund processes, and order cancellation terms at BIOMEN LABS.";
        break;
      case '/shipping':
        title = "Shipping & Delivery Protocols | BIOMEN LABS®";
        desc = "Find details on domestic shipping rates, dispatch timelines, and delivery estimates for your BIOMEN LABS orders.";
        break;
      case '/disclaimer':
        title = "Medical & General Disclaimer | BIOMEN LABS®";
        desc = "Read the official medical disclaimers regarding BIOMEN LABS products and general wellness information.";
        break;
      default:
        break;
    }

    document.title = title;
    
    // Update description meta tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = desc;
      document.head.appendChild(newMeta);
    }
    
    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const fullUrl = `https://www.biomenlabs.com${location.pathname}`;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullUrl);
    } else {
      const newLink = document.createElement('link');
      newLink.rel = "canonical";
      newLink.href = fullUrl;
      document.head.appendChild(newLink);
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#030705] min-h-[100dvh] relative overflow-x-hidden">
      {!isAdminPage && <BotanicalParticles />}
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
