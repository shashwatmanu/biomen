import React from 'react';
import { ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-black/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built Clean. Built Transparent.</h2>
          <p className="text-gray-400">Manufactured under strict quality controls for biological safety.</p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {[
            { title: "No Proprietary Blend" },
            { title: "No Steroids" },
            { title: "Vegetarian Capsules" },
            { title: "cGMP Certified" },
            { title: "FSSAI Compliant" },
            { title: "Made in India" }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
              <CheckCircle2 size={32} className="text-biomen-accent mb-4" />
              <span className="text-sm font-bold uppercase tracking-wider">{badge.title}</span>
            </div>
          ))}
        </div>

        {/* Lab Testing Proof Module */}
        <div className="max-w-3xl mx-auto bg-[#0a100d] border border-biomen-accent/30 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="bg-biomen-accent/10 p-6 rounded-2xl shrink-0">
            <FileText size={48} className="text-biomen-accent" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black uppercase tracking-widest bg-biomen-accent text-biomen-green px-3 py-1 rounded-full">Verified</span>
              <span className="text-gray-400 text-sm font-mono">ID: BL-4092-A</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Third-Party Tested by Light Labs</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Every batch of T-CORE is independently tested for heavy metals, microbial safety, and active compound potency to ensure you get exactly what is on the label.
            </p>
            <button className="text-biomen-accent text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
              View Certificate of Analysis <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable ArrowRight since I didn't import it above
const ArrowRight = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default TrustBadges;
