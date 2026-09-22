import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Shipping = () => {
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
            <Shield size={14} /> Fulfilment Protocol
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
            SHIPPING &amp; DELIVERY POLICY
          </h1>
          <p className="text-[#A8B3AA] font-mono text-xs uppercase tracking-widest">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-medium text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            This Shipping &amp; Delivery Policy applies to purchases made through the official BIOMEN LABS website operated by DoubleV Labs Private Limited, trading as BIOMEN LABS ("BIOMEN LABS", "Company", "we", "our", or "us").
          </p>
          <p>
            By placing an order through our website, you acknowledge and agree to the terms of this Shipping &amp; Delivery Policy.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">1. SHIPPING COVERAGE</h2>
          <p>BIOMEN LABS currently ships products within India only. We strive to serve customers across a wide range of serviceable locations through trusted third-party logistics and courier partners. Availability of delivery services may vary depending on location, courier coverage, and operational conditions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">2. ORDER PROCESSING</h2>
          <p>Orders are typically processed within 1–2 business days after successful order placement and payment confirmation. Orders placed on weekends, public holidays, or non-business days may be processed on the next business day. During promotional campaigns, product launches, or festive periods, processing times may be extended.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">3. ESTIMATED DELIVERY TIMELINES</h2>
          <p>Once dispatched, most orders are typically delivered within 3–7 business days depending on the delivery location. Delivery timelines are estimates only and should not be interpreted as guaranteed delivery commitments. Actual delivery times may vary based on destination, courier partner operations, public holidays, weather conditions, or regional disruptions.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">4. SHIPPING CHARGES</h2>
          <p>BIOMEN LABS currently offers free standard shipping across India on eligible orders placed through the official website. BIOMEN LABS reserves the right to modify shipping charges, promotional shipping offers, or shipping eligibility criteria at any time. Any applicable charges will be displayed during checkout before order confirmation.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">5. CASH ON DELIVERY (COD)</h2>
          <p>Cash on Delivery ("COD") may be available for eligible orders and locations. To improve delivery success rates and reduce fraudulent orders, BIOMEN LABS reserves the right to request partial advance payment, order confirmation fees, verification payments, or prepaid confirmation charges for certain COD orders at its sole discretion. Such amounts will be adjusted against the final order value. We also reserve the right to restrict COD eligibility for customers who repeatedly refuse deliveries.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">6. CUSTOMER RESPONSIBILITY</h2>
          <p>Customers are responsible for ensuring that all shipping and contact information provided during checkout (full name, delivery address, postal code, mobile number, and email) is accurate, complete, and up to date. BIOMEN LABS shall not be responsible for delays, failed deliveries, or return-to-origin (RTO) charges arising from inaccurate or incomplete information supplied by the customer.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">7. DELIVERY ATTEMPTS</h2>
          <p>Delivery of orders is subject to the policies of the courier partner handling the shipment. Customers are encouraged to remain available to receive delivery communications. Failure to accept delivery, repeated unavailability, or inability to contact the recipient may result in return-to-origin processing. Additional shipping or handling charges may apply in such cases.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">8. DELAYS BEYOND OUR CONTROL</h2>
          <p>While BIOMEN LABS makes reasonable efforts to ensure timely delivery, certain circumstances may be beyond our control. Such circumstances may include severe weather conditions, natural disasters, transport disruptions, regional restrictions, courier partner delays, or public emergencies. BIOMEN LABS shall not be liable for delays arising from such events.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">9. PROOF OF DELIVERY</h2>
          <p>Once a shipment is marked as delivered by the logistics partner, BIOMEN LABS may rely upon such delivery confirmation as evidence of successful delivery. However, where a customer raises a genuine delivery dispute, BIOMEN LABS may investigate the matter in good faith and request additional information from the customer and/or logistics partner.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">10. DAMAGED OR TAMPERED SHIPMENTS</h2>
          <p>Customers should inspect packages upon delivery. If a shipment appears damaged, tampered with, or incorrect, customers should report the issue to BIOMEN LABS within 24 hours of delivery. Customers may be asked to provide photographs of the package, the product, or an unboxing video. Claims submitted after the required 24-hour reporting period may not be eligible for review.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">11. ORDER TRACKING</h2>
          <p>Where available, customers will receive shipment tracking information through email, SMS, WhatsApp, or other communication channels. Tracking updates are provided by third-party logistics partners and may occasionally experience delays beyond the control of BIOMEN LABS.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">12. CHANGES TO THIS POLICY</h2>
          <p>BIOMEN LABS reserves the right to modify, update, or revise this Shipping &amp; Delivery Policy at any time. Any changes become effective immediately upon publication on the website. Continued use of the website following publication of changes constitutes acceptance of the revised Policy.</p>

          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider pt-4">13. CONTACT US</h2>
          <p>For shipping-related enquiries, please contact:</p>
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

export default Shipping;
