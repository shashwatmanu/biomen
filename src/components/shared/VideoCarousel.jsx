import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VideoCarousel = () => {
  const [activeTab, setActiveTab] = useState('Benefits');
  const tabs = ['Benefits', 'Ingredients', 'Value', 'Effects'];

  return (
    <section className="py-24 px-6 md:px-20 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">What Men Are Saying</h2>
          <p className="text-gray-400 text-lg">Real results from consistent T-CORE users.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-biomen-accent text-biomen-green' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Video Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel rounded-3xl overflow-hidden border border-white/5 relative group cursor-pointer aspect-[9/16] md:aspect-auto md:h-[500px]">
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                <span className="text-gray-600 font-mono text-xs uppercase tracking-widest">
                  [Video Thumbnail: {activeTab}]
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-biomen-accent/90 text-biomen-green rounded-full flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-biomen-accent transition-all shadow-[0_0_30px_rgba(194,240,194,0.3)]">
                  <Play fill="currentColor" size={24} />
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="text-white font-bold text-lg mb-2">"{activeTab} review headline goes here."</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-biomen-accent"></div>
                  <div className="text-sm text-gray-400 font-medium">Verified User</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
