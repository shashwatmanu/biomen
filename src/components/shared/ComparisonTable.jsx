import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ComparisonTable = () => {
  const rows = [
    { feature: "Approach", us: "Biological Optimization", trt: "Hormone Replacement", generic: "Instant 'Boost' Claims" },
    { feature: "Convenience", us: "Daily Capsules", trt: "Injections / Creams", generic: "Daily Capsules" },
    { feature: "Natural Production", us: "Supports your body's synthesis", trt: "Shuts down natural production", generic: "Often ineffective" },
    { feature: "Side Effects", us: "No known severe side effects", trt: "High risk (requires management)", generic: "Variable / Unknown" },
    { feature: "Monitoring", us: "None required", trt: "Frequent bloodwork needed", generic: "None required" },
    { feature: "Clinical Doses", us: "Yes, fully transparent", trt: "Prescription based", generic: "Proprietary blends" },
    { feature: "Reversibility", us: "100% Reversible", trt: "Difficult to reverse", generic: "100% Reversible" },
    { feature: "Third-Party Tested", us: "Yes, every batch", trt: "Regulated pharma", generic: "Rarely tested" }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">The BIOMEN Difference</h2>
          <p className="text-gray-400">See how T-CORE stacks up against alternative approaches.</p>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white/5 text-sm uppercase tracking-widest text-gray-400">
                <th className="p-6 font-bold w-1/4">Feature</th>
                <th className="p-6 font-black text-biomen-accent w-1/4 bg-biomen-accent/5">T-CORE</th>
                <th className="p-6 font-bold w-1/4">TRT</th>
                <th className="p-6 font-bold w-1/4">Generic Boosters</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">{row.feature}</td>
                  <td className="p-6 text-biomen-accent font-bold bg-biomen-accent/5">{row.us}</td>
                  <td className="p-6 text-gray-400">{row.trt}</td>
                  <td className="p-6 text-gray-500">{row.generic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
