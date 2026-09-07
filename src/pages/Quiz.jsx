import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizEngine from '../components/quiz/QuizEngine';
import BotanicalParticles from '../components/shared/BotanicalParticles';

const Quiz = () => {
  useEffect(() => {
    // Update SEO dynamically for the Quiz page
    document.title = "Masculine Vitality Assessment | BIOMEN LABS®";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Take the BIOMEN LABS clinical assessment to discover the right protocol for your masculine vitality and energy.');
    }
  }, []);

  return (
    <div className="bg-[#030705] min-h-screen relative overflow-hidden flex flex-col lg:flex-row">
      <BotanicalParticles />
      
      {/* Left Panel: Quiz Engine */}
      <div className="lg:w-1/2 xl:w-7/12 relative flex-grow flex flex-col justify-center p-4 sm:p-10 z-20 bg-[#030705] order-2 lg:order-1">
        {/* Header inside the Quiz Panel */}
        <header className="absolute top-0 left-0 w-full p-6 sm:p-10 flex items-center justify-between z-30 pointer-events-auto">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo/logo_white_symbol.webp" 
              alt="BIOMEN LABS Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-lg"
            />
            <span className="font-extrabold tracking-[0.25em] text-lg sm:text-xl text-white opacity-90 group-hover:opacity-100 transition-opacity">BIOMEN</span>
          </Link>
          <div className="hidden sm:inline-block px-4 py-1 border border-[#16C784]/20 rounded-full bg-[#16C784]/5 text-xs font-bold tracking-[0.2em] text-[#16C784] uppercase">
            Assessment
          </div>
        </header>

        {/* Glowing Orbs for the quiz side */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-[#16C784]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-[300px] bg-[#BFA46A]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

        <div className="relative z-10 w-full max-w-xl mx-auto mt-16 sm:mt-0">
          <QuizEngine />
        </div>
      </div>

      {/* Right Panel: Branding & Imagery */}
      <div className="lg:w-1/2 xl:w-5/12 relative min-h-[30vh] lg:min-h-screen flex flex-col justify-end p-8 sm:p-12 z-10 overflow-hidden order-1 lg:order-2">
        {/* Immersive Background Image without heavy darkening */}
        <div 
          className="absolute inset-0 bg-cover bg-[85%_center] bg-no-repeat opacity-90 transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: 'url(/hero_mossy_ingredients.jpg)' }}
        ></div>
        
        {/* Refined gradient mask for smooth blending into the dark quiz panel (now fading from left instead of right) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-[#030705]/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/20 lg:to-[#030705]"></div>
        
        {/* Hero Copy (Awwwards Style Typography) */}
        <div className="relative z-30 drop-shadow-2xl mb-4 sm:mb-8 text-right lg:text-right w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white mb-4 sm:mb-6 leading-[0.9]">
            Find Your <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A8B3AA] via-white to-[#BFA46A]">
              Optimal
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 ml-auto max-w-xs font-medium leading-relaxed mix-blend-plus-lighter">
            A 60-second assessment to unlock your personalized masculine vitality stack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
