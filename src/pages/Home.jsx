import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PressStrip from '../components/home/PressStrip';
import ProblemSection from '../components/home/ProblemSection';
import SolutionGrid from '../components/home/SolutionGrid';
import IngredientSection from '../components/home/IngredientSection';
import TimelineSection from '../components/home/TimelineSection';
import TrustBadges from '../components/home/TrustBadges';
import BundleSelector from '../components/home/BundleSelector';
import FounderStory from '../components/home/FounderStory';
import ReviewSection from '../components/home/ReviewSection';
import GuaranteeSection from '../components/home/GuaranteeSection';
import FAQSection from '../components/home/FAQSection';
import EmailCapture from '../components/home/EmailCapture';
import Footer from '../components/shared/Footer';

const Home = () => {
  return (
    <div className="bg-black text-white font-manrope">
      <HeroSection />
      <PressStrip />
      <ProblemSection />
      <SolutionGrid />
      <IngredientSection />
      <TimelineSection />
      <BundleSelector />
      <TrustBadges />
      <FounderStory />
      <ReviewSection />
      <GuaranteeSection />
      <FAQSection />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default Home;
