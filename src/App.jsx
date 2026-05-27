import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PDP from './pages/PDP';
import Science from './pages/Science';
import Reviews from './pages/Reviews';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Doctor from './pages/Doctor';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/home/Navbar';
import PromoBar from './components/home/PromoBar';
import CartDrawer from './components/shared/CartDrawer';
import EntryPopup from './components/shared/EntryPopup';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef();

  return (
    <div className="bg-black min-h-screen relative">
      <div className="fixed top-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-md">
        <PromoBar />
        <Navbar />
      </div>
      
      {/* 3D Canvas removed from global scope to fix homepage overlap issue */}
      <main ref={container} className="relative w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/t-core" element={<PDP />} />
          <Route path="/science" element={<Science />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ayurvedic-doctor" element={<Doctor />} />
        </Routes>
      </main>

      <CartDrawer />
      <EntryPopup />
    </div>
  );
}

export default App;
