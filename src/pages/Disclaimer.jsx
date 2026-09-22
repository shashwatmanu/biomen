import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#030705] min-h-screen text-[#F4F6F2] pt-[176px] md:pt-[144px]">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D85A1F]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24 relative z-10 text-left">
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#A8B3AA] hover:text-white transition-colors mb-12 font-mono font-black uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D85A1F]/10 border border-[#D85A1F]/20 text-[#D85A1F] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-md">
            <Shield size={14} /> Medical &amp; General Disclaimers
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
            DISCLAIMER POLICY
          </h1>
          <p className="text-[#A8B3AA] font-mono text-xs uppercase tracking-widest">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-medium text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            This Disclaimer Policy applies to all information, content, products, services, consultations, communications, educational materials, and resources made available by DoubleV Labs Private Limited, trading as BIOMEN LABS ("BIOMEN LABS", "Company", "we", "our", or "us").
          </p>
          <p>
            By accessing our website, purchasing our products, participating in consultations, or interacting with our content, you acknowledge and agree to the terms of this Disclaimer.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">1. GENERAL DISCLAIMER</h2>
          <p>BIOMEN LABS is a wellness-focused brand committed to supporting modern men through thoughtfully formulated products, educational content, and wellness resources. Our products, content, consultations, articles, emails, guides, eBooks, videos, and other materials are intended for informational, educational, and wellness-support purposes only. Nothing provided by BIOMEN LABS should be interpreted as medical advice, diagnosis, treatment, prevention, cure, or management of any disease, illness, disorder, deficiency, or medical condition.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">2. PRODUCT DISCLAIMER</h2>
          <p>T-Core is an Ayurvedic Proprietary Medicine intended to support male wellness, vitality, energy, recovery, performance, and overall wellbeing. T-Core is not intended to diagnose, treat, cure, or prevent any disease or medical condition, nor replace professional medical care, prescribed medications, hormone replacement therapy (HRT), or testosterone replacement therapy (TRT). Customers should use T-Core strictly in accordance with the directions provided on the packaging and official BIOMEN LABS materials.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">3. INDIVIDUAL RESULTS MAY VARY</h2>
          <p>Every individual is different. Responses to wellness products, lifestyle changes, and wellness programs may vary significantly between individuals. Results may be influenced by age, genetics, diet, exercise habits, sleep quality, stress levels, existing health conditions, medication use, consistency of usage, and lifestyle choices. For this reason, BIOMEN LABS does not guarantee any specific outcome, result, improvement, performance level, hormonal change, or physical transformation.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">4. TESTIMONIALS &amp; CUSTOMER EXPERIENCES</h2>
          <p>Reviews, testimonials, customer feedback, and success stories reflect the personal experiences of individual users. Such experiences are personal to those individuals and should not be interpreted as typical results, guaranteed results, promised outcomes, or predictions of future performance. Individual experiences will vary.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">5. EDUCATIONAL CONTENT DISCLAIMER</h2>
          <p>The information published by BIOMEN LABS through blog articles, guides, eBooks, social media, videos, newsletters, or wellness protocols is intended solely for general informational and educational purposes. Such information should not be considered medical advice, healthcare advice, diagnosis, treatment recommendations, or professional healthcare guidance. Customers should not rely solely upon information provided by BIOMEN LABS when making healthcare decisions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">6. TESTOSTERONE, HORMONE &amp; PERFORMANCE CONTENT DISCLAIMER</h2>
          <p>From time to time, BIOMEN LABS may publish educational content relating to testosterone, hormones, energy, recovery, stress management, performance, and lifestyle optimization. Any references to these topics are intended solely for educational and informational purposes and should not be interpreted as claims regarding the diagnosis, treatment, prevention, cure, correction, or management of any medical condition, hormonal disorder, deficiency, or disease.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">7. CONSULTATION DISCLAIMER</h2>
          <p>BIOMEN LABS may offer access to wellness consultations conducted by qualified Ayurvedic practitioners engaged by the Company. These consultations are intended to support customer education, wellness awareness, and informed decision-making. Consultations do not constitute emergency medical care, do not replace professional medical treatment, do not replace diagnosis by a qualified healthcare provider, do not create a physician-patient relationship with DoubleV Labs Private Limited, and should not be relied upon as the sole basis for healthcare decisions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">8. INGREDIENTS, ALLERGIES &amp; SUITABILITY</h2>
          <p>Customers are responsible for reviewing ingredient information, directions, warnings, and suitability details before consuming any BIOMEN LABS product. Individuals who have a medical condition, are taking medication, have known allergies, or have concerns regarding suitability should consult an appropriately qualified healthcare professional before use. Discontinue use and seek professional medical advice if any adverse reaction occurs.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">9. NO PROFESSIONAL ADVICE</h2>
          <p>Nothing provided by BIOMEN LABS constitutes medical, healthcare, nutritional, legal, financial, or other professional advice. Customers should consult appropriately qualified professionals before making decisions based upon information obtained through BIOMEN LABS.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">10. EXTERNAL LINKS &amp; THIRD-PARTY CONTENT</h2>
          <p>Our website and content may contain links to third-party websites, resources, platforms, products, or services. BIOMEN LABS does not control and is not responsible for third-party content, policies, claims, or practices. Access to third-party resources is undertaken at the user's own discretion and risk.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">11. LIMITATION OF LIABILITY</h2>
          <p>To the maximum extent permitted by applicable law, BIOMEN LABS, DoubleV Labs Private Limited, its directors, officers, employees, consultants, contractors, and service providers shall not be liable for any direct, indirect, incidental, special, consequential, exemplary, or punitive damages arising out of or relating to use of our products, reliance upon our content, consultations, or decisions made based on information provided by BIOMEN LABS. Use of BIOMEN LABS products, services, and content is undertaken voluntarily and at the user's own discretion.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">12. FUTURE PRODUCTS &amp; CONTENT</h2>
          <p>This Disclaimer applies not only to T-Core but also to any future BIOMEN LABS products, services, consultations, educational resources, content, and programs unless database records indicate otherwise.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">13. CHANGES TO THIS DISCLAIMER</h2>
          <p>BIOMEN LABS reserves the right to update, modify, or revise this Disclaimer at any time. Any changes become effective immediately upon publication on the website. Continued use of the website or products following publication of updates constitutes acceptance of the revised Disclaimer.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">14. CONTACT US</h2>
          <p>For questions regarding this Disclaimer Policy, please contact:</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 font-mono text-xs text-gray-400 space-y-2 mt-4 max-w-md">
            <div className="text-white font-black uppercase text-sm mb-2">BIOMEN LABS</div>
            <div>DoubleV Labs Private Limited</div>
            <div>Email: info@biomenlabs.com</div>
            <div>Phone / WhatsApp: +91 85957 70970</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;
