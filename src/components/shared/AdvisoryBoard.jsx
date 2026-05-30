import React from 'react';

const AdvisoryBoard = () => {
  const advisors = [
    {
      name: "Dr. Latt Mansor",
      title: "Research Director",
      credentials: "DPhil Physiology, Anatomy and Genetics",
      bio: "An expert in metabolic health and human performance. Dr. Mansor ensures every ingredient in T-CORE aligns with current physiological research.",
      image: "/advisors/latt.png"
    },
    {
      name: "Dr. Jesse Ropat",
      title: "Clinical Advisor",
      credentials: "PharmD, Clinical Pharmacology",
      bio: "Specializing in pharmacokinetics, Dr. Ropat validates the bioavailability and interaction of our clinical dosages.",
      image: "/advisors/jesse.png"
    },
    {
      name: "Dr. Jeff Vogel",
      title: "Medical Consultant",
      credentials: "MD, Men's Health",
      bio: "With over two decades in male vitality optimization, Dr. Vogel provides practical, clinical oversight to our formulation.",
      image: "/advisors/jeff.png"
    }
  ];

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 md:px-20 bg-black/20 border-y border-white/5" id="advisory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biomen-accent mb-1.5 block">
            CLINICAL TRUST
          </span>
          <h2 className="text-3xl md:text-5xl font-normal font-serif tracking-tight text-white mb-2 uppercase">The Medical Advisory Board</h2>
          <p className="text-gray-400 text-sm lg:text-base font-semibold">Guided by experts in physiology, pharmacology, and men's health to ensure efficacy and safety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisors.map((advisor, i) => (
            <div key={i} className="glass-panel rounded-[2rem] overflow-hidden border border-white/5 hover:-translate-y-1.5 transition-all duration-500 shadow-2xl relative group">
              <div className="aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={advisor.image} 
                  alt={advisor.name}
                  className="w-full h-full object-cover filter brightness-[0.90] contrast-[1.05] scale-102 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-6 right-6 z-20">
                  <h3 className="text-xl font-black text-white uppercase tracking-wider filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">{advisor.name}</h3>
                  <div className="text-biomen-accent text-[10px] font-black uppercase tracking-widest mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{advisor.title}</div>
                </div>
              </div>
              <div className="p-6 bg-black/40">
                <div className="text-[11px] font-mono text-biomen-copper font-black uppercase tracking-wider mb-3 pb-3 border-b border-white/5 min-h-[36px]">
                  {advisor.credentials}
                </div>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-[13px] font-medium min-h-[72px]">
                  {advisor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisoryBoard;
