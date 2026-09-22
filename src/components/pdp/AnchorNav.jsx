import React from 'react';

const AnchorNav = () => {
  return (
    <div className="sticky top-0 z-40 bg-biomen-bg-primary/80 backdrop-blur-md border-b border-biomen-text-primary/10 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center gap-8 text-sm font-bold uppercase tracking-widest text-biomen-text-secondary">
        <a href="#what-to-expect" className="hover:text-biomen-accent transition-colors">What to Expect</a>
        <a href="#ingredients" className="hover:text-biomen-accent transition-colors">Formula</a>
        <a href="#reviews" className="hover:text-biomen-accent transition-colors">Reviews</a>
        <a href="#faq" className="hover:text-biomen-accent transition-colors">FAQs</a>
      </div>
    </div>
  );
};

export default AnchorNav;
