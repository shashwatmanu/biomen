import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, ChevronDown, ChevronUp, Phone, Mail, ShoppingBag, TrendingUp } from 'lucide-react';
import API_URL from '../../utils/api';

const CustomerList = ({ showBanner }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedEmail, setExpandedEmail] = useState(null);

  const fetchCustomers = async (q = '') => {
    setLoading(true);
    try {
      const params = q ? `?search=${encodeURIComponent(q)}` : '';
      const res = await fetch(`${API_URL}/orders/admin/customers${params}`);
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch {
      showBanner('Failed to load customer list', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchCustomers(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchCustomers(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const toggleExpand = (email) => {
    setExpandedEmail(prev => prev === email ? null : email);
  };

  const SHIPPING_COLORS = {
    processing: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    shipped:    'text-blue-400 bg-blue-500/10 border-blue-500/20',
    delivered:  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    cancelled:  'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">Customers</h2>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            {customers.length} unique customer{customers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => fetchCustomers(search)}
          className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="w-full pl-11 pr-5 py-3.5 bg-black/40 border border-white/5 hover:border-white/10 focus:border-[#0FA36B]/50 rounded-2xl text-white text-sm font-semibold placeholder-gray-600 outline-none transition-all"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-[#16C784] animate-pulse flex items-center justify-center gap-2">
          <RefreshCw className="animate-spin" size={16} /> Loading customers...
        </div>
      ) : customers.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs font-black uppercase tracking-widest">
          <Users size={24} className="mx-auto mb-3 text-gray-700" />
          No customers found
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => {
            const isExpanded = expandedEmail === customer.email;
            const paidOrders = customer.orders.filter(o => o.paymentStatus === 'paid');

            return (
              <div
                key={customer.email}
                className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10"
              >
                {/* Customer Row */}
                <button
                  onClick={() => toggleExpand(customer.email)}
                  className="w-full text-left p-5 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#052E22] border border-[#0FA36B]/20 flex items-center justify-center text-[#16C784] font-black text-base flex-shrink-0">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-white text-sm">{customer.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Mail size={9} /> {customer.email}
                          </span>
                          <span className="text-[11px] text-[#16C784] flex items-center gap-1">
                            <Phone size={9} /> {customer.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats + Toggle */}
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Total Spent</p>
                        <p className="text-lg font-black text-[#16C784] font-mono">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Orders</p>
                        <p className="text-lg font-black text-white font-mono">{customer.orderCount}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Paid Orders</p>
                        <p className="text-lg font-black text-white font-mono">{paidOrders.length}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Mobile stats row */}
                  <div className="flex gap-6 mt-3 sm:hidden">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Total Spent</p>
                      <p className="text-base font-black text-[#16C784] font-mono">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Orders</p>
                      <p className="text-base font-black text-white font-mono">{customer.orderCount}</p>
                    </div>
                  </div>
                </button>

                {/* Expanded Order History */}
                {isExpanded && (
                  <div className="border-t border-white/5 p-5 bg-black/20">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                      <ShoppingBag size={9} /> Order History
                    </p>
                    <div className="space-y-2">
                      {customer.orders.map((order, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 px-4 bg-white/3 rounded-xl border border-white/5">
                          <div>
                            <p className="font-mono font-bold text-white text-sm">{order.invoiceNumber}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {order.items.map((item, i) => (
                                <span key={i} className="text-[9px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                                  {item.title} ×{item.quantity}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-white text-base font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mt-1.5 inline-block ${
                              SHIPPING_COLORS[order.shippingStatus] || 'text-gray-400 bg-white/5 border-white/10'
                            }`}>
                              {order.shippingStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
