import React, { useState } from 'react';
import {
  X, MapPin, Package, CreditCard, Truck, CheckCircle2,
  XCircle, Send, Edit3, Save, Phone, Mail, User, Hash,
  Calendar, ArrowRight, ShoppingBag, FileText
} from 'lucide-react';
import API_URL from '../../utils/api';

const STATUS_CONFIG = {
  processing: { label: 'Processing', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  shipped:    { label: 'Shipped',    color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
  delivered:  { label: 'Delivered',  color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20' },
  cancelled:  { label: 'Cancelled',  color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
};

const PAYMENT_CONFIG = {
  paid:    { label: 'Paid',    color: 'text-biomen-accent', bg: 'bg-biomen-surface', border: 'border-[#0FA36B]/20' },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  failed:  { label: 'Failed',  color: 'text-red-400',   bg: 'bg-red-500/10',  border: 'border-red-500/20' },
};

const OrderDetailPanel = ({ order, onClose, onRefresh, showBanner, onGenerateInvoice }) => {
  const [trackingInput, setTrackingInput] = useState(order?.trackingNumber || '');
  const [editingTracking, setEditingTracking] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);

  if (!order) return null;

  const shipping = STATUS_CONFIG[order.shippingStatus] || STATUS_CONFIG.processing;
  const payment  = PAYMENT_CONFIG[order.paymentStatus] || PAYMENT_CONFIG.pending;
  const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium', timeStyle: 'short'
  });

  const doAction = async (url, method = 'PUT', body = {}) => {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json();
  };

  const handleShipViaDelhivery = async () => {
    setLoadingAction('delhivery');
    const data = await doAction(`${API_URL}/orders/admin/${order._id}/delhivery`);
    if (data.success) {
      showBanner(`🚀 Pushed to Delhivery! AWB: ${data.order.trackingNumber}`);
      onRefresh();
    } else showBanner(data.error || 'Failed', 'error');
    setLoadingAction(null);
  };

  const handleSetTracking = async () => {
    if (!trackingInput.trim()) return;
    setLoadingAction('tracking');
    const data = await doAction(`${API_URL}/orders/admin/${order._id}/tracking`, 'PUT', {
      trackingNumber: trackingInput.trim()
    });
    if (data.success) {
      showBanner('✅ Tracking number saved!');
      setEditingTracking(false);
      onRefresh();
    } else showBanner(data.error || 'Failed', 'error');
    setLoadingAction(null);
  };

  const handleMarkDelivered = async () => {
    setLoadingAction('delivered');
    const data = await doAction(`${API_URL}/orders/admin/${order._id}/status`, 'PUT', { shippingStatus: 'delivered' });
    if (data.success) { showBanner('✅ Order marked as Delivered!'); onRefresh(); }
    else showBanner(data.error || 'Failed', 'error');
    setLoadingAction(null);
  };

  const handleUpdatePaymentStatus = async (status) => {
    setLoadingAction('payment');
    const data = await doAction(`${API_URL}/orders/admin/${order._id}/payment`, 'PUT', { paymentStatus: status });
    if (data.success) { showBanner(`✅ Payment status updated to ${status}!`); onRefresh(); }
    else showBanner(data.error || 'Failed', 'error');
    setLoadingAction(null);
  };

  const handleCancel = async () => {
    if (!window.confirm('Cancel this order? This action cannot be undone.')) return;
    setLoadingAction('cancel');
    const data = await doAction(`${API_URL}/orders/admin/${order._id}/status`, 'PUT', { shippingStatus: 'cancelled' });
    if (data.success) { showBanner('Order cancelled.', 'error'); onRefresh(); }
    else showBanner(data.error || 'Failed', 'error');
    setLoadingAction(null);
  };

  const progressSteps = ['processing', 'shipped', 'delivered'];
  const currentStep = progressSteps.indexOf(order.shippingStatus);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-biomen-bg-primary/60 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[520px] bg-[#080F0C] border-l border-biomen-text-primary/10 z-[210] overflow-y-auto shadow-2xl flex flex-col"
        style={{ animation: 'slideInRight 0.25s ease-out' }}>

        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b border-biomen-text-primary/10 sticky top-0 bg-[#080F0C] z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-biomen-text-secondary mb-1">Order Detail</p>
            <h2 className="text-lg font-black text-biomen-text-primary font-mono">{order.invoiceNumber || 'INV-NONE'}</h2>
            <p className="text-[11px] text-biomen-text-secondary mt-0.5 flex items-center gap-1.5">
              <Calendar size={10} /> {formattedDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onGenerateInvoice?.(order)}
              className="flex items-center gap-2 px-4 py-2 bg-biomen-text-primary/5 border border-biomen-text-primary/10 hover:border-[#0FA36B]/50 hover:bg-biomen-emerald/10 text-biomen-text-primary hover:text-biomen-accent rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            >
              <FileText size={14} /> Invoice
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-biomen-text-primary/5 hover:bg-biomen-text-primary/10 text-biomen-text-secondary hover:text-biomen-text-primary transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">

          {/* Status Badges Row */}
          <div className="flex gap-3">
            <select
              value={order.paymentStatus}
              onChange={(e) => handleUpdatePaymentStatus(e.target.value)}
              disabled={loadingAction === 'payment'}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${payment.bg} ${payment.color} ${payment.border} cursor-pointer outline-none transition-all focus:ring-1 focus:ring-white/20`}
            >
              <option value="pending" className="bg-biomen-bg-secondary text-yellow-400">💳 PENDING</option>
              <option value="paid" className="bg-biomen-bg-secondary text-biomen-accent">💳 PAID</option>
              <option value="failed" className="bg-biomen-bg-secondary text-red-400">💳 FAILED</option>
            </select>
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${shipping.bg} ${shipping.color} ${shipping.border}`}>
              📦 {shipping.label}
            </span>
          </div>

          {/* Order Progress Bar */}
          {order.shippingStatus !== 'cancelled' && (
            <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary mb-4">Fulfillment Progress</p>
              <div className="flex items-center gap-0">
                {progressSteps.map((step, idx) => {
                  const isDone = currentStep > idx;
                  const isCurrent = currentStep === idx;
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] transition-all ${
                          isDone ? 'bg-biomen-emerald border-[#0FA36B] text-biomen-text-primary' :
                          isCurrent ? 'bg-biomen-emerald/20 border-[#0FA36B] text-biomen-accent' :
                          'bg-biomen-text-primary/5 border-biomen-text-primary/10 text-gray-600'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${isCurrent ? 'text-biomen-accent' : isDone ? 'text-biomen-text-secondary' : 'text-gray-600'}`}>
                          {step}
                        </span>
                      </div>
                      {idx < progressSteps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 mb-5 ${isDone ? 'bg-biomen-emerald' : 'bg-biomen-text-primary/10'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customer Info */}
          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary flex items-center gap-2">
              <User size={10} /> Customer Information
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <User size={13} className="text-biomen-text-secondary flex-shrink-0" />
                <span className="text-sm font-bold text-biomen-text-primary">{order.guestDetails?.name || 'Registered User'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={13} className="text-biomen-text-secondary flex-shrink-0" />
                <span className="text-sm text-biomen-text-primary">{order.guestDetails?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={13} className="text-biomen-text-secondary flex-shrink-0" />
                <span className="text-sm font-bold text-biomen-accent">{order.guestDetails?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary flex items-center gap-2">
              <MapPin size={10} /> Ship To
            </p>
            <div className="text-sm text-biomen-text-primary leading-relaxed">
              <span className="text-biomen-text-primary font-bold block">{order.shippingAddress?.street}</span>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.postalCode}
              <br />{order.shippingAddress?.country}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary flex items-center gap-2">
              <ShoppingBag size={10} /> Order Items
            </p>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-biomen-text-primary/5 last:border-0">
                  <div>
                    <span className="text-sm font-bold text-biomen-text-primary block">{item.title}</span>
                    <span className="text-[11px] text-biomen-text-secondary">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-sm font-black text-biomen-accent">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-biomen-text-primary/10 space-y-1.5">
              <div className="flex justify-between text-sm text-biomen-text-secondary">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-biomen-text-secondary">
                <span>Shipping</span>
                <span className="text-biomen-accent">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-biomen-text-primary pt-2 border-t border-biomen-text-primary/10">
                <span>Total Paid</span>
                <span className="text-biomen-accent">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary flex items-center gap-2">
              <CreditCard size={10} /> Payment Details
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-biomen-text-secondary">Method</span>
                <span className="text-biomen-text-primary font-bold">{order.paymentMethod || 'Razorpay'}</span>
              </div>
              {order.razorpayOrderId && (
                <div className="flex justify-between">
                  <span className="text-biomen-text-secondary">Rzp Order ID</span>
                  <span className="text-biomen-text-primary font-mono text-[11px]">{order.razorpayOrderId}</span>
                </div>
              )}
              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-biomen-text-secondary">Rzp Payment ID</span>
                  <span className="text-biomen-text-primary font-mono text-[11px]">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Number */}
          <div className="bg-biomen-bg-primary/40 border border-biomen-text-primary/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-widest text-biomen-text-secondary flex items-center gap-2">
                <Truck size={10} /> Tracking
              </p>
              {!editingTracking && (
                <button onClick={() => setEditingTracking(true)}
                  className="p-1.5 rounded-lg hover:bg-biomen-text-primary/5 text-biomen-text-secondary hover:text-biomen-text-primary transition-all cursor-pointer">
                  <Edit3 size={12} />
                </button>
              )}
            </div>
            {editingTracking ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  placeholder="Enter tracking / AWB number..."
                  className="flex-1 px-3 py-2.5 bg-biomen-text-primary/5 border border-biomen-text-primary/10 focus:border-[#0FA36B]/50 rounded-xl text-biomen-text-primary text-sm font-mono outline-none"
                />
                <button
                  onClick={handleSetTracking}
                  disabled={loadingAction === 'tracking'}
                  className="px-3 py-2.5 bg-biomen-emerald hover:bg-biomen-accent text-biomen-text-primary rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save size={12} /> Save
                </button>
              </div>
            ) : (
              <div>
                {order.trackingNumber ? (
                  <span className="text-biomen-accent font-mono font-bold text-sm bg-biomen-surface px-3 py-1.5 rounded-lg border border-[#0FA36B]/20 inline-block">
                    {order.trackingNumber}
                  </span>
                ) : (
                  <span className="text-gray-600 text-sm italic">No tracking number set</span>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Action Buttons — Sticky Footer */}
        {order.shippingStatus !== 'cancelled' && order.shippingStatus !== 'delivered' && (
          <div className="sticky bottom-0 bg-[#080F0C] border-t border-biomen-text-primary/10 p-5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-3">Fulfillment Actions</p>

            {order.shippingStatus === 'processing' && (
              <button 
                onClick={handleShipViaDelhivery}
                disabled={!!loadingAction}
                className="w-full py-4 bg-biomen-emerald hover:bg-biomen-accent text-biomen-text-primary rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#0FA36B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Truck size={14} />
                {loadingAction === 'delhivery' ? 'Pushing to Delhivery...' : 'Approve & Push to Delhivery'}
              </button>
            )}

            {order.shippingStatus === 'shipped' && (
              <button
                onClick={handleMarkDelivered}
                disabled={!!loadingAction}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-biomen-text-primary rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 size={14} />
                {loadingAction === 'delivered' ? 'Updating...' : 'Mark as Delivered'}
              </button>
            )}

            <button
              onClick={handleCancel}
              disabled={!!loadingAction}
              className="w-full py-3 bg-red-950/40 hover:bg-red-950/60 border border-red-900/30 text-red-400 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <XCircle size={14} />
              {loadingAction === 'cancel' ? 'Cancelling...' : 'Cancel Order'}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default OrderDetailPanel;
