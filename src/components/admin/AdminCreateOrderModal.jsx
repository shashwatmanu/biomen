import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShoppingBag, Truck, User, Plus, Trash2, ShieldCheck, Mail, Phone, MapPin, Tag, Building2, PackageCheck } from 'lucide-react';
import API_URL from '../../utils/api';

const AdminCreateOrderModal = ({ onClose, onOrderCreated }) => { console.log("MODAL RENDERED");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form State
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', gstNumber: '' });
  const [shippingAddress, setShippingAddress] = useState({ street: '', city: '', state: '', postalCode: '', country: 'India' });
  const [orderItems, setOrderItems] = useState([]); // { product: {}, quantity: 1, customPrice: null }
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, paid
  const [orderType, setOrderType] = useState('retail'); // retail, wholesale
  const [pushToDelhivery, setPushToDelhivery] = useState(false);
  const [shippingCharges, setShippingCharges] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products/admin/all`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('biolabs_admin_session')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddItem = (productId) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    // Check if already in list
    const exists = orderItems.find(i => i.product._id === productId);
    if (exists) {
      setOrderItems(orderItems.map(i => i.product._id === productId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1, customPrice: product.price }]);
    }
  };

  const handleUpdateItem = (productId, field, value) => {
    setOrderItems(orderItems.map(i => {
      if (i.product._id === productId) {
        return { ...i, [field]: value };
      }
      return i;
    }));
  };

  const handleRemoveItem = (productId) => {
    setOrderItems(orderItems.filter(i => i.product._id !== productId));
  };

  // Calculations
  const subtotal = orderItems.reduce((sum, item) => sum + (Number(item.customPrice) * Number(item.quantity)), 0);
  const totalAmount = subtotal + Number(shippingCharges);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      setError('Please add at least one item to the order.');
      return;
    }

    setLoading(true);
    setError('');

    // Format items for backend
    const formattedItems = orderItems.map(i => ({
      productId: i.product._id,
      title: i.product.title,
      price: Number(i.customPrice),
      quantity: Number(i.quantity)
    }));

    const payload = {
      guestDetails,
      shippingAddress,
      items: formattedItems,
      subtotal,
      shippingCharges: Number(shippingCharges),
      totalAmount,
      paymentStatus,
      orderType,
      pushToDelhivery
    };

    try {
      const res = await fetch(`${API_URL}/orders/admin/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('biolabs_admin_session')}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onOrderCreated(data);
          onClose();
        }, 1500);
      } else {
        setError(data.error || 'Failed to create order');
      }
    } catch (err) {
      setError('Server error while creating order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#052E22] border border-[#0FA36B]/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#16C784]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-[#16C784]" size={32} />
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">Order Created!</h2>
          <p className="text-xs text-gray-400">The invoice has been generated successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A1410] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0FA36B]/20 flex items-center justify-center border border-[#0FA36B]/30 text-[#16C784]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Manual Order Entry</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Generate Invoice & Fulfillment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
              <X size={14} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Customer & Shipping */}
            <div className="space-y-6">
              
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-2">
                  <User size={12} /> Customer Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <input type="text" placeholder="Full Name" required value={guestDetails.name} onChange={e => setGuestDetails({...guestDetails, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type="email" placeholder="Email" value={guestDetails.email} onChange={e => setGuestDetails({...guestDetails, email: e.target.value})} className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                    </div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type="tel" placeholder="Phone" required value={guestDetails.phone} onChange={e => setGuestDetails({...guestDetails, phone: e.target.value})} className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                    </div>
                  </div>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="text" placeholder="GST Number (Optional)" value={guestDetails.gstNumber} onChange={e => setGuestDetails({...guestDetails, gstNumber: e.target.value.toUpperCase()})} className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none uppercase" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-2">
                  <MapPin size={12} /> Shipping Address
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Street Address / Building" required value={shippingAddress.street} onChange={e => setShippingAddress({...shippingAddress, street: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="City" required value={shippingAddress.city} onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                    <input type="text" placeholder="State" required value={shippingAddress.state} onChange={e => setShippingAddress({...shippingAddress, state: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Postal Code (PIN)" required value={shippingAddress.postalCode} onChange={e => setShippingAddress({...shippingAddress, postalCode: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                    <input type="text" placeholder="Country" value={shippingAddress.country} onChange={e => setShippingAddress({...shippingAddress, country: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-[#0FA36B] outline-none" />
                  </div>
                </div>
              </div>

              {/* Order Settings */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Tag size={12} /> Order Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Order Type</label>
                    <select value={orderType} onChange={e => setOrderType(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-[#0FA36B]">
                      <option value="retail">Retail B2C</option>
                      <option value="wholesale">Wholesale B2B</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Payment Status</label>
                    <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-[#0FA36B]">
                      <option value="pending">Pending (Unpaid)</option>
                      <option value="paid">Paid (Cash/Bank)</option>
                    </select>
                  </div>
                </div>

                {paymentStatus === 'paid' && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setPushToDelhivery(!pushToDelhivery)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${pushToDelhivery ? 'bg-[#0FA36B] border-[#0FA36B]' : 'bg-transparent border-white/20'}`}>
                      {pushToDelhivery && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5"><Truck size={12}/> Auto-Push to Delhivery</p>
                      <p className="text-[10px] text-gray-500">Automatically manifest this order for shipping.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Items */}
            <div className="space-y-6 flex flex-col h-full">
              
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-2">
                  <ShoppingBag size={12} /> Add Products
                </h3>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 bg-white/5 border border-[#0FA36B]/30 rounded-xl text-sm text-white outline-none focus:border-[#0FA36B] appearance-none"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddItem(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a product from catalog...</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.title} (₹{p.price})</option>
                    ))}
                  </select>
                  <Plus size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#16C784] pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col min-h-[200px]">
                {orderItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-50">
                    <PackageCheck size={32} className="mb-2" />
                    <p className="text-xs font-bold">No items added yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {orderItems.map(item => (
                      <div key={item.product._id} className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <ShoppingBag size={16} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white line-clamp-1">{item.product.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <input 
                              type="number" 
                              min="1"
                              value={item.quantity} 
                              onChange={(e) => handleUpdateItem(item.product._id, 'quantity', e.target.value)}
                              className="w-16 bg-white/10 border border-white/10 rounded-md px-2 py-1 text-xs text-white outline-none"
                            />
                            <span className="text-gray-500 text-[10px]">x</span>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">₹</span>
                              <input 
                                type="number" 
                                value={item.customPrice} 
                                onChange={(e) => handleUpdateItem(item.product._id, 'customPrice', e.target.value)}
                                className="w-24 bg-white/10 border border-white/10 rounded-md pl-5 pr-2 py-1 text-xs text-white outline-none"
                              />
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveItem(item.product._id)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Summary */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 items-center">
                    <span>Shipping</span>
                    <div className="flex items-center gap-1">
                      <span>₹</span>
                      <input 
                        type="number" 
                        value={shippingCharges} 
                        onChange={(e) => setShippingCharges(e.target.value)}
                        className="w-16 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white text-right outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/5">
                    <span>Total Amount</span>
                    <span className="text-[#16C784]">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black flex items-center gap-1">
            <Building2 size={10}/> Biomen Labs Internal
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-6 py-3 text-xs font-bold text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={loading || orderItems.length === 0 || !guestDetails.name || !shippingAddress.street}
              className="px-8 py-3 bg-[#0FA36B] hover:bg-[#16C784] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#0FA36B]/20 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShieldCheck size={14} />
              )}
              {loading ? 'Processing...' : 'Generate Invoice'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCreateOrderModal;
