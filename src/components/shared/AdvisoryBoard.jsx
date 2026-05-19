import React from 'react';

const AdvisoryBoard = () => {
  const advisors = [
    {
      name: "Dr. Latt Mansor",
      title: "Research Director",
      credentials: "DPhil Physiology, Anatomy and Genetics",
      bio: "An expert in metabolic health and human performance. Dr. Mansor ensures every ingredient in T-CORE aligns with current physiological research."
    },
    {
      name: "Dr. Jesse Ropat",
      title: "Clinical Advisor",
      credentials: "PharmD, Clinical Pharmacology",
      bio: "Specializing in pharmacokinetics, Dr. Ropat validates the bioavailability and interaction of our clinical dosages."
    },
    {
      name: "Dr. Jeff Vogel",
      title: "Medical Consultant",
      credentials: "MD, Men's Health",
      bio: "With over two decades in male vitality optimization, Dr. Vogel provides practical, clinical oversight to our formulation."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black/20 border-y border-white/5" id="advisory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The Medical Advisory Board</h2>
          <p className="text-gray-400 text-lg">Guided by experts in physiology, pharmacology, and men's health to ensure efficacy and safety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisors.map((advisor, i) => (
            <div key={i} className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <span className="text-gray-600 font-mono text-xs uppercase tracking-widest relative z-20">
                  [Placeholder Image]
                </span>
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="text-xl font-bold">{advisor.name}</h3>
                  <div className="text-biomen-accent text-sm font-bold uppercase tracking-wider">{advisor.title}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-mono text-gray-500 mb-4 pb-4 border-b border-white/10">
                  {advisor.credentials}
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
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
