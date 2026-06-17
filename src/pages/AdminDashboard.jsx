import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Users, ShoppingBag, AlertTriangle,
  Search, ShieldAlert, LogOut, FileText, CheckCircle2,
  Truck, ArrowRightLeft, RefreshCw, Send, LayoutDashboard,
  Package, Mail, Settings, Menu, X, Activity,
  BarChart3, Clock, Zap, Download, Phone, Bell,
  Wifi, WifiOff, DollarSign
} from 'lucide-react';
import API_URL from '../utils/api';
import InvoiceModal from '../components/admin/InvoiceModal';
import EmailDashboard from '../components/admin/EmailDashboard';
import OrderDetailPanel from '../components/admin/OrderDetailPanel';
import InventoryPanel from '../components/admin/InventoryPanel';
import CustomerList from '../components/admin/CustomerList';

// ─── Mini Revenue Chart ───────────────────────────────────────────────────────
const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1.5 h-28">
        {data.map((day, idx) => {
          const height = maxRevenue > 0 ? Math.max(4, (day.revenue / maxRevenue) * 100) : 4;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 bg-[#0A1410] border border-white/10 rounded-xl px-3 py-2 text-center whitespace-nowrap shadow-xl">
                <p className="text-[10px] font-black text-[#16C784]">₹{day.revenue.toLocaleString('en-IN')}</p>
                <p className="text-[9px] text-gray-500">{day.orders} order{day.orders !== 1 ? 's' : ''}</p>
              </div>
              <div
                className={`w-full rounded-t-lg transition-all cursor-default ${
                  day.revenue > 0 ? 'bg-gradient-to-t from-[#0FA36B] to-[#16C784] opacity-80 group-hover:opacity-100' : 'bg-white/5'
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5">
        {data.map((day, idx) => (
          <div key={idx} className="flex-1 text-center">
            <span className="text-[8px] font-bold text-gray-600">{day.date.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Dashboard Overview Tab ───────────────────────────────────────────────────
const DashboardOverview = ({ stats, onRefresh }) => {
  if (!stats) return (
    <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-[#16C784] animate-pulse flex items-center justify-center gap-2">
      <RefreshCw className="animate-spin" size={16} /> Loading dashboard...
    </div>
  );

  const kpis = [
    {
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue?.toLocaleString('en-IN') || '0'}`,
      icon: <TrendingUp size={18} />,
      sub: `${stats.payments?.paid || 0} paid orders`,
      accent: '#16C784'
    },
    {
      label: 'Avg. Order Value',
      value: `₹${stats.avgOrderValue?.toLocaleString('en-IN') || '0'}`,
      icon: <DollarSign size={18} />,
      sub: 'per paid order',
      accent: '#BFA46A'
    },
    {
      label: 'Total Orders',
      value: stats.totalOrdersCount || 0,
      icon: <ShoppingBag size={18} />,
      sub: `${stats.shipping?.processing || 0} pending fulfillment`,
      accent: '#60A5FA'
    },
    {
      label: 'Subscribers',
      value: stats.totalSubscribers || 0,
      icon: <Users size={18} />,
      sub: 'newsletter list',
      accent: '#A78BFA'
    },
  ];

  const shipmentCards = [
    { label: 'Processing', value: stats.shipping?.processing || 0, color: 'text-yellow-400', dot: 'bg-yellow-400' },
    { label: 'Shipped',    value: stats.shipping?.shipped    || 0, color: 'text-blue-400',   dot: 'bg-blue-400' },
    { label: 'Delivered',  value: stats.shipping?.delivered  || 0, color: 'text-emerald-400',dot: 'bg-emerald-400' },
    { label: 'Cancelled',  value: stats.shipping?.cancelled  || 0, color: 'text-red-400',    dot: 'bg-red-400' },
  ];

  return (
    <div className="space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-black/40 border border-white/5 rounded-3xl p-5 relative overflow-hidden hover:border-white/10 transition-all group">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-15 transition-all"
              style={{ background: kpi.accent, filter: 'blur(20px)' }} />
            <div className="p-2.5 rounded-2xl border w-fit mb-4" style={{ color: kpi.accent, borderColor: `${kpi.accent}30`, backgroundColor: `${kpi.accent}12` }}>
              {kpi.icon}
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{kpi.label}</p>
            <p className="text-2xl font-black text-white font-mono mt-1">{kpi.value}</p>
            <p className="text-[10px] text-gray-600 mt-1 font-semibold">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Shipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Revenue — Last 7 Days</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Hover bars for daily breakdown</p>
            </div>
            <BarChart3 size={16} className="text-gray-600" />
          </div>
          <RevenueChart data={stats.dailyRevenue} />
        </div>

        {/* Shipment Status */}
        <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <Truck size={14} className="text-gray-500" /> Fulfillment
          </h3>
          <div className="space-y-4">
            {shipmentCards.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <span className="text-xs font-bold text-gray-400">{s.label}</span>
                </div>
                <span className={`text-xl font-black font-mono ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Low Stock Alerts</span>
              <span className={`text-base font-black font-mono ${stats.lowStockAlertCount > 0 ? 'text-red-400' : 'text-[#16C784]'}`}>
                {stats.lowStockAlertCount}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold text-gray-500">Retail / Wholesale</span>
              <span className="text-sm font-black text-white font-mono">
                {stats.types?.retail || 0} / {stats.types?.wholesale || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      {stats.recentActivity && stats.recentActivity.length > 0 && (
        <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <Activity size={14} className="text-gray-500" /> Recent Paid Orders
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((order, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 px-4 bg-white/3 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#052E22] border border-[#0FA36B]/20 flex items-center justify-center text-[#16C784] text-xs font-black">
                    {(order.guestDetails?.name || 'G').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{order.guestDetails?.name || 'Guest'}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{order.invoiceNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#16C784] font-mono">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Orders Tab ───────────────────────────────────────────────────────────────
const OrdersTab = ({ orders, loading, onRefresh, showBanner, onOpenOrder }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterShipping, setFilterShipping] = useState('');

  const filtered = orders.filter(order => {
    const matchesType = !filterType || order.orderType === filterType;
    const matchesStatus = !filterStatus || order.paymentStatus === filterStatus;
    const matchesShipping = !filterShipping || order.shippingStatus === filterShipping;
    const q = search.toLowerCase();
    const matchesSearch = !search ||
      order.guestDetails?.name?.toLowerCase().includes(q) ||
      order.guestDetails?.email?.toLowerCase().includes(q) ||
      order.guestDetails?.phone?.includes(q) ||
      order.invoiceNumber?.toLowerCase().includes(q);
    return matchesType && matchesStatus && matchesShipping && matchesSearch;
  });

  // Export to CSV
  const exportCSV = () => {
    const rows = [
      ['Invoice', 'Date', 'Name', 'Email', 'Phone', 'Product', 'Qty', 'Total', 'Payment', 'Shipping', 'City', 'State', 'Pincode', 'Tracking']
    ];
    filtered.forEach(o => {
      o.items?.forEach(item => {
        rows.push([
          o.invoiceNumber, new Date(o.createdAt).toLocaleDateString('en-IN'),
          o.guestDetails?.name || '', o.guestDetails?.email || '', o.guestDetails?.phone || '',
          item.title, item.quantity, o.totalAmount, o.paymentStatus, o.shippingStatus,
          o.shippingAddress?.city, o.shippingAddress?.state, o.shippingAddress?.postalCode,
          o.trackingNumber || ''
        ]);
      });
    });
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `biomen-orders-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">Orders Log</h2>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            {filtered.length} of {orders.length} orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRefresh} className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5">
            <RefreshCw size={14} />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Payment Filter */}
        <div className="bg-black/60 border border-white/5 p-1 rounded-full flex gap-1">
          {[['', 'All'], ['paid', 'Paid'], ['pending', 'Pending'], ['failed', 'Failed']].map(([val, label]) => (
            <button key={val} onClick={() => setFilterStatus(val)}
              className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                filterStatus === val ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Shipping Filter */}
        <div className="bg-black/60 border border-white/5 p-1 rounded-full flex gap-1">
          {[['', 'All'], ['processing', 'Processing'], ['shipped', 'Shipped'], ['delivered', 'Delivered'], ['cancelled', 'Cancelled']].map(([val, label]) => (
            <button key={val} onClick={() => setFilterShipping(val)}
              className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                filterShipping === val ? 'bg-[#0FA36B]/20 border border-[#0FA36B]/30 text-[#16C784]' : 'text-gray-500 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="bg-black/60 border border-white/5 p-1 rounded-full flex gap-1">
          {[['', 'All Types'], ['retail', 'Retail'], ['wholesale', 'Wholesale']].map(([val, label]) => (
            <button key={val} onClick={() => setFilterType(val)}
              className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                filterType === val ? 'bg-[#D85A1F]/20 border border-[#D85A1F]/30 text-[#D85A1F]' : 'text-gray-500 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, phone or invoice ID..."
          className="w-full pl-11 pr-5 py-3.5 bg-black/40 border border-white/5 hover:border-white/10 focus:border-[#0FA36B]/50 rounded-2xl text-white text-sm font-semibold placeholder-gray-600 outline-none transition-all"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-[#16C784] animate-pulse flex items-center justify-center gap-2">
          <RefreshCw className="animate-spin" size={16} /> Fetching orders...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-gray-500 border border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-3">
          <ShieldAlert size={24} className="text-[#D85A1F]" />
          No orders match your filters.
        </div>
      ) : (
        <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/3 border-b border-white/5 text-gray-500 font-black uppercase tracking-wider text-[9px]">
                  <th className="p-4">Invoice / Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4 text-center">Payment</th>
                  <th className="p-4 text-center">Shipping</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/3">
                {filtered.map(order => {
                  const SHIP_STYLE = {
                    processing: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
                    shipped:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    delivered:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    cancelled:  'bg-red-500/10 text-red-400 border-red-500/20',
                  };
                  const PAY_STYLE = {
                    paid:    'bg-[#052E22] text-[#16C784] border-[#0FA36B]/20',
                    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
                    failed:  'bg-red-500/10 text-red-400 border-red-500/20',
                  };

                  return (
                    <tr
                      key={order._id}
                      onClick={() => onOpenOrder(order)}
                      className="hover:bg-white/2 cursor-pointer group transition-all"
                    >
                      <td className="p-4">
                        <span className="font-mono text-white font-bold text-sm block group-hover:text-[#16C784] transition-colors">{order.invoiceNumber || 'INV-NONE'}</span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                        </span>
                        {order.trackingNumber && (
                          <span className="text-[8px] text-[#16C784] font-mono bg-[#052E22] px-1.5 py-0.5 rounded border border-[#0FA36B]/20 inline-block mt-1">
                            AWB: {order.trackingNumber.slice(-10)}
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="text-white font-bold block">{order.guestDetails?.name || 'Guest'}</span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">{order.guestDetails?.email || '—'}</span>
                        <span className="text-[10px] text-[#16C784] font-bold block mt-0.5">{order.guestDetails?.phone || '—'}</span>
                      </td>

                      <td className="p-4">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="leading-normal">
                            <span className="text-white font-semibold block">{item.title}</span>
                            <span className="text-[10px] text-gray-500">₹{item.price?.toLocaleString('en-IN')} × {item.quantity}</span>
                          </div>
                        ))}
                      </td>

                      <td className="p-4 text-right">
                        <span className="font-black text-[#16C784] text-base font-mono">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                        <span className="text-[9px] text-gray-600 block mt-0.5">{order.orderType}</span>
                      </td>

                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${PAY_STYLE[order.paymentStatus] || 'bg-white/5 text-gray-400 border-white/10'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${SHIP_STYLE[order.shippingStatus] || 'bg-white/5 text-gray-400 border-white/10'}`}>
                          {order.shippingStatus}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={e => { e.stopPropagation(); onOpenOrder(order); }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-[#0FA36B]/15 border border-white/10 hover:border-[#0FA36B]/30 text-gray-400 hover:text-[#16C784] rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Manage →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Settings Tab ─────────────────────────────────────────────────────────────
const SettingsTab = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkServer = async () => {
    setChecking(true);
    try {
      const res = await fetch(API_URL.replace('/api', '') + '/api/status');
      const data = await res.json();
      setServerStatus(data);
    } catch {
      setServerStatus({ status: 'Unreachable', database: 'Disconnected' });
    }
    setChecking(false);
  };

  useEffect(() => { checkServer(); }, []);

  const razorpayMode = import.meta.env.VITE_RAZORPAY_KEY_ID?.startsWith('rzp_live') ? 'LIVE' : 'TEST';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide text-white">Settings</h2>
        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
          System configuration & notification overview
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-6 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
          <Bell size={13} className="text-[#16C784]" /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm font-bold text-white">Admin Order Alerts (Email)</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Founders receive an email for every new paid order at <span className="text-[#16C784]">info@biomenlabs.com</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16C784] animate-pulse" />
              <span className="text-[10px] font-black text-[#16C784] uppercase tracking-wider">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm font-bold text-white">Customer Order Confirmation (Email)</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Customers receive branded order confirmation via <span className="text-[#16C784]">info@biomenlabs.com</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16C784] animate-pulse" />
              <span className="text-[10px] font-black text-[#16C784] uppercase tracking-wider">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm font-bold text-white">Email Retention Flows</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Post-purchase onboarding, reorder, welcome sequences
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16C784] animate-pulse" />
              <span className="text-[10px] font-black text-[#16C784] uppercase tracking-wider">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-bold text-white">SMS / WhatsApp Alerts (MSG91)</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Instant WhatsApp & SMS alerts on new orders. Add MSG91 API key to enable.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Mode */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
          <Zap size={13} className="text-[#BFA46A]" /> Payment Gateway
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">Razorpay</p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Payment gateway for order checkout
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${
            razorpayMode === 'LIVE'
              ? 'bg-[#052E22] border-[#0FA36B]/30 text-[#16C784]'
              : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${razorpayMode === 'LIVE' ? 'bg-[#16C784] animate-pulse' : 'bg-yellow-400'}`} />
            {razorpayMode} MODE
          </div>
        </div>
      </div>

      {/* Server Status */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Wifi size={13} className="text-blue-400" /> Server Status
          </h3>
          <button
            onClick={checkServer}
            disabled={checking}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all"
          >
            <RefreshCw size={10} className={checking ? 'animate-spin' : ''} />
            {checking ? 'Checking...' : 'Ping'}
          </button>
        </div>
        {serverStatus && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/3 rounded-xl p-3 border border-white/5">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5">API Server</p>
              <div className="flex items-center gap-2">
                {serverStatus.status?.includes('running') ? (
                  <>
                    <Wifi size={13} className="text-[#16C784]" />
                    <span className="text-xs font-black text-[#16C784]">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={13} className="text-red-400" />
                    <span className="text-xs font-black text-red-400">Offline</span>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white/3 rounded-xl p-3 border border-white/5">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5">Database</p>
              <div className="flex items-center gap-2">
                {serverStatus.database === 'Connected' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-[#16C784] animate-pulse" />
                    <span className="text-xs font-black text-[#16C784]">MongoDB Connected</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-xs font-black text-red-400">Disconnected</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin Credentials */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-6 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
          <ShieldAlert size={13} className="text-gray-500" /> Admin Access
        </h3>
        <p className="text-[11px] text-gray-500">
          Username: <span className="text-white font-mono font-bold">biolabsAdmin</span>
        </p>
        <p className="text-[11px] text-gray-500">
          Password is set via <span className="text-white font-mono">VITE_ADMIN_PASSWORD</span> env variable.
          Default: <span className="text-white font-mono">biomen_deck_2026!</span>
        </p>
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('biolabs_admin_session');
    if (!session) {
      navigate('/admin/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes] = await Promise.all([
        fetch(`${API_URL}/orders/admin/stats`),
        fetch(`${API_URL}/orders/admin/all`)
      ]);
      const [statsData, ordersData] = await Promise.all([statsRes.json(), ordersRes.json()]);
      setStats(statsData);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showBanner('Failed to retrieve live data from backend.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showBanner = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4500);
  };

  const handleLogout = () => {
    localStorage.removeItem('biolabs_admin_session');
    navigate('/admin/login');
  };

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleRefreshAfterAction = () => {
    fetchData();
    setSelectedOrder(null);
  };

  const navItems = [
    { id: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={17} /> },
    { id: 'orders',     label: 'Orders',      icon: <ShoppingBag size={17} />,    badge: stats?.shipping?.processing || 0 },
    { id: 'inventory',  label: 'Inventory',   icon: <Package size={17} />,        badge: stats?.lowStockAlertCount || 0, badgeRed: true },
    { id: 'customers',  label: 'Customers',   icon: <Users size={17} /> },
    { id: 'emails',     label: 'Email Flows', icon: <Mail size={17} /> },
    { id: 'settings',   label: 'Settings',    icon: <Settings size={17} /> },
  ];

  return (
    <div className="min-h-screen bg-[#030705] text-[#F4F6F2] font-sans flex">

      {/* ── Sidebar ── */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#060D09] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784] flex-shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest text-white leading-tight">BIOMEN LABS</h1>
              <p className="text-[8px] font-black text-[#16C784] uppercase tracking-widest mt-0.5">Founders Console</p>
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="px-6 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16C784] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">System Online</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all cursor-pointer group ${
                activeTab === item.id
                  ? 'bg-[#0FA36B]/15 border border-[#0FA36B]/25 text-[#16C784]'
                  : 'hover:bg-white/3 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-all ${activeTab === item.id ? 'text-[#16C784]' : 'text-gray-600 group-hover:text-gray-300'}`}>
                  {item.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  item.badgeRed
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-[#0FA36B]/20 text-[#16C784] border border-[#0FA36B]/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span className="text-xs font-black uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#030705]/90 backdrop-blur-md border-b border-white/5 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer lg:hidden"
            >
              <Menu size={18} />
            </button>

            {/* Page Title */}
            <div>
              <h2 className="text-base font-black uppercase tracking-wider text-white">
                {navItems.find(n => n.id === activeTab)?.label}
              </h2>
              <p className="text-[9px] text-gray-600 font-semibold uppercase tracking-widest hidden sm:block">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all cursor-pointer"
              title="Refresh all data"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>

            {stats?.shipping?.processing > 0 && (
              <button
                onClick={() => setActiveTab('orders')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse cursor-pointer hover:animate-none hover:bg-yellow-500/20 transition-all"
              >
                <Bell size={10} />
                {stats.shipping.processing} pending
              </button>
            )}
          </div>
        </header>

        {/* Floating Notification Banner */}
        {notification && (
          <div className={`fixed top-20 right-6 z-[300] px-6 py-4 rounded-2xl border shadow-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
            notification.type === 'error'
              ? 'bg-[#D85A1F]/15 border-[#D85A1F]/30 text-[#D85A1F]'
              : 'bg-[#052E22] border-[#0FA36B]/30 text-[#16C784]'
          }`}>
            {notification.type === 'error' ? '⚠️ ' : '✅ '}{notification.msg}
          </div>
        )}

        {/* Tab Content */}
        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview stats={stats} onRefresh={fetchData} />
          )}
          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              loading={loading}
              onRefresh={fetchData}
              showBanner={showBanner}
              onOpenOrder={handleOpenOrder}
            />
          )}
          {activeTab === 'inventory' && (
            <InventoryPanel showBanner={showBanner} />
          )}
          {activeTab === 'customers' && (
            <CustomerList showBanner={showBanner} />
          )}
          {activeTab === 'emails' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase tracking-wide text-white">Email Flows</h2>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                  Retention campaigns & automated email sequences
                </p>
              </div>
              <EmailDashboard />
            </div>
          )}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </main>
      </div>

      {/* ── Order Detail Slide-Out Panel ── */}
      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onRefresh={handleRefreshAfterAction}
          showBanner={showBanner}
        />
      )}

      {/* ── Invoice Modal ── */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
