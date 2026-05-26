import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBadges from '../components/home/TrustBadges';
import ProblemSection from '../components/home/ProblemSection';
import SolutionGrid from '../components/home/SolutionGrid';
import IngredientSection from '../components/home/IngredientSection';
import WhyTCore from '../components/home/WhyTCore';
import TimelineSection from '../components/home/TimelineSection';
import PackagingSection from '../components/home/PackagingSection';
import FounderStory from '../components/home/FounderStory';
import ReviewSection from '../components/home/ReviewSection';
import BundleSelector from '../components/home/BundleSelector';
import GuaranteeSection from '../components/home/GuaranteeSection';
import FAQSection from '../components/home/FAQSection';
import EmailCapture from '../components/home/EmailCapture';
import Footer from '../components/shared/Footer';

const Home = () => {
  return (
    <div className="bg-black text-white font-manrope">
      {/* 1. Announcement bar - global in App.jsx */}
      
      {/* 2. Hero Section */}
      <HeroSection />
      
      {/* 3. Trust Architecture */}
      <TrustBadges />
      
      {/* 4. Modern Male Depletion Problem */}
      <ProblemSection />
      
      {/* 5. 3-Mechanism Performance System */}
      <SolutionGrid />
      
      {/* 6. Transparent Formula */}
      <IngredientSection />
      
      {/* 7. Why T-Core / Why Herbal Performance Support */}
      <WhyTCore />
      
      {/* 8. 90-Day Transformation System */}
      <TimelineSection />
      
      {/* 9. Packaging Ritual Section */}
      <PackagingSection />
      
      {/* 10. Founder Story */}
      <FounderStory />
      
      {/* 11. Testimonials */}
      <ReviewSection />
      
      {/* 12. Pricing / Systems */}
      <BundleSelector />
      
      {/* 13. Guarantee */}
      <GuaranteeSection />
      
      {/* 14. FAQ */}
      <FAQSection />
      
      {/* 15. Email Capture */}
      <EmailCapture />
      
      {/* 16. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
