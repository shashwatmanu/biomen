import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, ShoppingBag, AlertTriangle, 
  Search, ShieldAlert, LogOut, FileText, CheckCircle2,
  Truck, ArrowRightLeft, RefreshCw, Send
} from 'lucide-react';
import API_URL from '../utils/api';
import InvoiceModal from '../components/admin/InvoiceModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Filtering & Search states
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(''); // '', 'retail', 'wholesale'
  const [filterStatus, setFilterStatus] = useState(''); // '', 'paid', 'pending', 'failed'
  
  // Notification banner
  const [notification, setNotification] = useState(null);

  // Authenticate session
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
      
      // 1. Fetch KPI Statistics
      const statsRes = await fetch(`${API_URL}/orders/admin/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      // 2. Fetch All Orders based on current queries
      const queryParams = new URLSearchParams();
      if (filterType) queryParams.append('orderType', filterType);
      if (filterStatus) queryParams.append('paymentStatus', filterStatus);
      if (search) queryParams.append('search', search);

      const ordersRes = await fetch(`${API_URL}/orders/admin/all?${queryParams.toString()}`);
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

    } catch (err) {
      console.error("Failed to load admin dataset:", err);
      showBanner("Failed to retrieve live data from backend server.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch data on search or filter change
  useEffect(() => {
    if (localStorage.getItem('biolabs_admin_session')) {
      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 300); // 300ms debounce for typing search
      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, filterType, filterStatus]);

  const showBanner = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('biolabs_admin_session');
    navigate('/admin/login');
  };

  // Action: Toggle Retail/Wholesale type
  const handleToggleOrderType = async (orderId, currentType) => {
    try {
      const newType = currentType === 'retail' ? 'wholesale' : 'retail';
      const res = await fetch(`${API_URL}/orders/admin/${orderId}/type`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderType: newType })
      });
      const data = await res.json();
      if (data.success) {
        showBanner(`Order updated to bulk [${newType.toUpperCase()}] categorization!`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      showBanner("Failed to update order type.", "error");
    }
  };

  // Action: Update shipping status
  const handleUpdateShippingStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/admin/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingStatus: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showBanner(`Order status changed to [${newStatus.toUpperCase()}] successfully!`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      showBanner("Failed to update shipping status.", "error");
    }
  };

  // Action: Push order data to Shiprocket (Mock action for verification)
  const handlePushToShiprocket = (order) => {
    showBanner(`🚀 Successfully pushed invoice ${order.invoiceNumber || order._id} to Shiprocket logistics desk!`);
  };

  return (
    <div className="min-h-screen bg-[#030705] text-[#F4F6F2] font-sans">
      
      {/* Top Header Deck */}
      <header className="bg-black/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-50 px-6 py-4 md:px-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#052E22] border border-[#0FA36B]/30 flex items-center justify-center text-[#16C784]">
            <TrendingUp size={18} />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest text-white leading-tight">BIOMEN LABS</h1>
            <p className="text-[8px] font-black text-[#16C784] uppercase tracking-widest leading-none mt-0.5">Console Executive Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            title="Refresh Live Statistics"
            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw size={16} />
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer"
          >
            <LogOut size={11} /> Exit Console
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Floating System Notifications */}
        {notification && (
          <div className={`fixed top-20 right-6 z-[300] px-6 py-3.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all ${notification.type === 'error' ? 'bg-[#D85A1F]/20 border-[#D85A1F]/30 text-[#D85A1F]' : 'bg-[#052E22] border-[#0FA36B]/30 text-[#16C784]'}`}>
            {notification.type === 'error' ? '⚠️ ' : '✅ '} {notification.msg}
          </div>
        )}

        {/* 1. KPIs Metric cards Panel */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card: Total Revenue */}
          <div className="bg-black/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[120px]">
            <div className="absolute top-4 right-4 text-[#16C784] bg-[#052E22] p-2.5 rounded-2xl border border-[#0FA36B]/20">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">TOTAL REVENUE (PAID)</span>
              <span className="text-2.5xl font-black text-white font-mono block mt-1">
                ₹{stats ? stats.totalRevenue?.toLocaleString('en-IN') : '0'}
              </span>
            </div>
          </div>

          {/* Card: Total Orders */}
          <div className="bg-black/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[120px]">
            <div className="absolute top-4 right-4 text-[#16C784] bg-[#052E22] p-2.5 rounded-2xl border border-[#0FA36B]/20">
              <ShoppingBag size={18} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">TOTAL ORDERS FILED</span>
              <span className="text-2.5xl font-black text-white font-mono block mt-1">
                {stats ? stats.totalOrdersCount : '0'}
              </span>
            </div>
          </div>

          {/* Card: Active Subscribers */}
          <div className="bg-black/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[120px]">
            <div className="absolute top-4 right-4 text-[#16C784] bg-[#052E22] p-2.5 rounded-2xl border border-[#0FA36B]/20">
              <Users size={18} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">NEWSLETTER SUBSCRIBERS</span>
              <span className="text-2.5xl font-black text-white font-mono block mt-1">
                {stats ? stats.totalSubscribers : '0'}
              </span>
            </div>
          </div>

          {/* Card: Low Stock alerts count */}
          <div className={`border p-6 rounded-3xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[120px] ${stats?.lowStockAlertCount > 0 ? 'bg-[#D85A1F]/10 border-[#D85A1F]/20' : 'bg-black/40 border-white/5'}`}>
            <div className={`absolute top-4 right-4 p-2.5 rounded-2xl border ${stats?.lowStockAlertCount > 0 ? 'text-[#D85A1F] bg-[#D85A1F]/10 border-[#D85A1F]/20' : 'text-[#16C784] bg-[#052E22] border-[#0FA36B]/20'}`}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">INVENTORY STOCK ALERTS</span>
              <span className={`text-2.5xl font-black font-mono block mt-1 ${stats?.lowStockAlertCount > 0 ? 'text-[#D85A1F]' : 'text-white'}`}>
                {stats ? stats.lowStockAlertCount : '0'}
              </span>
            </div>
          </div>

        </section>

        {/* 2. Operations Grid & Filter Section */}
        <section className="bg-black/40 border border-white/5 p-6 rounded-[2rem] space-y-6 backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wide text-white">SYSTEM ORDERS LOG</h2>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Manage and dispatch customer orders securely</p>
            </div>

            {/* Filter controls row */}
            <div className="flex flex-wrap gap-2.5">
              
              {/* Filter Type Toggles */}
              <div className="bg-black/60 border border-white/5 p-1 rounded-full flex gap-1">
                <button 
                  onClick={() => setFilterType('')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterType === '' ? 'bg-[#0FA36B] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  All Categories
                </button>
                <button 
                  onClick={() => setFilterType('retail')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterType === 'retail' ? 'bg-[#0FA36B] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Retail
                </button>
                <button 
                  onClick={() => setFilterType('wholesale')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterType === 'wholesale' ? 'bg-[#0FA36B] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Wholesale
                </button>
              </div>

              {/* Status Toggles */}
              <div className="bg-black/60 border border-white/5 p-1 rounded-full flex gap-1">
                <button 
                  onClick={() => setFilterStatus('')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === '' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  All Statuses
                </button>
                <button 
                  onClick={() => setFilterStatus('paid')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === 'paid' ? 'bg-[#0FA36B]/20 border border-[#0FA36B]/30 text-[#16C784]' : 'text-gray-400 hover:text-white'}`}
                >
                  Paid
                </button>
                <button 
                  onClick={() => setFilterStatus('failed')}
                  className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === 'failed' ? 'bg-[#D85A1F]/20 border border-[#D85A1F]/30 text-[#D85A1F]' : 'text-gray-400 hover:text-white'}`}
                >
                  Failed
                </button>
              </div>

            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 pointer-events-none">
              <Search size={14} />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Customer Name, Email Address, or Serial Invoice ID..."
              className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/5 hover:border-white/10 focus:border-[#0FA36B]/50 rounded-2xl text-white text-xs font-semibold placeholder-gray-600 outline-none transition-all"
            />
          </div>

          {/* Core Logs Data Table */}
          {loading ? (
            <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-[#16C784] animate-pulse flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin" size={16} /> Contacting biomen databanks...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-gray-500 border border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-3">
              <ShieldAlert size={24} className="text-[#D85A1F]" /> No orders match your selected queries.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-black uppercase tracking-wider text-[10px]">
                    <th className="p-4">Invoice / Date</th>
                    <th className="p-4">Guest Customer details</th>
                    <th className="p-4">System Package</th>
                    <th className="p-4 text-center">Payment</th>
                    <th className="p-4 text-center">Category</th>
                    <th className="p-4 text-center">Shipping & Approvals</th>
                    <th className="p-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-gray-300">
                  {orders.map((order) => {
                    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                      dateStyle: 'medium'
                    });

                    return (
                      <tr key={order._id} className="hover:bg-white/2">
                        
                        {/* Serial/Date */}
                        <td className="p-4">
                          <span className="font-mono text-white font-bold block">{order.invoiceNumber || 'INV-NONE'}</span>
                          <span className="text-[10px] text-gray-500 block mt-1">{formattedDate}</span>
                        </td>

                        {/* Customer details */}
                        <td className="p-4">
                          <span className="text-white block">{order.guestDetails?.name || order.user?.name || 'Guest User'}</span>
                          <span className="text-[10px] text-gray-500 block mt-0.5">{order.guestDetails?.email || 'N/A'}</span>
                          <span className="text-[10px] text-gray-500 block mt-0.5">Ph: {order.guestDetails?.phone || 'N/A'}</span>
                        </td>

                        {/* Order Items */}
                        <td className="p-4">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="leading-normal">
                              <span className="text-white font-bold block">{item.title}</span>
                              <span className="text-[10px] text-[#16C784] block mt-0.5">
                                ₹{item.price?.toLocaleString('en-IN')} &bull; Qty: {item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>

                        {/* Payment Status badge */}
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${order.paymentStatus === 'paid' ? 'bg-[#052E22] text-[#16C784] border border-[#0FA36B]/20' : order.paymentStatus === 'failed' ? 'bg-[#D85A1F]/10 text-[#D85A1F] border border-[#D85A1F]/20' : 'bg-white/5 text-gray-400'}`}>
                            {order.paymentStatus}
                          </span>
                        </td>

                        {/* Category toggle (Retail / Wholesale) */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleOrderType(order._id, order.orderType)}
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer inline-flex items-center gap-1.5 ${order.orderType === 'wholesale' ? 'bg-[#D85A1F]/10 border-[#D85A1F]/30 text-[#D85A1F]' : 'bg-white/5 border-white/10 text-gray-300'}`}
                          >
                            <ArrowRightLeft size={10} /> {order.orderType || 'retail'}
                          </button>
                        </td>

                        {/* Shipping status selector + Shiprocket trigger */}
                        <td className="p-4 text-center">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                            
                            {/* Shipping dropdown selector */}
                            <select
                              value={order.shippingStatus || 'processing'}
                              onChange={(e) => handleUpdateShippingStatus(order._id, e.target.value)}
                              className="px-2.5 py-1.5 bg-[#06110C] border border-white/10 focus:border-[#0FA36B] rounded-lg text-[9px] font-black uppercase tracking-wider text-white outline-none cursor-pointer"
                            >
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>

                            {/* Push to Shiprocket Button */}
                            <button
                              onClick={() => handlePushToShiprocket(order)}
                              title="Push Order to Shiprocket Logistics Desk"
                              className="p-2 bg-[#0FA36B]/10 hover:bg-[#0FA36B]/20 border border-[#0FA36B]/20 hover:border-[#0FA36B]/40 text-[#16C784] rounded-lg transition-all cursor-pointer"
                            >
                              <Send size={10} />
                            </button>
                          </div>
                        </td>

                        {/* Invoice print trigger */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <FileText size={12} />
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </section>

      </main>

      {/* Invoice modal overlay */}
      {selectedOrder && (
        <InvoiceModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}

    </div>
  );
};

export default AdminDashboard;
