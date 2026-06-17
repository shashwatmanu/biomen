import React, { useEffect, useState, useRef } from 'react';
import { Calendar, ShieldCheck, Award, MessageSquare, BookOpen, Check, ArrowRight } from 'lucide-react';
import Footer from '../components/shared/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StandardCard = ({ std }) => {
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((centerY - y) / centerY) * 4;
    const rotateYVal = ((x - centerX) / centerX) * 4;
    e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
    e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-[1.5px] rounded-[2rem] overflow-hidden transition-all duration-500 bg-white/5 shadow-2xl group/spotlight h-full"
      style={{
        transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        transition: 'transform 0.2s ease-out, background 0.3s ease'
      }}
    >
      {/* Spotlight border glow layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
        }}
      />

      {/* Inner card container */}
      <div className="w-full h-full rounded-[1.95rem] overflow-hidden bg-gradient-to-br from-[#06110C] to-black/45 p-8 relative z-10 flex flex-col justify-between">
        {/* Background inner glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.08), transparent 80%)`
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="bg-[#052E22] p-3 rounded-2xl w-fit text-[#16C784] border border-[#0FA36B]/20 transition-transform duration-500 group-hover/spotlight:scale-105">
            {std.icon}
          </div>
          <h3 className="text-xl font-black text-[#F4F6F2] uppercase tracking-wider">
            {std.title}
          </h3>
          <p className="text-sm text-[#A8B3AA] leading-relaxed font-medium">
            {std.desc}
          </p>
        </div>
      </div>
    </div>
  );
};const FormField = ({ label, children }) => {
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="space-y-1.5 w-full text-left">
      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block pl-1">{label}</label>
      <div 
        onMouseMove={handleMouseMove}
        className="relative p-[1px] rounded-xl overflow-hidden bg-white/10 transition-all duration-300 group/input-spotlight focus-within:bg-[#16C784]"
      >
        {/* Spotlight border glow layer */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/input-spotlight:opacity-100 group-focus-within/input-spotlight:opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
          }}
        />
        <div className="w-full h-full rounded-[11px] overflow-hidden relative z-10 bg-[#030705] focus-within:bg-[#06110c] transition-colors duration-300">
          {children}
        </div>
      </div>
    </div>
  );
};

