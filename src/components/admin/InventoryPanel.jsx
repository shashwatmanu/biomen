import React, { useState, useEffect } from 'react';
import { Package, RefreshCw, AlertTriangle, ToggleLeft, ToggleRight, Save, ChevronUp, ChevronDown } from 'lucide-react';
import API_URL from '../../utils/api';

const InventoryPanel = ({ showBanner }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [savingId, setSavingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products/admin/all`);
      const data = await res.json();
      setProducts(data);
    } catch {
      showBanner('Failed to load products', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditValues({ stock: product.stock, price: product.price, mrp: product.mrp });
  };

  const cancelEdit = () => { setEditingId(null); setEditValues({}); };

  const saveProduct = async (product) => {
    setSavingId(product._id);
    try {
      const res = await fetch(`${API_URL}/products/admin/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editValues)
      });
      const data = await res.json();
      if (data.success) {
        showBanner('✅ Product updated successfully!');
        setEditingId(null);
        fetchProducts();
      } else {
        showBanner(data.error || 'Update failed', 'error');
      }
    } catch {
      showBanner('Network error updating product', 'error');
    }
    setSavingId(null);
  };

  const toggleActive = async (product) => {
    try {
      const res = await fetch(`${API_URL}/products/admin/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive })
      });
      const data = await res.json();
      if (data.success) {
        showBanner(`Product ${!product.isActive ? 'activated' : 'deactivated'}`);
        fetchProducts();
      }
    } catch {
      showBanner('Failed to toggle product status', 'error');
    }
  };

  const adjustStock = (delta) => {
    setEditValues(v => ({ ...v, stock: Math.max(0, (parseInt(v.stock) || 0) + delta) }));
  };

  if (loading) return (
    <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-[#16C784] animate-pulse flex items-center justify-center gap-2">
      <RefreshCw className="animate-spin" size={16} /> Loading inventory...
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">Product Inventory</h2>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Manage stock levels, pricing & product availability
          </p>
        </div>
        <button
          onClick={fetchProducts}
          className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {products.map((product) => {
          const isEditing = editingId === product._id;
          const isLowStock = product.stock < 10;
          const isOutOfStock = product.stock === 0;

          return (
            <div
              key={product._id}
              className={`bg-black/40 border rounded-3xl p-6 transition-all ${
                !product.isActive ? 'border-white/5 opacity-60' :
                isOutOfStock ? 'border-red-800/40 bg-red-950/10' :
                isLowStock ? 'border-yellow-800/40 bg-yellow-950/5' :
                'border-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-white text-base">{product.name}</h3>
                    {isOutOfStock && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-wider">
                        OUT OF STOCK
                      </span>
                    )}
                    {isLowStock && !isOutOfStock && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle size={8} /> LOW STOCK
                      </span>
                    )}
                    {!product.isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[9px] font-black uppercase tracking-wider">
                        INACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 font-semibold">{product.title}</p>
                  <p className="text-[11px] text-gray-600 mt-1 max-w-md">{product.description}</p>

                  {/* Pricing & Stock Row */}
                  <div className="flex flex-wrap items-center gap-6 mt-4">

                    {/* Stock */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Stock</label>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => adjustStock(-10)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer transition-all text-[10px] font-bold">
                            -10
                          </button>
                          <button onClick={() => adjustStock(-1)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer transition-all">
                            <ChevronDown size={12} />
                          </button>
                          <input
                            type="number"
                            value={editValues.stock}
                            onChange={e => setEditValues(v => ({ ...v, stock: e.target.value }))}
                            className="w-16 text-center px-2 py-1.5 bg-white/5 border border-[#0FA36B]/40 rounded-lg text-white text-sm font-mono font-bold outline-none"
                            min="0"
                          />
                          <button onClick={() => adjustStock(1)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer transition-all">
                            <ChevronUp size={12} />
                          </button>
                          <button onClick={() => adjustStock(10)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center cursor-pointer transition-all text-[10px] font-bold">
                            +10
                          </button>
                        </div>
                      ) : (
                        <span className={`text-2xl font-black font-mono ${
                          isOutOfStock ? 'text-red-400' : isLowStock ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {product.stock}
                          <span className="text-xs text-gray-600 font-normal ml-1">units</span>
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Selling Price</label>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500">₹</span>
                          <input
                            type="number"
                            value={editValues.price}
                            onChange={e => setEditValues(v => ({ ...v, price: e.target.value }))}
                            className="w-24 px-2 py-1.5 bg-white/5 border border-[#0FA36B]/40 rounded-lg text-white text-sm font-mono font-bold outline-none"
                          />
                        </div>
                      ) : (
                        <span className="text-xl font-black text-[#16C784] font-mono">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* MRP */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">MRP</label>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500">₹</span>
                          <input
                            type="number"
                            value={editValues.mrp}
                            onChange={e => setEditValues(v => ({ ...v, mrp: e.target.value }))}
                            className="w-24 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm font-mono font-bold outline-none"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 font-mono line-through">
                          ₹{product.mrp?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {!isEditing && (
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Discount</label>
                        <span className="text-sm font-black text-[#BFA46A]">
                          {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end gap-3">
                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleActive(product)}
                    className="flex items-center gap-2 cursor-pointer"
                    title={product.isActive ? 'Deactivate product' : 'Activate product'}
                  >
                    {product.isActive ? (
                      <ToggleRight size={28} className="text-[#16C784]" />
                    ) : (
                      <ToggleLeft size={28} className="text-gray-600" />
                    )}
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">
                      {product.isActive ? 'Live' : 'Off'}
                    </span>
                  </button>

                  {/* Edit / Save / Cancel */}
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveProduct(product)}
                        disabled={savingId === product._id}
                        className="px-4 py-2 rounded-xl bg-[#0FA36B] hover:bg-[#16C784] text-white text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Save size={11} />
                        {savingId === product._id ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(product)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Stock Bar */}
              {!isEditing && (
                <div className="mt-4">
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-yellow-500' : 'bg-[#0FA36B]'
                      }`}
                      style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryPanel;
