import React, { useEffect } from 'react';
import HeroBuyBox from '../components/pdp/HeroBuyBox';
import ValueAddStack from '../components/pdp/ValueAddStack';
import AnchorNav from '../components/pdp/AnchorNav';
import TimelineSection from '../components/home/TimelineSection';
import IngredientSection from '../components/home/IngredientSection';
import TrustBadges from '../components/home/TrustBadges';
import TransformationGallery from '../components/shared/TransformationGallery';
import LongTestimonials from '../components/pdp/LongTestimonials';
import VideoCarousel from '../components/shared/VideoCarousel';
import ComparisonTable from '../components/shared/ComparisonTable';
import MechanismSection from '../components/pdp/MechanismSection';
import WeeklyExpectations from '../components/pdp/WeeklyExpectations';
import AdvisoryBoard from '../components/shared/AdvisoryBoard';
import GuaranteeSection from '../components/home/GuaranteeSection';
import FAQSection from '../components/home/FAQSection';
import OfferRecap from '../components/pdp/OfferRecap';
import FullReviewsWidget from '../components/pdp/FullReviewsWidget';
import EmailCapture from '../components/home/EmailCapture';
import Footer from '../components/shared/Footer';

const PDP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white font-manrope pt-24">
      {/* PromoBar and Navbar are handled in App.jsx */}
      <HeroBuyBox />
      <ValueAddStack />
      <AnchorNav />
      <TimelineSection />
      <IngredientSection />
      <TrustBadges />
      <TransformationGallery />
      <LongTestimonials />
      <VideoCarousel />
      <ComparisonTable />
      <MechanismSection />
      <WeeklyExpectations />
      <AdvisoryBoard />
      <GuaranteeSection />
      <FAQSection />
      <OfferRecap />
      <FullReviewsWidget />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default PDP;
