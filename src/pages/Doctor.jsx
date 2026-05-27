import React, { useEffect, useState } from 'react';
import { Calendar, ShieldCheck, Award, MessageSquare, BookOpen, Check, ArrowRight } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Doctor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      title: "FSSAI & GMP Certified",
      desc: "All formulations are compounded in state-of-the-art, ISO-certified facilities under strict FSSAI compliance to ensure complete purity, safety, and lack of heavy metal contaminants.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "No Hidden Blends",
      desc: "We completely reject proprietary secrets. Every milligram of Ashwagandha, Shilajit, Tongkat Ali, Fenugreek, and Black Pepper is declared with full dosage transparency.",
      icon: <Award size={24} />
    }
  ];

  return (
    <div className="bg-[#030705] text-[#F4F6F2] font-manrope pt-32 min-h-screen">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#052E22]/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-[#0FA36B]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#16C784] bg-[#052E22] px-4 py-1.5 rounded-full border border-[#0FA36B]/20 inline-block mb-4">
            CLINICAL HERITAGE & AYURVEDA
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6">
            Clinical Ayurvedic <br/> <span className="text-[#0FA36B]">Performance Wisdom</span>
          </h1>
          <p className="text-[#A8B3AA] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            BIOMEN combines classical Ayurvedic rasayana principles with validated modern extraction science, overseen by leading medical experts.
          </p>
        </div>

        {/* Advisor Profile */}
        <div className="bg-[#06110C] border border-[#0FA36B]/20 rounded-[3rem] p-8 md:p-16 shadow-2xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Render or Icon Grid */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="aspect-square bg-gradient-to-br from-[#052E22] to-[#030705] rounded-[2rem] border border-[#0FA36B]/20 flex flex-col justify-center items-center p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0FA36B]/10 via-transparent to-transparent opacity-50" />
                <Award size={64} className="text-[#16C784] mb-4" />
                <h3 className="text-2xl font-black text-white uppercase tracking-wider">Ayurvedic Board</h3>
                <p className="text-xs text-[#A8B3AA] mt-2 max-w-xs leading-relaxed">
                  Led by certified doctors dedicated to standardizing ancient botanical extractions for modern male physiology.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="bg-black/40 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    BAMS Certified
                  </span>
                  <span className="bg-black/40 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    MD Ayurveda
                  </span>
                  <span className="bg-black/40 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    FSSAI Aligned
                  </span>
                </div>
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
              <div key={i} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 rounded-3xl space-y-4 hover:border-[#0FA36B]/50 transition-all duration-300">
                <div className="bg-[#052E22] p-3 rounded-2xl w-fit text-[#16C784] border border-[#0FA36B]/20">
                  {std.icon}
                </div>
                <h3 className="text-xl font-black text-[#F4F6F2] uppercase tracking-wider">
                  {std.title}
                </h3>
                <p className="text-sm text-[#A8B3AA] leading-relaxed font-medium">
                  {std.desc}
                </p>
              </div>
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
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#030705] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0FA36B] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. rahul@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#030705] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0FA36B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Mobile Phone</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#030705] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0FA36B] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Primary Wellness Goal</label>
                    <select 
                      value={formData.primaryConcern}
                      onChange={(e) => setFormData({...formData, primaryConcern: e.target.value})}
                      className="w-full bg-[#030705] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#A8B3AA] focus:outline-none focus:border-[#0FA36B] transition-colors"
                    >
                      <option value="Energy & Fatigue">Energy & Stamina</option>
                      <option value="Stress & Resilience">Stress Resilience</option>
                      <option value="Workout Recovery">Workout Recovery</option>
                      <option value="Hormonal Baseline Support">Daily Consistency</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Your Wellness Question / Medical Background Notes</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details about your daily schedule, workout habits, or specific hormonal questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#030705] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#0FA36B] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#D85A1F] text-[#F4F6F2] font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#b94a17] transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
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
