import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProductModel } from './components/ProductModel';
import { Scene } from './components/Scene';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef();
  const modelGroupRef = useRef();

  useGSAP(() => {
    // Fade in HTML elements with premium stagger and easing
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power4.out'
      });
    });
  }, { scope: container });

  return (
    <div ref={container} id="main-container">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Scene>
            <ProductModel container={container} />
          </Scene>
        </Canvas>
      </div>

      {/* HTML Overlays */}
      <div className="overlay-container">
        {/* Stage 1: Hero */}
        <section className="section stage-1">
          <div className="content">
            <h1>THE BIOMEN OPTION.</h1>
            <p>Adaptogenic. Botanical. Vitality. Engineered for men.</p>
            <button className="btn">Unlock Your Potential</button>
          </div>
        </section>

        {/* Stage 2: Formula */}
        <section className="section stage-2">
          <div className="content">
            <h2>Clinically Studied Formula</h2>
            <p>T-Core is crafted for men who expect more. Blending clinically studied herbs with essential micronutrients to support daily vitality.</p>
            <ul className="feature-list">
              <li className="feature-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="feature-icon"><Activity size={24} /></div>
                <div className="feature-text">
                  <h3>Tongkat Ali & Shilajit</h3>
                  <p>Supports natural testosterone levels</p>
                </div>
              </li>
              <li className="feature-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="feature-icon"><Zap size={24} /></div>
                <div className="feature-text">
                  <h3>Vitality & Stamina</h3>
                  <p>Enhanced daily energy reserves</p>
                </div>
              </li>
              <li className="feature-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="feature-icon"><ArrowRight size={24} /></div>
                <div className="feature-text">
                  <h3>Strength Support</h3>
                  <p>Maximize your physical performance</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Stage 3: The Reveal (Capsule focus) */}
        <section className="section stage-3 reveal-focus">
          <div className="content">
            <span className="badge">THE PROTOCOL</span>
            <h2>Pure Potency. Revealed.</h2>
            <p>Every capsule is a masterclass in bio-availability. No fillers, no synthetic binders—just raw, pharmaceutical-grade vitality.</p>
            <div className="ingredient-tags">
              <span className="tag">800mg Tongkat Ali</span>
              <span className="tag">250mg Shilajit</span>
              <span className="tag">Vitamin D3 + K2</span>
            </div>
          </div>
        </section>

        {/* Stage 4: Trust */}
        <section className="section stage-4">
          <div className="content">
            <h2>Uncompromising Quality</h2>
            <p>Manufactured under strict guidelines to ensure purity, potency, and safety. Your health is our priority.</p>
            <ul className="feature-list">
              <li className="feature-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="feature-icon"><CheckCircle2 size={24} color="#a0b8a9" /></div>
                <div className="feature-text">
                  <h3>FSSAI Compliant</h3>
                  <p>Lic No. : 12723055000162</p>
                </div>
              </li>
              <li className="feature-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="feature-icon"><ShieldCheck size={24} color="#a0b8a9" /></div>
                <div className="feature-text">
                  <h3>GMP Certified</h3>
                  <p>Manufactured in a GMP Quality facility</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Stage 5: Checkout */}
        <section className="section stage-5" style={{ justifyContent: 'center', width: '100%', paddingLeft: '0' }}>
          <div className="checkout-module" style={{ margin: '0 auto', transform: 'translateY(20vh)' }}>
            <h2 style={{ textAlign: 'center' }}>Start Your Protocol</h2>
            <p style={{ textAlign: 'center' }}>30 Capsules • 1 Month Supply</p>
            <div className="price" style={{ textAlign: 'center' }}>₹1,499</div>

            <div className="qty-selector">
              <button className="qty-btn">-</button>
              <input type="text" className="qty-input" value="1" readOnly />
              <button className="qty-btn">+</button>
            </div>

            <button className="btn" style={{ width: '100%', background: 'linear-gradient(135deg, #fff 0%, #a0b8a9 100%)' }}>
              Checkout Now
            </button>
            <div className="payment-methods">
              <span>UPI Accepted</span>
              <span>•</span>
              <span>Secure Checkout</span>
            </div>
          </div>
        </section>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <span key={i}>
              ✦ 100% Satisfaction Guarantee &nbsp;
              ✦ Clinically Studied Botanicals &nbsp;
              ✦ GMP Certified Quality &nbsp;
              ✦ Pure Potency &nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