const Doctor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.from(".reveal-line-scroll", {
      y: "115%",
      duration: 1.2,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".reveal-parent-scroll",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    primaryConcern: 'Energy & Fatigue',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    if (window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((centerY - y) / centerY) * 5;
      const rotateYVal = ((x - centerX) / centerX) * 5;
      e.currentTarget.style.setProperty('--rotate-x', `${rotateXVal}deg`);
      e.currentTarget.style.setProperty('--rotate-y', `${rotateYVal}deg`);
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  const advisors = [
    {
      name: "Dr. Keshav Dev, BAMS, MD (Ayurveda)",
      role: "Chief Ayurvedic Formulary Director",
      experience: "25+ Years of Clinical Practice",
      specialization: "Rasayana (Rejuvenation) & Male Vitality Systems",
      bio: "An alumnus of India's premier Ayurvedic institutions, Dr. Keshav Dev has spent over two decades researching botanical bio-availability. He oversees our extraction processes to ensure T-CORE's five active ingredients maintain clinical clinical synergy.",
      credentials: ["BAMS (Bachelor of Ayurvedic Medicine & Surgery)", "MD in Dravyaguna (Ayurvedic Pharmacology)", "Former Senior Consultant at National Institute of Ayurveda", "Published Author of 12 Peer-Reviewed Botanical Research Papers"]
    }
  ];

  const standards = [
    {
      title: "Shastra & Science",
      desc: "We extract according to classical Rasayana protocols, then validate every batch using modern high-performance liquid chromatography (HPLC) to verify active ingredient concentrations.",
      icon: <BookOpen size={24} />
    },
    {
      title: "AYUSH Certified",
      desc: "Compounded under the strict guidelines of the Ministry of AYUSH, ensuring classical Ayurvedic integrity, safety standards, and complete botanical purity.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "No Hidden Blends",
      desc: "We completely reject proprietary secrets. Every milligram of Ashwagandha, Shilajit, Tongkat Ali, Fenugreek, and Black Pepper is declared with full dosage transparency.",
      icon: <Award size={24} />
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#030705] text-[#F4F6F2] font-manrope pt-[176px] md:pt-[144px] min-h-screen">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#052E22]/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-[#0FA36B]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#16C784] bg-[#052E22] px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block mb-4">
            CLINICAL HERITAGE & AYURVEDA
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6 reveal-parent-scroll">
            <span className="block overflow-hidden relative">
              <span className="reveal-line-scroll block">Clinical Ayurvedic</span>
            </span>
            <span className="block overflow-hidden relative">
              <span className="reveal-line-scroll block text-[#0FA36B]">Performance Wisdom</span>
            </span>
          </h1>
          <p className="text-[#A8B3AA] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            BIOMEN combines classical Ayurvedic rasayana principles with validated modern extraction science, overseen by leading medical experts.
          </p>
        </div>

        {/* Advisor Profile */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative p-[1.5px] rounded-[3.05rem] overflow-hidden transition-all duration-500 bg-white/5 shadow-2xl group/spotlight mb-24"
          style={{
            transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
            transition: 'transform 0.2s ease-out, background 0.3s ease'
          }}
        >
          {/* Spotlight border glow layer */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.45), transparent 85%)`
            }}
          />

          {/* Inner Card container */}
          <div className="w-full h-full rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#06110C] to-black/45 p-8 md:p-16 relative z-10">
            {/* Background inner glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
              style={{
                background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(22, 199, 132, 0.08), transparent 80%)`
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left side: Doctor Image Showcase */}
              <div className="lg:col-span-5 relative group">
                <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-gradient-to-br from-[#052E22] to-[#030705] rounded-[2rem] border border-[#0FA36B]/20 overflow-hidden relative shadow-2xl">
                  <img 
                    src="/doc.webp" 
                    alt="Dr. Keshav Dev" 
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right side: Advisor Details */}
              <div className="lg:col-span-7 space-y-6">
                {advisors.map((adv, idx) => (
                  <div key={idx} className="space-y-6">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#BFA46A]">
                        Advisory Director
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-1">
                        {adv.name}
                      </h2>
                      <p className="text-sm font-bold text-[#16C784] uppercase tracking-wider mt-1">
                        {adv.role} | {adv.experience}
                      </p>
                    </div>

                    <p className="text-[#A8B3AA] text-base leading-relaxed font-medium border-l-2 border-[#0FA36B] pl-4">
                      {adv.bio}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#F4F6F2]">
                        Expert Credentials & Background
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#A8B3AA] font-semibold">
                        {adv.credentials.map((cred, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <Check size={14} className="text-[#16C784] shrink-0 mt-0.5" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#16C784]">
              FORMULATION PROTOCOLS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-2">
              Our Clinical Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {standards.map((std, i) => (
              <StandardCard key={i} std={std} />
            ))}
          </div>
        </div>

        {/* Interactive Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#06110C] border border-[#0FA36B]/20 rounded-[3rem] p-8 md:p-16 shadow-2xl items-stretch mb-24">
          
          {/* Form Side Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#16C784] bg-[#052E22] px-3 py-1 rounded-full border border-[#0FA36B]/20">
                PERSONALIZED PROTOCOL
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-4 tracking-tight leading-[1.1]">
                Ask Our Advisory Team
              </h2>
              <p className="text-sm text-[#A8B3AA] mt-4 leading-relaxed font-medium">
                Want to align T-CORE with your existing diet, Ayurvedic body type, or exercise regime? Fill out the consultation request below. Dr. Keshav Dev's assistant team will reply within 48 business hours with a tailored consistency schedule.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/5 pt-6 text-xs text-[#A8B3AA] font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#16C784]" />
                <span>100% Confidential Professional Communication</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#16C784]" />
                <span>Customised 90-Day Guidebook Included</span>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-3xl p-6 md:p-10 flex flex-col justify-center">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="bg-[#052E22] p-4 rounded-full border border-[#0FA36B]/20 text-[#16C784] w-fit mx-auto shadow-xl">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#A8B3AA] max-w-md mx-auto">
                  Thank you. Your details have been submitted securely to our clinical research team. Please check your inbox at <strong>{formData.email}</strong> within 48 hours for your bespoke T-CORE guidance document.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-black uppercase text-[#BFA46A] tracking-wider hover:text-white underline underline-offset-4"
                >
                  Submit Another Consultation Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name">
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </FormField>
                  <FormField label="Email Address">
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. rahul@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Mobile Phone">
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </FormField>
                  <FormField label="Primary Wellness Goal">
                    <select 
                      value={formData.primaryConcern}
                      onChange={(e) => setFormData({...formData, primaryConcern: e.target.value})}
                      className="w-full bg-transparent px-4 py-3 text-sm text-[#A8B3AA] focus:outline-none cursor-pointer"
                    >
                      <option value="Energy & Fatigue" className="bg-[#030705]">Energy & Stamina</option>
                      <option value="Stress & Resilience" className="bg-[#030705]">Stress Resilience</option>
                      <option value="Workout Recovery" className="bg-[#030705]">Workout Recovery</option>
                      <option value="Hormonal Baseline Support" className="bg-[#030705]">Daily Consistency</option>
                    </select>
                  </FormField>
                </div>

                <FormField label="Your Wellness Question / Medical Background Notes">
                  <textarea 
                    rows={4}
                    placeholder="Provide details about your daily schedule, workout habits, or specific hormonal questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent p-4 text-sm text-white focus:outline-none resize-none"
                  />
                </FormField>

                <button 
                  type="submit"
                  className="btn-sweep w-full py-4 bg-[#D85A1F] text-[#F4F6F2] font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#b94a17] transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  Send Consultation Request <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Doctor;
