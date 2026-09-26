import React, { useEffect } from 'react';
import LightHeroBuyBox from '../components/pdp/LightHeroBuyBox';
import ValueAddStack from '../components/pdp/ValueAddStack';
import AnchorNav from '../components/pdp/AnchorNav';
import LightIngredientSection from '../components/home/LightIngredientSection';
import LightGuaranteeSection from '../components/home/LightGuaranteeSection';
import LightComparisonTable from '../components/shared/LightComparisonTable';
import LightFullReviewsWidget from '../components/pdp/LightFullReviewsWidget';
import LightEmailCapture from '../components/home/LightEmailCapture';
import LightFAQSection from '../components/home/LightFAQSection';
import LightFooter from '../components/shared/LightFooter';

const LightPDP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.fbq) {
      window.fbq('track', 'ViewContent');
    }
  }, []);

  return (
    <div className="bg-[#FCFDFD] text-gray-900 font-manrope">
      {/* PromoBar and Navbar are handled in App.jsx */}
      <LightHeroBuyBox />
      <LightIngredientSection />
      <LightGuaranteeSection />
      {/* <TransformationGallery /> */}
      {/* <VideoCarousel /> */}
      {/* <LongTestimonials /> */}
      <LightComparisonTable />
      <LightFullReviewsWidget />
      <LightEmailCapture />
      <LightFAQSection />
      <LightFooter />
    </div>
  );
};

export default LightPDP;
