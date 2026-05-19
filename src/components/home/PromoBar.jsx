import React from 'react';
import { ArrowRight, Gift } from 'lucide-react';

const PromoBar = () => {
  return (
    <div className="bg-biomen-accent text-biomen-green py-2 px-4 text-center font-bold text-sm flex items-center justify-center gap-3">
      <span className="flex items-center gap-2">
        <Gift size={16} /> Launch Offer: 50% Off + Free Gifts
      </span>
      <a href="/products/t-core" className="underline underline-offset-2 flex items-center gap-1 hover:opacity-80 transition-opacity">
        Claim Now <ArrowRight size={14} />
      </a>
    </div>
  );
};

export default PromoBar;
