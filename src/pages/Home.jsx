import React, { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
import ScrollProgressIndicator from '../components/shared/ScrollProgressIndicator';

// Below-the-fold components are lazy-loaded to optimize FCP/LCP paint times
const IngredientSection = lazy(() => import('../components/home/IngredientSection'));
const ProblemSection = lazy(() => import('../components/home/ProblemSection'));
const SolutionGrid = lazy(() => import('../components/home/SolutionGrid'));
const TimelineSection = lazy(() => import('../components/home/TimelineSection'));
const BundleSelector = lazy(() => import('../components/home/BundleSelector'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const Footer = lazy(() => import('../components/shared/Footer'));

const Home = () => {
  return (
    <div className="bg-black text-white font-manrope relative">
      {/* Vertical Navigation sidebar scroll indicator */}
      <ScrollProgressIndicator />

      {/* 1. Hero Section (Eagerly loaded - above fold) */}
      <HeroSection />
      
      {/* Suspense wrapper for all deferred below-the-fold sections */}
      <Suspense fallback={<div className="min-h-[200px] bg-black" />}>
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
      </Suspense>
    </div>
  );
};

export default Home;
