import React from 'react';

const AdvisoryBoard = () => {
  const advisors = [
    {
      name: "Dr. Keshav Dev, BAMS, MD (Ayurveda)",
      title: "Chief Ayurvedic Formulary Director",
      credentials: "BAMS (Ayurveda), MD in Dravyaguna (Ayurvedic Pharmacology)",
      bio: "An alumnus of India's premier Ayurvedic institutions, Dr. Keshav Dev has spent over two decades researching botanical bio-availability. He oversees our extraction processes to ensure T-CORE's five active ingredients maintain clinical synergy.",
      image: "/doc.webp"
    }
  ];

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 md:px-20 bg-black/20 border-y border-white/5" id="advisory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16C784] mb-1.5 block">
            CLINICAL TRUST
          </span>
          <h2 className="text-3xl md:text-5xl font-normal font-serif tracking-tight text-white mb-2 uppercase">The Medical Advisory Board</h2>
          <p className="text-gray-400 text-sm lg:text-base font-semibold">Guided by experts in physiology, pharmacology, and men's health to ensure efficacy and safety.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-[3rem] overflow-hidden border border-[#0FA36B]/20 bg-gradient-to-br from-[#06110C] to-black/40 shadow-2xl relative group flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
            {/* Left side: Doctor Image */}
            <div className="w-full md:w-2/5 shrink-0 relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#052E22] to-[#030705] rounded-[2rem] border border-[#0FA36B]/20 overflow-hidden relative shadow-xl">
                <img 
                  src={advisors[0].image} 
                  alt={advisors[0].name}
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right side: Doctor Details */}
            <div className="w-full md:w-3/5 flex flex-col justify-between py-2 text-left">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#BFA46A] bg-[#BFA46A]/10 px-3.5 py-1 rounded-full border border-[#BFA46A]/20 inline-block mb-3">
                  Advisory Director
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider leading-tight">
                  {advisors[0].name}
                </h3>
                <div className="text-[#16C784] text-xs font-black uppercase tracking-widest mt-1">
                  {advisors[0].title}
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#D85A1F] font-black uppercase tracking-wider my-4 py-3 border-y border-white/5">
                {advisors[0].credentials}
              </div>

              <p className="text-gray-400 leading-relaxed text-sm md:text-[15px] font-medium pl-4 border-l-2 border-[#16C784]">
                {advisors[0].bio}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-black/50 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full text-gray-300">
                  BAMS Certified
                </span>
                <span className="bg-black/50 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full text-gray-300">
                  MD Ayurveda
                </span>
                <span className="bg-black/50 border border-white/5 text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full text-gray-300">
                  25+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryBoard;
