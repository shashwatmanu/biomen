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
        return 'bg-biomen-bg-secondary text-yellow-500 border border-yellow-500/20';
      case 'failed':
        return 'bg-biomen-copper/10 text-biomen-copper border border-biomen-copper/20';
      case 'cancelled':
        return 'bg-biomen-text-primary/5 text-biomen-text-secondary border border-biomen-text-primary/10';
      default:
        return 'bg-biomen-text-primary/5 text-biomen-text-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Floating System Notifications */}
      {notification && (
        <div className={`fixed top-20 right-6 z-[300] px-6 py-3.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all ${notification.type === 'error' ? 'bg-biomen-copper/20 border-biomen-copper/30 text-biomen-copper' : 'bg-biomen-surface border-[#0FA36B]/30 text-biomen-accent'}`}>
          {notification.type === 'error' ? '⚠️ ' : '✅ '} {notification.msg}
        </div>
      )}

      {/* Action Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-biomen-bg-primary/40 border border-biomen-text-primary/5 p-6 rounded-[2rem]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-biomen-text-primary">Lifecycle Email Retention Panel</h2>
          <p className="text-[10px] text-biomen-text-secondary font-semibold uppercase tracking-wider mt-0.5">Automated v2 Playbook triggers & delivery simulator</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRunScheduler}
            disabled={schedulerLoading}
            className="flex items-center gap-2 bg-biomen-surface hover:bg-biomen-surface border border-[#0FA36B]/20 text-biomen-accent text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
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
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold flex items-center gap-2">
              <Sliders size={16} /> Simulate Event Trigger
            </h3>
            <form onSubmit={handleTriggerFlowSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-biomen-text-secondary tracking-wider">Retention Flow</label>
                <select 
                  value={triggerFlowName}
                  onChange={(e) => setTriggerFlowName(e.target.value)}
                  className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-3 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                >
                  {Object.keys(flowStepsConfig).map(flowName => (
                    <option key={flowName} value={flowName}>{flowName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-biomen-text-secondary tracking-wider">Customer Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. customer@mail.com"
                    value={triggerEmail}
                    onChange={(e) => setTriggerEmail(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-3 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-biomen-text-secondary tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John"
                    value={triggerName}
                    onChange={(e) => setTriggerName(e.target.value)}
                    className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-xl p-3 text-biomen-text-primary focus:border-emerald-500 outline-none text-xs font-bold uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="testMode"
                  checked={triggerTestMode}
                  onChange={(e) => setTriggerTestMode(e.target.checked)}
                  className="rounded border-biomen-text-primary/10 bg-biomen-bg-primary text-biomen-accent focus:ring-0 cursor-pointer"
                />
                <label htmlFor="testMode" className="text-[10px] font-bold uppercase text-biomen-text-secondary cursor-pointer">
                  Test QA Speed (Compress delays to 5-second intervals)
                </label>
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full py-3 bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {formLoading ? <RefreshCw className="animate-spin" size={12} /> : <Mail size={12} />}
                Trigger & Queue Lifecycle Emails
              </button>
            </form>
          </div>

          {/* Flow Templates Directory */}
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-gold flex items-center gap-2">
              <Eye size={16} /> Email Templates Directory
            </h3>
            <p className="text-[10px] text-biomen-text-secondary font-semibold leading-relaxed">
              Click any of the 25 rewritten email templates from the v2 retention protocol to view its rendered premium design and exact copy bounds.
            </p>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {Object.entries(flowStepsConfig).map(([flowName, steps]) => (
                <div key={flowName} className="border-b border-biomen-text-primary/5 pb-2.5 last:border-b-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-biomen-accent mb-1.5">{flowName}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {steps.map(step => (
                      <button
                        key={step}
                        onClick={() => setPreviewEmail({ flow: flowName, step })}
                        className="px-2.5 py-1 bg-biomen-bg-primary/60 hover:bg-biomen-surface border border-biomen-text-primary/5 hover:border-[#0FA36B]/30 text-biomen-text-primary hover:text-biomen-accent text-[9px] font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
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
        <div className="lg:col-span-7 bg-biomen-bg-primary/40 border border-biomen-text-primary/5 p-6 rounded-[2rem] space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-biomen-text-primary/5">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-biomen-text-primary">Automated Delivery Queue</h3>
              <p className="text-[9px] text-biomen-text-secondary font-semibold uppercase tracking-wider mt-0.5">Live schedule of queued and sent lifecycle emails</p>
            </div>
            <button 
              onClick={fetchQueue}
              className="p-2 hover:bg-biomen-text-primary/5 rounded-full text-biomen-text-secondary hover:text-biomen-text-primary transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs font-black uppercase text-biomen-accent animate-pulse">
              Syncing scheduled email queue...
            </div>
          ) : queue.length === 0 ? (
            <div className="py-20 text-center text-xs font-black uppercase text-biomen-text-secondary border border-dashed border-biomen-text-primary/10 rounded-2xl flex flex-col items-center gap-2">
              <AlertCircle size={20} className="text-yellow-500/50" />
              Queue is empty. Trigger a simulation or complete an order to schedule retention tasks.
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {queue.map((item) => {
                const date = new Date(item.scheduledFor);
                const isSentOrCancelled = item.status === 'sent' || item.status === 'cancelled';

                return (
                  <div key={item._id} className="bg-biomen-bg-primary/30 border border-biomen-text-primary/5 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-biomen-text-primary">{item.email}</span>
                          <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-biomen-gold font-bold uppercase tracking-wider">
                          Flow: {item.flow} &bull; Step {item.step}
                        </div>
                      </div>
                      <span className="text-[9px] text-biomen-text-secondary font-mono font-bold">
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-left text-xs bg-biomen-bg-primary/40 p-3 rounded-lg border border-biomen-text-primary/5 font-mono text-biomen-text-secondary">
                      <strong>Sub:</strong> {item.subject}
                    </div>

                    {!isSentOrCancelled && (
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleCancelEmail(item._id)}
                          className="px-3 py-1 bg-biomen-text-primary/5 hover:bg-biomen-copper/10 border border-biomen-text-primary/5 hover:border-biomen-copper/30 text-biomen-text-secondary hover:text-biomen-copper text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        >
                          <XCircle size={10} /> Cancel
                        </button>
                        <button
                          onClick={() => handleSendNow(item._id)}
                          className="px-3 py-1 bg-biomen-surface hover:bg-biomen-surface border border-[#0FA36B]/20 text-biomen-accent text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Send size={10} /> Send Now
                        </button>
                      </div>
                    )}

                    {item.status === 'failed' && item.error && (
                      <div className="text-[9px] text-biomen-copper bg-biomen-copper/5 border border-biomen-copper/10 p-2 rounded-lg text-left">
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
        <div className="fixed inset-0 bg-biomen-bg-primary/80 backdrop-blur-sm z-[500] flex items-center justify-center p-4">
          <div className="bg-biomen-bg-primary border border-biomen-text-primary/10 max-w-3xl w-full h-[85vh] rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 bg-biomen-bg-primary/60 border-b border-biomen-text-primary/5 flex justify-between items-center">
              <div>
                <h3 className="text-md font-black uppercase tracking-widest text-biomen-text-primary">Email Preview Template</h3>
                <p className="text-[9px] font-black text-biomen-accent uppercase tracking-widest mt-0.5">
                  Flow: {previewEmail.flow} &bull; Step {previewEmail.step}
                </p>
              </div>
              <button
                onClick={() => setPreviewEmail(null)}
                className="p-2 hover:bg-biomen-text-primary/5 text-biomen-text-secondary hover:text-biomen-text-primary rounded-full transition-all cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="flex-1 bg-biomen-bg-primary/20 p-4">
              <iframe
                src={`${API_URL}/email-flows/preview/${encodeURIComponent(previewEmail.flow)}/${previewEmail.step}`}
                title="Email Render Preview"
                className="w-full h-full border border-biomen-text-primary/10 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDashboard;
