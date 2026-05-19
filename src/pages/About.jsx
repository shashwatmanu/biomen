import React from 'react';
import { ShieldCheck, Target, Zap, Microscope } from 'lucide-react';
import Footer from '../components/shared/Footer';

const About = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-48">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            The Mission <br/> <span className="text-emerald-500">Behind the Labs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Biomen Labs was founded on a single premise: Men's health is in crisis, and the solutions currently on the market are either ineffective, dangerous, or opaque.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="aspect-square bg-gradient-to-br from-emerald-900/20 to-black rounded-[3rem] border border-white/10 overflow-hidden relative group">
            <img 
              src="/hero_bg_final.png" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              alt="Research Lab"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Our DNA</h2>
            <div className="space-y-8 font-medium text-lg text-gray-400">
              <p>
                We spent 24 months researching the most potent, natural biological stack on Earth. No proprietary blends, no hidden fillers, and absolutely no synthetic hormones.
              </p>
              <p>
                Every milligram in T-CORE is backed by peer-reviewed clinical research. We don't believe in magic pills; we believe in biological optimization through precision nutrition.
              </p>
              <p>
                Our facility in the USA is FDA-registered and cGMP-certified, ensuring that what's on the label is exactly what's in the bottle—nothing more, nothing less.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Microscope size={32} />,
              title: "Clinical Precision",
              desc: "Every ingredient is dosed according to clinical studies that show real physiological results."
            },
            {
              icon: <ShieldCheck size={32} />,
              title: "Absolute Purity",
              desc: "No synthetic fillers, artificial colors, or proprietary blends. Complete transparency is our baseline."
            },
            {
              icon: <Target size={32} />,
              title: "Male Optimization",
              desc: "We focus exclusively on the biological markers that define male health: T-levels, drive, and recovery."
            }
          ].map((pillar, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-8">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white">{pillar.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
