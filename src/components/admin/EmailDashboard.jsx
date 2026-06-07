import React, { useState, useEffect } from 'react';
import { 
  Mail, Calendar, RefreshCw, Send, Trash2, XCircle, 
  Play, Eye, ExternalLink, Sliders, AlertCircle, Sparkles, CheckCircle2 
} from 'lucide-react';
import API_URL from '../../utils/api';

const EmailDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schedulerLoading, setSchedulerLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Trigger form state
  const [triggerFlowName, setTriggerFlowName] = useState('Welcome');
  const [triggerEmail, setTriggerEmail] = useState('');
  const [triggerName, setTriggerName] = useState('');
  const [triggerTestMode, setTriggerTestMode] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // Preview Modal state
  const [previewEmail, setPreviewEmail] = useState(null); // { flow, step }

  // Available email steps for preview listing
  const flowStepsConfig = {
    'Welcome': [1, 2, 3, 4],
    'Browse Abandonment': [1, 2, 3],
    'Cart Recovery': [1, 2, 3, 4],
    'Post-Purchase': [1, 2, 3, 4, 5],
    'Reorder': [1, 2, 3, 4],
    'Review': [1, 2],
    'Winback': [1, 2, 3]
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/email-flows/queue`);
      if (res.ok) {
        const data = await res.json();
        setQueue(data);
      }
    } catch (err) {
      console.error('Failed to load email queue:', err);
      showBanner('Failed to load email queue.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showBanner = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRunScheduler = async () => {
    try {
      setSchedulerLoading(true);
      const res = await fetch(`${API_URL}/email-flows/run-scheduler`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showBanner('Scheduler job triggered. Emails sent/logged successfully!');
        fetchQueue();
      }
    } catch (err) {
      console.error(err);
      showBanner('Failed to trigger scheduler.', 'error');
    } finally {
      setSchedulerLoading(false);
    }
  };

  const handleTriggerFlowSubmit = async (e) => {
    e.preventDefault();
    if (!triggerEmail || !triggerFlowName) {
      showBanner('Email and Flow are required.', 'error');
      return;
    }

    try {
      setFormLoading(true);
      const res = await fetch(`${API_URL}/email-flows/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: triggerEmail,
          firstName: triggerName || 'Customer',
          flow: triggerFlowName,
          testMode: triggerTestMode
        })
      });

      const data = await res.json();
      if (res.ok) {
        showBanner(`Triggered ${triggerFlowName} flow (queued ${data.itemsCount} steps).`);
        setTriggerEmail('');
        setTriggerName('');
        fetchQueue();
      } else {
        showBanner(data.error || 'Failed to trigger flow.', 'error');
      }
    } catch (err) {
      console.error(err);
      showBanner('Server communication failed.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSendNow = async (id) => {
    try {
      const res = await fetch(`${API_URL}/email-flows/send-now/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showBanner('Email processed and sent successfully!');
      } else {
        showBanner(data.error || 'Failed to send email now.', 'error');
      }
      fetchQueue();
    } catch (err) {
      console.error(err);
      showBanner('Failed to dispatch email.', 'error');
    }
  };

  const handleCancelEmail = async (id) => {
    try {
      const res = await fetch(`${API_URL}/email-flows/cancel/${id}`, { method: 'POST' });
      if (res.ok) {
        showBanner('Queued email cancelled.');
        fetchQueue();
      }
    } catch (err) {
      console.error(err);
      showBanner('Failed to cancel email.', 'error');
    }
  };

  const handleClearQueue = async () => {
    if (!window.confirm('Are you sure you want to delete all queue logs and scheduled emails?')) return;
    try {
      const res = await fetch(`${API_URL}/email-flows/clear`, { method: 'POST' });
      if (res.ok) {
        showBanner('Email queue logs purged.');
        fetchQueue();
      }
    } catch (err) {
      console.error(err);
      showBanner('Failed to clear queue.', 'error');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-emerald-950 text-emerald-400 border border-emerald-800/30';
      case 'pending':
        return 'bg-[#06110C] text-yellow-500 border border-yellow-500/20';
      case 'failed':
        return 'bg-[#D85A1F]/10 text-[#D85A1F] border border-[#D85A1F]/20';
      case 'cancelled':
        return 'bg-white/5 text-gray-500 border border-white/10';
      default:
        return 'bg-white/5 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Floating System Notifications */}
      {notification && (
        <div className={`fixed top-20 right-6 z-[300] px-6 py-3.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all ${notification.type === 'error' ? 'bg-[#D85A1F]/20 border-[#D85A1F]/30 text-[#D85A1F]' : 'bg-[#052E22] border-[#0FA36B]/30 text-[#16C784]'}`}>
          {notification.type === 'error' ? '⚠️ ' : '✅ '} {notification.msg}
        </div>
      )}

      {/* Action Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40 border border-white/5 p-6 rounded-[2rem]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">Lifecycle Email Retention Panel</h2>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Automated v2 Playbook triggers & delivery simulator</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRunScheduler}
            disabled={schedulerLoading}
            className="flex items-center gap-2 bg-[#052E22] hover:bg-[#084534] border border-[#0FA36B]/20 text-[#16C784] text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
          >
            {schedulerLoading ? <RefreshCw className="animate-spin" size={11} /> : <Play size={11} />}
            Process Pending Due Emails
          </button>
          <button 
            onClick={handleClearQueue}
            className="flex items-center gap-2 bg-red-950/20 hover:bg-red-950/40 border border-red-800/30 text-red-400 text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer"
          >
            <Trash2 size={11} /> Purge Records
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Trigger flow form & Templates Preview Grid */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Manual Simulator Form */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#BFA46A] flex items-center gap-2">
              <Sliders size={16} /> Simulate Event Trigger
            </h3>
            <form onSubmit={handleTriggerFlowSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Retention Flow</label>
                <select 
                  value={triggerFlowName}
                  onChange={(e) => setTriggerFlowName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                >
                  {Object.keys(flowStepsConfig).map(flowName => (
                    <option key={flowName} value={flowName}>{flowName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Customer Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. customer@mail.com"
                    value={triggerEmail}
                    onChange={(e) => setTriggerEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John"
                    value={triggerName}
                    onChange={(e) => setTriggerName(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="testMode"
                  checked={triggerTestMode}
                  onChange={(e) => setTriggerTestMode(e.target.checked)}
                  className="rounded border-white/10 bg-black text-[#16C784] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="testMode" className="text-[10px] font-bold uppercase text-gray-400 cursor-pointer">
                  Test QA Speed (Compress delays to 5-second intervals)
                </label>
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full py-3 bg-[#D85A1F] hover:bg-[#b94a17] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {formLoading ? <RefreshCw className="animate-spin" size={12} /> : <Mail size={12} />}
                Trigger & Queue Lifecycle Emails
              </button>
            </form>
          </div>

          {/* Flow Templates Directory */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#BFA46A] flex items-center gap-2">
              <Eye size={16} /> Email Templates Directory
            </h3>
            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
              Click any of the 25 rewritten email templates from the v2 retention protocol to view its rendered premium design and exact copy bounds.
            </p>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {Object.entries(flowStepsConfig).map(([flowName, steps]) => (
                <div key={flowName} className="border-b border-white/5 pb-2.5 last:border-b-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#16C784] mb-1.5">{flowName}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {steps.map(step => (
                      <button
                        key={step}
                        onClick={() => setPreviewEmail({ flow: flowName, step })}
                        className="px-2.5 py-1 bg-black/60 hover:bg-[#052E22] border border-white/5 hover:border-[#0FA36B]/30 text-gray-300 hover:text-[#16C784] text-[9px] font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Email {step} <ExternalLink size={8} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel: Database Queue Log */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 p-6 rounded-[2rem] space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Automated Delivery Queue</h3>
              <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Live schedule of queued and sent lifecycle emails</p>
            </div>
            <button 
              onClick={fetchQueue}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs font-black uppercase text-[#16C784] animate-pulse">
              Syncing scheduled email queue...
            </div>
          ) : queue.length === 0 ? (
            <div className="py-20 text-center text-xs font-black uppercase text-gray-500 border border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-2">
              <AlertCircle size={20} className="text-yellow-500/50" />
              Queue is empty. Trigger a simulation or complete an order to schedule retention tasks.
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {queue.map((item) => {
                const date = new Date(item.scheduledFor);
                const isSentOrCancelled = item.status === 'sent' || item.status === 'cancelled';

                return (
                  <div key={item._id} className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">{item.email}</span>
                          <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#BFA46A] font-bold uppercase tracking-wider">
                          Flow: {item.flow} &bull; Step {item.step}
                        </div>
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono font-bold">
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-left text-xs bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-gray-400">
                      <strong>Sub:</strong> {item.subject}
                    </div>

                    {!isSentOrCancelled && (
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleCancelEmail(item._id)}
                          className="px-3 py-1 bg-white/5 hover:bg-[#D85A1F]/10 border border-white/5 hover:border-[#D85A1F]/30 text-gray-400 hover:text-[#D85A1F] text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        >
                          <XCircle size={10} /> Cancel
                        </button>
                        <button
                          onClick={() => handleSendNow(item._id)}
                          className="px-3 py-1 bg-[#052E22] hover:bg-[#084534] border border-[#0FA36B]/20 text-[#16C784] text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Send size={10} /> Send Now
                        </button>
                      </div>
                    )}

                    {item.status === 'failed' && item.error && (
                      <div className="text-[9px] text-[#D85A1F] bg-[#D85A1F]/5 border border-[#D85A1F]/10 p-2 rounded-lg text-left">
                        <strong>Error:</strong> {item.error}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* HTML Email Template Preview Modal overlay */}
      {previewEmail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
          <div className="bg-[#030705] border border-white/10 max-w-3xl w-full h-[85vh] rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 bg-black/60 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-md font-black uppercase tracking-widest text-white">Email Preview Template</h3>
                <p className="text-[9px] font-black text-[#16C784] uppercase tracking-widest mt-0.5">
                  Flow: {previewEmail.flow} &bull; Step {previewEmail.step}
                </p>
              </div>
              <button
                onClick={() => setPreviewEmail(null)}
                className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="flex-1 bg-black/20 p-4">
              <iframe
                src={`${API_URL}/email-flows/preview/${encodeURIComponent(previewEmail.flow)}/${previewEmail.step}`}
                title="Email Render Preview"
                className="w-full h-full border border-white/10 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDashboard;
