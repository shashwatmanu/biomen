import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#030705] min-h-screen text-[#F4F6F2] pt-[176px] md:pt-[144px]">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#16C784]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24 relative z-10 text-left">
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#A8B3AA] hover:text-white transition-colors mb-12 font-mono font-black uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#16C784]/10 border border-[#16C784]/20 text-[#16C784] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-md">
            <Shield size={14} /> Privacy Protection
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-[#A8B3AA] font-mono text-xs uppercase tracking-widest">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-medium text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            DoubleV Labs Private Limited, trading as BIOMEN LABS ("BIOMEN LABS", "Company", "we", "our", or "us"), respects your privacy and is committed to protecting your personal information.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, disclose, and protect information when you visit our website, purchase our products, communicate with us, participate in promotional activities, subscribe to our communications, or otherwise interact with BIOMEN LABS.
          </p>
          <p>
            By accessing or using our website, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">1. WHO WE ARE</h2>
          <p>BIOMEN LABS is a wellness brand operated by:</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-xs max-w-sm">
            <div>DoubleV Labs Private Limited</div>
            <div>Plot No. 4, Ramprastha Greens, Ghaziabad</div>
            <div>Uttar Pradesh – 201010, India</div>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">2. INFORMATION WE COLLECT</h2>
          <p>We may collect information directly from you, automatically through your use of our website, and from trusted service providers.</p>
          <p><strong>Personal Information:</strong> We may collect your name, email, phone number, shipping/billing address, order details, purchase history, and feedback.</p>
          <p><strong>Consultation Information:</strong> We maintain limited administrative records including appointment booking times and attendance. BIOMEN LABS does not collect, store, or process medical records, diagnosis reports, or healthcare provider notes as part of normal business operations.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">3. INFORMATION COLLECTED AUTOMATICALLY</h2>
          <p>When you visit our website, certain information may be collected automatically, including IP addresses, browser types, operating systems, referring URLs, pages viewed, time spent on pages, and advertising interactions. This information helps us improve website performance, customer experience, and marketing effectiveness.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">4. HOW WE USE YOUR INFORMATION</h2>
          <p>We use your information for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong>Order Fulfillment:</strong> Processing payments, deliveries, and tracking updates.</li>
            <li><strong>Customer Support:</strong> Resolving enquiries and Performance Promise requests.</li>
            <li><strong>Marketing & Communications:</strong> Sending journals, newsletters, and promotional offers.</li>
            <li><strong>Website Improvement:</strong> Analysing web traffic and campaigns.</li>
            <li><strong>Legal & Business:</strong> Fraud prevention, accounting, tax, and policy enforcement.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">5. MARKETING COMMUNICATIONS</h2>
          <p>You can opt out of promotional communications at any time by clicking the unsubscribe link in our emails, following SMS opt-out instructions, or contacting support directly. Transactional notices (such as order confirmations) will still be sent as necessary.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">6. COOKIES & TRACKING TECHNOLOGIES</h2>
          <p>Our website uses cookies and similar technologies to remember preferences, analyze website traffic, personalize content, and support checkout functionality. You may manage cookies through browser settings, though disabling them may affect website features.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">7. ADVERTISING & ANALYTICS</h2>
          <p>We utilize third-party tools such as Google Analytics, Google Ads, Meta Ads, Facebook Pixel, and other marketing services to measure campaign effectiveness, improve advertising performance, and deliver relevant promotions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">8. PAYMENT PROCESSING</h2>
          <p>Payments made through our website are processed using trusted third-party payment providers, including Razorpay. BIOMEN LABS does not store complete credit card, debit card, banking, or UPI information on its own servers.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">9. INFORMATION SHARING</h2>
          <p>We may share information with logistics, payment, technology, and support providers when necessary to run our business. <strong>BIOMEN LABS does not sell, rent, trade, or transfer personal information to third parties for their independent marketing.</strong></p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">10. DATA SECURITY</h2>
          <p>We implement reasonable safeguards designed to protect personal information from unauthorized access, misuse, loss, disclosure, or alteration. However, no electronic storage or transmission can be guaranteed to be completely secure.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">11. DATA RETENTION</h2>
          <p>We retain personal information only for as long as necessary to fulfill orders, support customer requests, administer the T-Core Performance Promise, or comply with legal, tax, and accounting obligations.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">12. YOUR RIGHTS</h2>
          <p>Subject to applicable law, you may request access to, correction of, updating of, or deletion of your personal information. You can also withdraw consent for marketing communications. Contact us via email to make these requests.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">13. CHILDREN'S PRIVACY</h2>
          <p>BIOMEN LABS products and services are intended for adults aged 18 and above. We do not knowingly collect personal information from individuals under the age of 18. If we identify such collection, we will take steps to delete it.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">14. THIRD-PARTY LINKS</h2>
          <p>Our website may contain links to third-party sites or resources. BIOMEN LABS is not responsible for the privacy policies, content, or practices of external websites.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">15. CHANGES TO THIS PRIVACY POLICY</h2>
          <p>We reserve the right to revise this Privacy Policy at any time. Changes become effective immediately upon publication. Continued website use constitutes acceptance of the revised Policy.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">16. CONTACT US</h2>
          <p>For questions regarding this Privacy Policy or your personal information, please contact:</p>
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

export default Privacy;
