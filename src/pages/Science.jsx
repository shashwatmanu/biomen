import React, { useEffect } from 'react';
import ScienceHero from '../components/science/ScienceHero';
import IngredientSpotlight from '../components/science/IngredientSpotlight';
import TimelineSection from '../components/home/TimelineSection';
import AdvisoryBoard from '../components/shared/AdvisoryBoard';
import ComparisonTable from '../components/shared/ComparisonTable';
import TransformationGallery from '../components/shared/TransformationGallery';
import Footer from '../components/shared/Footer';

const Science = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white font-manrope">
      {/* 1. The Science Behind T-CORE */}
      <ScienceHero />
      
      {/* 2. The Science of The Stack */}
      <IngredientSpotlight />
      
      {/* 3. The 90-Day System (WHAT TO EXPECT) */}
      <TimelineSection title="WHAT TO EXPECT" />
      
      {/* 4. The Medical Advisory Board */}
      <AdvisoryBoard />
      
      {/* 5. The BIOMEN Difference */}
      <ComparisonTable />
      
      {/* 6. The Shift is Real */}
      <TransformationGallery />
      
      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default Science;
