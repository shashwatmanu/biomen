import React from 'react';
import { ArrowRight, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const badgeRef = React.useRef(null);

  const handleBadgeMouseMove = (e) => {
    if (!badgeRef.current) return;
    const card = badgeRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    const rotateX = -normalizedY * 28; 
    const rotateY = normalizedX * 28;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleBadgeMouseLeave = () => {
    if (!badgeRef.current) return;
    gsap.to(badgeRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6
    });
  };

  useGSAP(() => {
    // Elegant mask reveal animation for the headlines
    gsap.fromTo(".reveal-line", 
      { y: "115%" },
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out"
      }
    );

    // Liquid background position sweep
    gsap.fromTo([".liquid-reveal", ".liquid-reveal-accent"],
      { backgroundPosition: "200% center" },
      {
        backgroundPosition: "-200% center",
        duration: 2.2,
        ease: "power2.out",
        delay: 0.1,
        stagger: 0.15
      }
    );

    // Fade-in animation for other elements (staggered)
    gsap.from(".hero-fade-in", {
      opacity: 0,
      y: 15,
      duration: 1.0,
      stagger: 0.1,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.fromTo(badgeRef.current,
      {
        scale: 0.8,
        opacity: 0,
        rotation: 12
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 12,
        duration: 1,
        delay: 0.7,
        ease: "back.out(1.7)"
      }
    );

    // Defer ScrollTrigger layout calculations slightly to reduce TBT on initial load (desktop only)
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        // Parallax scrolling for the desktop hero background image
        gsap.fromTo(".hero-parallax-bg-desktop",
          { yPercent: 0 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          }
        );

        // Parallax scrolling for the text column
        gsap.fromTo(".hero-text-col",
          { y: 0 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          }
        );

        // Parallax scrolling for the stamp badge
        if (badgeRef.current) {
          gsap.fromTo(badgeRef.current,
            { y: 0 },
            {
              y: -80,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      }, 150);
    }
  }, []);

  return (
    <section className="hero-section relative w-full min-h-[100dvh] lg:min-h-[580px] xl:min-h-[640px] flex flex-col justify-between px-4 sm:px-6 md:px-20 overflow-hidden bg-[#030705] pt-[95px] lg:pt-[135px] pb-4 lg:pb-6" id="hero">

      {/* Full-Bleed Background Image with Premium Seamless Parallax Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/Heroport.webp"
          alt="T-CORE Luxury Vitality Mobile"
          className="block lg:hidden w-full h-full object-cover filter brightness-[1.14] contrast-[1.04] animate-fade-in"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            objectPosition: '62% -5%',
            transform: 'translateY(-55px) translateZ(0)'
          }}
        />
        {/* Desktop Background: High-resolution webp for crispness on laptop/retina screens */}
        <img
          src="/herodesktop.webp"
          alt="T-CORE Luxury Vitality Desktop"
          className="hero-parallax-bg-desktop absolute inset-0 w-full h-[104%] object-cover filter brightness-[1.05] contrast-[1.04] object-[center_42%] hidden lg:block"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
        {/* Competitor-inspired ultra-smooth, wide horizontal gradient mask */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#030705] via-[#030705]/95 to-transparent z-10" />
        {/* Mobile vertical gradient overlay for maximum readability without making the jar dull */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent lg:hidden z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#030705] via-[#030705]/90 to-transparent lg:hidden z-10" />
      </div>

      {/* Floating Luxury Stamp Sticker Badge (Desktop only) with 3D Tilt handlers */}
      <div
        className="hidden lg:flex absolute right-[10%] top-[33%] z-40 select-none animate-bounce-slow"
      >
        <div
          ref={badgeRef}
          onMouseMove={handleBadgeMouseMove}
          onMouseLeave={handleBadgeMouseLeave}
          className="relative w-32 h-32 rounded-full border border-dashed border-[#16C784]/40 bg-[#030705]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center shadow-2xl cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="text-[#16C784] font-black text-[9px] uppercase tracking-widest mb-0.5" style={{ transform: 'translateZ(12px)' }}>100% PURE</div>
          <div className="text-white font-serif italic text-sm font-medium" style={{ transform: 'translateZ(18px)' }}>Ayurvedic</div>
          <div className="text-[#A8B3AA] font-black text-[8px] uppercase tracking-wider mt-0.5" style={{ transform: 'translateZ(12px)' }}>&bull; transparent &bull;</div>
          <div className="absolute -top-1 -right-1 bg-[#B84714] text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-full shadow-md uppercase tracking-wider" style={{ transform: 'translateZ(24px)' }}>
            GLASS JAR
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY HERO LAYOUT (Symmetrical D2C Flow: Headline pushed high up, CTA pushed low down, center open for background Jar) */}
      <div className="flex lg:hidden flex-col justify-between flex-1 w-full max-w-xl mx-auto relative z-20 pt-1 pb-1 text-center">
        {/* Top Block: Ratings and Headline pushed high up */}
        <div className="space-y-3 pt-1 shrink-0">
          {/* Ratings & Reviews */}
          <div className="flex flex-col items-center gap-1 hero-fade-in">
            <div className="flex text-[#D85A1F]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#A8B3AA]">
              4.9/5 RATING &bull; OVER 500 VERIFIED EXPERIENCES
            </span>
          </div>

          {/* Headline - Sexier, uppercase editorial style, slightly more compact */}
          <h1 className="text-[1.55rem] xs:text-[1.75rem] sm:text-[2.1rem] font-normal font-serif tracking-tight leading-[1.1] text-white uppercase max-w-xl mx-auto">
            <span className="block overflow-hidden pb-1">
              <span className="reveal-line inline-block">Daily Vitality</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-line inline-block">for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C784] to-[#7FE7B3] italic font-medium pr-2">Modern Indian Man</span></span>
            </span>
          </h1>
        </div>

        {/* Flexible Center Spacer: Leaves center open to perfectly frame the bright glass jar visual behind it! */}
        <div className="flex-1 min-h-[160px] xs:min-h-[220px] sm:min-h-[280px] pointer-events-none" />

        {/* Bottom Block: CTA Button and Guarantee pushed all the way down with gorgeous margins */}
        <div className="space-y-3.5 pb-1 shrink-0">
          {/* Minimal punchy description restored and jar pushed higher so it doesn't overlap */}
          <p className="text-xs xs:text-sm text-[#A8B3AA] font-semibold leading-relaxed max-w-[290px] xs:max-w-xs mx-auto filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] hero-fade-in">
            5 clinical-grade Ayurvedic extracts for daily energy, drive, and recovery.
          </p>

          {/* Full-width premium Orange CTA Button with breathing space */}
          <div className="px-2 hero-fade-in">
            <Link
              to="/products/t-core"
              className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-8 py-[20px] rounded-full font-black text-xs xs:text-sm uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 hover:scale-[1.02] duration-300 w-full btn-sweep"
            >
              UNLOCK YOUR SYSTEM <ArrowRight size={15} />
            </Link>
          </div>

          {/* Micro-trust Line */}
          <div className="flex items-center justify-center gap-2 text-[10.5px] sm:text-xs text-[#A8B3AA] font-black uppercase tracking-wider pt-1 hero-fade-in">
            <Shield size={13} className="text-[#16C784] shrink-0" />
            <span>TRY IT FOR 90 DAYS. HIGHER VITALITY OR YOUR MONEY BACK.</span>
          </div>
        </div>
      </div>

      {/* DESKTOP-ONLY HERO LAYOUT (Restored to elegant serif styles as requested) */}
      <div className="hidden lg:block max-w-7xl mx-auto w-full relative z-20 my-auto">
        <div className="grid grid-cols-12 gap-12 items-center">

          {/* Left Column: Clean Solid Editorial Text Canvas */}
          <div className="hero-text-col col-span-8 xl:col-span-7 space-y-6 text-left relative max-w-2xl">

            {/* Verified Rating Badge */}
            <div className="flex items-center gap-2 hero-fade-in">
              <div className="flex text-[#D85A1F]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A8B3AA]">
                4.9/5 RATING &bull; OVER 500 VERIFIED EXPERIENCES
              </span>
            </div>

            {/* Headline - Restored to previous elegant serif weight with Liquid Shimmer text reveal */}
            <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-normal font-serif tracking-tight leading-[1.05] uppercase">
              <span className="block overflow-hidden pb-1">
                <span className="reveal-line inline-block liquid-reveal">Daily Vitality for the</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-line inline-block liquid-reveal-accent italic font-medium pr-4">Modern</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-line inline-block liquid-reveal">Indian Man</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-[#A8B3AA] font-medium leading-relaxed max-w-xl hero-fade-in">
              T-CORE is a premium, clinical-grade daily vitality system built to support energy, drive, and post-workout recovery. Packaged in a collectible glass jar.
            </p>

            {/* Luxury Support Strip */}
            <div className="flex flex-wrap gap-2 pt-1 text-[9px] font-black uppercase tracking-widest text-[#7FE7B3]/90 hero-fade-in">
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16C784]"></span> Transparent Dosing
              </span>
              <span className="flex items-center gap-1 bg-black/65 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16C784]"></span> Vegetarian Capsules
              </span>
              <span className="flex items-center gap-1 bg-[#052E22]/75 border border-[#0FA36B]/25 px-3.5 py-2 rounded-lg text-white backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA46A]"></span> Made in India
              </span>
            </div>

            {/* Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 hero-fade-in">
              <Link
                to="/products/t-core"
                className="bg-[#D85A1F] hover:bg-[#b94a17] text-white px-12 py-[22px] rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(216,90,31,0.45)] flex items-center justify-center gap-2 hover:scale-[1.03] duration-300 w-full sm:w-auto btn-sweep"
              >
                UNLOCK YOUR SYSTEM <ArrowRight size={16} />
              </Link>
              <Link
                to="/science"
                className="border-2 border-white/20 text-white px-12 py-[22px] rounded-full font-black hover:bg-white/5 hover:border-white/40 hover:scale-[1.03] transition-all backdrop-blur-md flex items-center justify-center text-sm duration-300 w-full sm:w-auto btn-sweep"
              >
                Explore T-CORE Science
              </Link>
            </div>

            {/* Risk-Free Micro-trust Line */}
            <div className="flex items-center gap-2.5 text-xs xl:text-[13px] text-[#A8B3AA] font-black uppercase tracking-wider pt-2.5 pb-4 hero-fade-in">
              <Shield size={14} className="text-[#16C784] shrink-0" />
              <span>TRY IT FOR 90 DAYS. HIGHER VITALITY OR YOUR MONEY BACK.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Featured In Logos Trust Strip (Infinite Marquee) */}
      <div className="max-w-7xl mx-auto w-full relative z-20 border-t border-white/5 pt-4 mt-auto flex items-center overflow-hidden text-[10px] font-black tracking-widest text-[#A8B3AA]">
        <div className="flex items-center gap-4 shrink-0 bg-[#030705] pr-6 relative z-30">
          <span className="text-[#A8B3AA]/85 font-black uppercase tracking-[0.2em] whitespace-nowrap">FEATURED IN</span>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-16">
            {/* First Set of Logos */}
            <img src="/logo_ani.webp" alt="ANI" width={86} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_tribune.webp" alt="The Tribune" width={100} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_theprint.webp" alt="ThePrint" width={130} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_indiacsr.webp" alt="indiaCSR" width={75} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_businessweek.webp" alt="Bloomberg BusinessWeek" width={114} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />

            {/* Second Set of Logos (Duplicate for seamless loop - lazy loaded) */}
            <img src="/logo_ani.webp" alt="ANI" loading="lazy" width={86} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_tribune.webp" alt="The Tribune" loading="lazy" width={100} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_theprint.webp" alt="ThePrint" loading="lazy" width={130} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_indiacsr.webp" alt="indiaCSR" loading="lazy" width={75} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_businessweek.webp" alt="Bloomberg BusinessWeek" loading="lazy" width={114} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />

            {/* Third Set of Logos (lazy loaded) */}
            <img src="/logo_ani.webp" alt="ANI" loading="lazy" width={86} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_tribune.webp" alt="The Tribune" loading="lazy" width={100} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_theprint.webp" alt="ThePrint" loading="lazy" width={130} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_indiacsr.webp" alt="indiaCSR" loading="lazy" width={75} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
            <img src="/logo_businessweek.webp" alt="Bloomberg BusinessWeek" loading="lazy" width={114} height={24} className="h-5 md:h-6 object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
