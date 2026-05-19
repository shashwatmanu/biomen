import React from 'react';
import { ArrowRight } from 'lucide-react';

const TransformationGallery = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-green">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The Shift is Real</h2>
            <p className="text-gray-300 text-lg">See the difference 90 days of consistent biological support can make.</p>
          </div>
          <a href="#reviews" className="shrink-0 text-biomen-accent font-bold uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
            See all stories <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-panel rounded-3xl overflow-hidden border border-white/5 group">
              <div className="aspect-square bg-black/40 relative overflow-hidden flex items-center justify-center">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-widest relative z-20">
                  [Before / After Image]
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                  <div>
                    <div className="text-white font-bold">User {i}</div>
                    <div className="text-biomen-accent text-xs font-bold uppercase tracking-wider">90 Days</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-400 italic mb-4">
                  "Placeholder quote about how T-CORE changed their energy levels, gym performance, or daily focus."
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-biomen-silver">
                  Focus: Energy & Drive
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationGallery;
