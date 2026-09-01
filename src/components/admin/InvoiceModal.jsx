import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style type="text/css">
        {`
          @media print {
            body * { visibility: hidden !important; }
            #invoice-print-area, #invoice-print-area * { visibility: visible !important; }
            #invoice-print-area { 
              position: absolute !important; 
              left: 0 !important; 
              top: 0 !important; 
              width: 100% !important;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 20px !important;
              overflow: visible !important;
              min-height: auto !important;
              height: auto !important;
            }
            @page { margin: 0.5cm; }
          }
        `}
      </style>
      <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        {/* Modal Box */}
        <div id="invoice-print-area" className="bg-[#06110C] border border-[#0FA36B]/20 rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Header Controls (Hidden in Print Mode) */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#16C784]" />
            <span className="text-xs font-black uppercase text-white tracking-widest">Biomen Labs Order Invoice</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#0FA36B] hover:bg-[#16C784] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all"
            >
              <Printer size={12} /> Print Invoice
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div className="space-y-6 text-[#F4F6F2] print:text-black font-sans">
          
          {/* Top Brand Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 print:border-black/20 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-4">
                <img src="/blacklogo.png" alt="Biomen Labs Logo" className="h-14 w-auto object-contain" />
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white print:text-black uppercase leading-none">BIOMEN LABS</h2>
                  <p className="text-[10px] sm:text-xs text-[#A8B3AA] print:text-black/60 font-bold uppercase tracking-wider mt-1">ANCIENT HERBS, MODERN SCIENCE</p>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs font-black text-[#16C784] uppercase tracking-widest">INVOICE SERIAL</div>
              <div className="text-lg font-mono font-bold text-white print:text-black mt-0.5">{order.invoiceNumber || 'INV-TEMP-999'}</div>
              <div className="text-[10px] text-gray-400 print:text-black/60 font-medium mt-1">Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
            </div>
          </div>

          {/* Billing & Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-white/10 print:border-black/20 pb-6">
            <div>
              <h4 className="font-black text-[#BFA46A] print:text-black uppercase tracking-widest mb-2">SOLD BY</h4>
              <p className="font-bold text-white print:text-black">Biomen Labs India Ltd.</p>
              <p className="text-gray-400 print:text-black/70 mt-1 leading-relaxed">
                Plot 4 Ramprastha Greens<br />
                Vaishali, Ghaziabad<br />
                Phone: 8595770970<br />
                Contact: info@biomenlabs.com
              </p>
            </div>
            <div>
              <h4 className="font-black text-[#BFA46A] print:text-black uppercase tracking-widest mb-2">SHIPPED TO</h4>
              <p className="font-bold text-white print:text-black">{order.guestDetails?.name || order.user?.name || 'Customer'}</p>
              <p className="text-gray-400 print:text-black/70 mt-1 leading-relaxed">
                {order.shippingAddress?.street}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}<br />
                {order.shippingAddress?.country || 'India'}<br />
                Phone: {order.guestDetails?.phone || 'N/A'}
                {order.guestDetails?.gstNumber && (
                  <><br /><span className="font-bold text-white print:text-black">GSTIN: {order.guestDetails.gstNumber}</span></>
                )}
              </p>
            </div>
          </div>

          {/* Itemized Order list */}
          <div>
            <h4 className="text-xs font-black text-[#BFA46A] print:text-black uppercase tracking-widest mb-3">ITEMIZED BILLING</h4>
            <div className="w-full overflow-hidden border border-white/10 print:border-black/20 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white/5 print:bg-black/5 text-[#A8B3AA] print:text-black font-black uppercase tracking-wider border-b border-white/10 print:border-black/20">
                    <th className="p-3">Product Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-black/10">
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-white print:text-black">{item.title}</td>
                      <td className="p-3 text-center font-mono font-bold">{item.quantity}</td>
                      <td className="p-3 text-right font-mono">₹{item.price.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono font-bold text-white print:text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Section: Bank Details & Totals */}
          <div className="flex flex-col sm:flex-row justify-between pt-4 gap-6 border-t border-white/5 print:border-black/10">
            
            {/* Bank Details */}
            <div className="w-full sm:w-1/2 space-y-1.5 text-[9px] text-gray-400 print:text-black/80 font-mono leading-relaxed bg-white/5 print:bg-gray-50 p-4 rounded-xl border border-white/10 print:border-black/10">
              <p className="font-bold text-white print:text-black mb-2 text-xs font-sans uppercase tracking-widest">Bank Details</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <p><span className="font-semibold text-gray-500 print:text-black/60">Company:</span><br/>DOUBLEV LABS PVT LTD</p>
                <p><span className="font-semibold text-gray-500 print:text-black/60">Account:</span><br/>10277126671</p>
                <p><span className="font-semibold text-gray-500 print:text-black/60">IFSC:</span><br/>IDFB0021414</p>
                <p><span className="font-semibold text-gray-500 print:text-black/60">SWIFT:</span><br/>IDFBINBBMUM</p>
                <p><span className="font-semibold text-gray-500 print:text-black/60">Bank:</span><br/>IDFC FIRST</p>
                <p><span className="font-semibold text-gray-500 print:text-black/60">Branch:</span><br/>Vasundhara Ghaziabad</p>
              </div>
              <p className="pt-2 mt-2 border-t border-white/10 print:border-black/10 text-[#16C784] print:text-green-700 font-bold flex items-center gap-2">
                <span className="text-gray-500 print:text-black/60 text-[8px] uppercase tracking-wider font-sans">UPI</span> 8595070970@idfcbank
              </p>
            </div>

            {/* Pricing Totals */}
            <div className="w-full sm:w-64 space-y-2 text-xs pt-2">
              <div className="flex justify-between text-gray-400 print:text-black/70">
                <span>Subtotal:</span>
                <span className="font-mono">₹{order.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400 print:text-black/70">
                <span>Shipping Charges:</span>
                <span className="font-mono text-[#16C784]">FREE</span>
              </div>
              {order.totalAmount < (order.subtotal + (order.shippingCharges || 0)) && (
                <div className="flex justify-between text-[#16C784] print:text-green-700">
                  <span>Discounts Applied:</span>
                  <span className="font-mono">-₹{Math.round((order.subtotal + (order.shippingCharges || 0)) - order.totalAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400 print:text-black/70 border-b border-white/10 print:border-black/20 pb-2">
                <span>Taxes & Duties (GST):</span>
                <span className="font-mono">
                  {order.totalAmount > (order.subtotal + (order.shippingCharges || 0))
                    ? `₹${Math.round(order.totalAmount - order.subtotal - (order.shippingCharges || 0)).toLocaleString('en-IN')} (Added)`
                    : 'Inclusive'}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white print:text-black pt-1">
                <span>TOTAL AMOUNT:</span>
                <span className="font-mono text-[#16C784] print:text-black">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer print note */}
        <div className="mt-8 border-t border-white/5 print:border-black/10 pt-4 text-center text-[10px] text-gray-500 print:text-black/60 font-semibold uppercase tracking-wider">
          Thank you for prescribing to the T-CORE Masculine Vitality protocol. This is a computer-generated tax receipt.
        </div>

      </div>
    </div>
    </>
  );
};

export default InvoiceModal;
