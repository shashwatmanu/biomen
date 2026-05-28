import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import SolutionGrid from '../components/home/SolutionGrid';
import IngredientSection from '../components/home/IngredientSection';
import TimelineSection from '../components/home/TimelineSection';
import BundleSelector from '../components/home/BundleSelector';
import FAQSection from '../components/home/FAQSection';
import Footer from '../components/shared/Footer';

const Home = () => {
  return (
    <div className="bg-black text-white font-manrope">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Transparent Formula */}
      <IngredientSection />
      
      {/* 3. Modern Male Depletion Problem */}
      <ProblemSection />
      
      {/* 4. 3-Mechanism Performance System */}
      <SolutionGrid />
      
      {/* 5. How does it work? (90-Day System) */}
      <TimelineSection title="How does it work?" />
      
      {/* 6. Pricing / Systems (Choose Your System) */}
      <BundleSelector />
      
      {/* 7. FAQ */}
      <FAQSection />
      
      {/* 8. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
