import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Terms = () => {
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
            <Shield size={14} /> Legal Framework
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
            TERMS OF USE
          </h1>
          <p className="text-[#A8B3AA] font-mono text-xs uppercase tracking-widest">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-medium text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to BIOMEN LABS.
          </p>
          <p>
            These Terms of Use ("Terms") govern your access to and use of the BIOMEN LABS website, products, services, consultations, content, and related offerings operated by DoubleV Labs Private Limited, trading as BIOMEN LABS ("BIOMEN LABS", "Company", "we", "our", or "us").
          </p>
          <p>
            By accessing our website, purchasing our products, using our services, participating in consultations, or interacting with our content, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
          </p>
          <p className="border-l-2 border-[#D85A1F] pl-4 italic text-gray-400">
            If you do not agree with these Terms, you should discontinue use of the website and services immediately.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">1. ELIGIBILITY</h2>
          <p>The BIOMEN LABS website and products are intended for adults aged 18 years and above. By using our website, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>You are at least 18 years of age.</li>
            <li>You have the legal capacity to enter into binding agreements.</li>
            <li>Any information you provide is accurate and complete.</li>
            <li>You will use the website in accordance with applicable laws and these Terms.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">2. PRODUCTS & SERVICES</h2>
          <p>BIOMEN LABS offers wellness products, educational content, consultations, and related services designed to support customer wellness and lifestyle goals.</p>
          <p>We reserve the right, at our sole discretion, to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Introduce new products or services.</li>
            <li>Modify formulations or update ingredients.</li>
            <li>Change packaging or product presentation.</li>
            <li>Adjust pricing, promotions, and offers.</li>
            <li>Suspend, discontinue or update website content.</li>
          </ul>
          <p>Such changes may be made without prior notice.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">3. ORDERS & ACCEPTANCE</h2>
          <p>All orders placed through the website are subject to acceptance and availability. BIOMEN LABS reserves the right to refuse any order, cancel any order, limit purchase quantities, or restrict orders from certain customers or locations. Decline transactions suspected of fraud, abuse, or policy violations. Receipt of an order confirmation does not guarantee acceptance of the order.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">4. PRICING & PAYMENTS</h2>
          <p>All prices displayed on the website are subject to change without notice. Applicable taxes, shipping charges, promotional discounts, and other charges may be applied during checkout. Payments are processed through secure third-party payment providers. BIOMEN LABS reserves the right to correct pricing errors, inaccuracies, or omissions at any time.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">5. CASH ON DELIVERY (COD)</h2>
          <p>Cash on Delivery may be offered for eligible orders. BIOMEN LABS reserves the right to restrict, suspend, or remove COD privileges where we reasonably believe there has been repeated refusal of deliveries, fraudulent activity, abuse of promotional offers, misuse of the COD facility, or false or misleading order information.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">6. CONSULTATIONS</h2>
          <p>BIOMEN LABS may provide access to consultations conducted by qualified Ayurvedic practitioners engaged by the Company. Consultations are intended to support customer education, wellness awareness, and informed decision-making. Consultations are informational in nature, do not guarantee outcomes, do not constitute emergency medical care, and do not replace diagnosis or treatment by a qualified healthcare provider. They do not establish a physician-patient relationship with DoubleV Labs Private Limited. Customers remain responsible for their healthcare decisions and should seek independent medical advice where appropriate.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">7. CUSTOMER RESPONSIBILITIES</h2>
          <p>Customers are responsible for reviewing product information before purchase, following product directions for use, reviewing ingredients and warnings, assessing suitability based on individual circumstances, and consulting qualified professionals where necessary. Customers acknowledge that individual responses to wellness products may vary.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">8. EDUCATIONAL CONTENT</h2>
          <p>BIOMEN LABS may publish blog articles, educational resources, guides, videos, eBooks, newsletters, and social media content. Such content is provided for informational and educational purposes only. Nothing published by BIOMEN LABS should be interpreted as medical advice, diagnosis, treatment, prevention, cure, or professional healthcare guidance. Customers should not rely solely upon information provided by BIOMEN LABS when making healthcare decisions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">9. USER-GENERATED CONTENT</h2>
          <p>Customers may voluntarily submit reviews, testimonials, feedback, photographs, videos, or success stories. By submitting such content to BIOMEN LABS, you grant BIOMEN LABS a worldwide, non-exclusive, royalty-free, transferable, perpetual licence to use, reproduce, modify, publish, display, distribute, and promote such content for marketing, advertising, educational, promotional, and business purposes. No additional compensation shall be payable for such use. You represent that you own or otherwise have the necessary rights to submit such content.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">10. INTELLECTUAL PROPERTY</h2>
          <p>All intellectual property rights associated with BIOMEN LABS are owned by or licensed to DoubleV Labs Private Limited. This includes but is not limited to: BIOMEN LABS branding, T-Core branding, future product names, logos, packaging designs, labels, product descriptions, website content, graphics, videos, images, and educational materials. No content may be copied, reproduced, modified, distributed, republished, displayed, sold, licensed, or exploited without prior written permission from BIOMEN LABS.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">11. PROHIBITED USES</h2>
          <p>You agree not to use the website for unlawful purposes, attempt unauthorised access to systems or data, interfere with website security or functionality, copy, scrape, harvest, or reproduce website content, misuse trademarks or intellectual property, resell BIOMEN LABS products without authorisation, engage in fraudulent activity, submit false claims, or harass BIOMEN LABS personnel. BIOMEN LABS reserves the right to investigate and take action against violations.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">12. RIGHT TO REFUSE SERVICE</h2>
          <p>BIOMEN LABS reserves the right, at its sole discretion, to refuse service, cancel orders, restrict purchases, suspend customer access, or terminate customer relationships. This right may be exercised where misuse, fraud, abuse, chargeback activity, COD abuse, false claims, policy violations, or other conduct inconsistent with these Terms is suspected.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">13. DISCLAIMER OF WARRANTIES</h2>
          <p>Except as expressly stated, the website, products, services, consultations, content, and materials provided by BIOMEN LABS are provided on an "as is" and "as available" basis. BIOMEN LABS makes no guarantees, representations, or warranties regarding specific results, product performance for any individual, website availability, or error-free operation. Individual experiences and outcomes may vary.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">14. LIMITATION OF LIABILITY</h2>
          <p>To the maximum extent permitted by applicable law, BIOMEN LABS, DoubleV Labs Private Limited, its directors, officers, employees, consultants, contractors, affiliates, and service providers shall not be liable for any indirect, incidental, consequential, special, exemplary, punitive, or economic damages arising from use of the website, use of products, participation in consultations, reliance upon educational content, customer expectations regarding outcomes, or delays. Customers acknowledge that use of BIOMEN LABS products, services, and content is undertaken voluntarily and at their own discretion.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">15. THIRD-PARTY SERVICES</h2>
          <p>The website may utilise or link to third-party services including payment processors, shipping providers, analytics services, and communication tools. BIOMEN LABS is not responsible for the actions, content, policies, or practices of third-party providers. Use of third-party services may be subject to separate terms and policies.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">16. GOVERNING LAW & JURISDICTION</h2>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India. Any dispute arising out of or relating to these Terms, the website, products, services, or customer relationship shall be subject to the exclusive jurisdiction of the competent courts located in Ghaziabad, Uttar Pradesh, India.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">17. CHANGES TO THESE TERMS</h2>
          <p>BIOMEN LABS reserves the right to modify, update, or revise these Terms at any time. Any changes become effective immediately upon publication on the website. Continued use of the website following publication of changes constitutes acceptance of the updated Terms.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">18. CONTACT US</h2>
          <p>For questions regarding these Terms of Use, please contact:</p>
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

export default Terms;
