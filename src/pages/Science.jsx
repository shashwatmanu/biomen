import React, { useEffect } from 'react';
import ScienceHero from '../components/science/ScienceHero';
import FormulaOverview from '../components/science/FormulaOverview';
import IngredientSpotlight from '../components/science/IngredientSpotlight';
import TrustBadges from '../components/home/TrustBadges';
import TimelineSection from '../components/home/TimelineSection';
import ConsistencySection from '../components/science/ConsistencySection';
import AdvisoryBoard from '../components/shared/AdvisoryBoard';
import ComparisonTable from '../components/shared/ComparisonTable';
import FounderStory from '../components/home/FounderStory';
import TransformationGallery from '../components/shared/TransformationGallery';
import FAQSection from '../components/home/FAQSection';
import EmailCapture from '../components/home/EmailCapture';
import Footer from '../components/shared/Footer';

const Science = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white font-manrope">
      {/* PromoBar and Navbar are handled in App.jsx */}
      <ScienceHero />
      <FormulaOverview />
      <IngredientSpotlight />
      <TrustBadges />
      <TimelineSection />
      <ConsistencySection />
      <AdvisoryBoard />
      <ComparisonTable />
      <FounderStory />
      <TransformationGallery />
      <FAQSection />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default Science;
