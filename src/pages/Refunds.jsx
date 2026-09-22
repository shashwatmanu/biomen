import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Refunds = () => {
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
            <Shield size={14} /> Satisfaction Promise
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4 leading-none">
            REFUND, RETURN, CANCELLATION &amp; <br className="hidden md:block" />
            <span className="text-[#16C784]">T-CORE 90-DAY PROMISE</span>
          </h1>
          <p className="text-[#A8B3AA] font-mono text-xs uppercase tracking-widest">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-medium text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            This Refund, Return, Cancellation &amp; T-Core 90-Day Performance Promise Policy ("Policy") applies to all purchases made through the official BIOMEN LABS website operated by DoubleV Labs Private Limited, trading as BIOMEN LABS ("Company", "we", "our", or "us").
          </p>
          <p>
            By purchasing products through our website, you acknowledge that you have read, understood, and agreed to this Policy.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">1. GENERAL POLICY</h2>
          <p>At BIOMEN LABS, we are committed to providing high-quality wellness products and an exceptional customer experience. T-Core is an Ayurvedic Proprietary Medicine intended to support male wellness and vitality. Due to the consumable nature of the product, returns and refunds are limited and subject to the terms outlined in this Policy. We encourage customers to carefully review product information, usage instructions, and eligibility requirements before making a purchase.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">2. DAMAGED, DEFECTIVE, INCORRECT OR TAMPERED PRODUCTS</h2>
          <p>Customers may be eligible for a replacement or refund if:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>The product received is damaged during transit.</li>
            <li>The product received is defective or expired.</li>
            <li>The wrong product was delivered.</li>
            <li>The package appears tampered with at the time of delivery.</li>
          </ul>
          <p>Any such issue must be reported within 24 hours of delivery. To assist with verification, customers may be required to provide clear photographs of the product, packaging, an unboxing video, and other supporting details. Failure to notify us within 24 hours may result in the claim being declined.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">3. NON-RETURNABLE ITEMS</h2>
          <p>Except where expressly permitted under this Policy or required by applicable law, the following are not eligible for return or refund: consumed products, products with broken or removed seals, products damaged due to misuse or improper storage, change-of-mind purchases, orders placed incorrectly, or products purchased from unauthorized sellers.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">4. ORDER CANCELLATION POLICY</h2>
          <p>Orders may be cancelled only before dispatch. Once an order has been dispatched, cancellation requests cannot be accepted. Customers who refuse delivery after dispatch may be responsible for shipping charges, return-to-origin (RTO) charges, handling fees, and other logistics costs incurred by BIOMEN LABS.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">5. CASH ON DELIVERY (COD)</h2>
          <p>Cash on Delivery (COD) may be available for eligible orders. BIOMEN LABS reserves the right to restrict, suspend, or permanently remove COD eligibility for customers who repeatedly refuse COD deliveries, provide inaccurate address details, or otherwise abuse the COD facility.</p>

          <div className="bg-[#052E22]/30 border border-[#0FA36B]/20 rounded-3xl p-6 md:p-8 space-y-6 my-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16C784] animate-ping" />
              6. THE T-CORE 90-DAY PERFORMANCE PROMISE
            </h2>
            <p className="text-gray-300">
              We stand behind the quality of T-Core and the confidence we have in our formulation. Customers who purchase T-Core directly through the official BIOMEN LABS website may be eligible for the T-Core 90-Day Performance Promise. The purpose of this program is to support customers who fully commit to the T-Core protocol and actively participate in the BIOMEN wellness journey.
            </p>
            
            <h3 className="text-lg font-black text-[#16C784] uppercase tracking-wider">7. ELIGIBILITY REQUIREMENTS</h3>
            <p className="text-gray-400">To qualify for consideration under the T-Core 90-Day Performance Promise, customers must:</p>
            <ul className="list-decimal pl-6 space-y-2 text-gray-400">
              <li>Purchase and complete a full 90-day T-Core protocol consisting of three bottles.</li>
              <li>Purchase all products directly through the official BIOMEN LABS website.</li>
              <li>Follow the recommended dosage instructions throughout the protocol period.</li>
              <li>Complete the BIOMEN onboarding questionnaire, participate in check-ins, and complete the complimentary Ayurvedic consultation.</li>
              <li>Provide a <strong>Baseline Testosterone Assessment</strong> (Total Testosterone blood test report obtained from an accredited lab within 30 days prior to commencing the protocol).</li>
              <li>Provide a <strong>Post-Protocol Testosterone Assessment</strong> (Total Testosterone blood test report from an accredited lab following completion of the 90-day protocol).</li>
            </ul>
            <p className="text-xs text-gray-500 italic">Claims must be submitted within fifteen (15) calendar days following completion of the 90-day protocol. Claims submitted after this period will not be considered.</p>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">8. CLAIM REVIEW PROCESS</h2>
          <p>All Performance Promise claims are reviewed individually by the Customer Success Team. Customers may be asked to provide proof of purchase, check-in responses, and baseline &amp; post-protocol lab reports. Approval of a claim remains subject to verification that all requirements have been met. BIOMEN LABS reserves the right to reject incomplete, inaccurate, or fraudulent claims.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">9. RESOLUTION OPTIONS</h2>
          <p>Where a claim is approved, BIOMEN LABS may offer store credit, product replacement, additional consultation support, or a cash refund. Store credit may be offered as the primary resolution. Cash refunds will be processed via original payment method (prepaid) or bank transfer/UPI (COD).</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">10. REFUND PROCESSING TIMELINES</h2>
          <p>Approved refunds will generally be processed within 7–10 business days. Banking institutions, payment gateways, and providers may require additional processing time beyond the control of BIOMEN LABS.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">11. THIRD-PARTY MARKETPLACE PURCHASES</h2>
          <p>The T-Core 90-Day Performance Promise applies exclusively to purchases made through the official BIOMEN LABS website. Products purchased through Amazon, Flipkart, retail stores, pharmacies, or other resellers are governed by the return and refund policies of those respective platforms.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">12. CONTACT INFORMATION</h2>
          <p>For refund requests, support inquiries, or Performance Promise claims, please contact:</p>
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

export default Refunds;
