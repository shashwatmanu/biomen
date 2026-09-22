import React from 'react';
import { Mail, MessageSquare, MapPin, Send, Phone } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Contact = () => {
  return (
    <div className="bg-biomen-bg-primary min-h-screen text-biomen-text-primary pt-[176px] md:pt-[144px]">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 leading-none">
            Connect <br/> <span className="text-[#0FA36B]">With Labs</span>
          </h1>
          <p className="text-xl text-biomen-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            Our science team is here to support your protocol. Expect a response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-biomen-surface border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-biomen-accent shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-biomen-text-secondary mb-2">Protocol Support</h3>
                  <div className="text-2xl font-black text-biomen-text-primary hover:text-biomen-accent transition-colors cursor-pointer">support@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-biomen-surface border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-biomen-accent shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-biomen-text-secondary mb-2">Press & Partnerships</h3>
                  <div className="text-2xl font-black text-biomen-text-primary hover:text-biomen-accent transition-colors cursor-pointer">support@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-biomen-surface border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-biomen-accent shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-biomen-text-secondary mb-2">Headquarters</h3>
                  <div className="text-2xl font-black text-biomen-text-primary">Biomen Labs Research Facility<br/>Ghaziabad, India</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-biomen-surface/30 border border-[#0FA36B]/20 rounded-[2rem] flex items-center gap-6">
              <div className="w-12 h-12 bg-biomen-accent text-black rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <p className="text-sm font-bold text-biomen-text-secondary">
                Priority support available for active protocol subscribers.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-biomen-text-primary/5 border border-biomen-text-primary/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-biomen-emerald/10 rounded-full blur-[100px] pointer-events-none" />
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-biomen-text-secondary ml-4">Full Name</label>
                  <input type="text" placeholder="Aarav Sharma" className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-2xl px-6 py-4 text-biomen-text-primary focus:outline-none focus:border-[#0FA36B] transition-colors font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-biomen-text-secondary ml-4">Email Address</label>
                  <input type="email" placeholder="aarav@example.com" className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-2xl px-6 py-4 text-biomen-text-primary focus:outline-none focus:border-[#0FA36B] transition-colors font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-biomen-text-secondary ml-4">Subject</label>
                <select className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-2xl px-6 py-4 text-biomen-text-secondary focus:outline-none focus:border-[#0FA36B] transition-colors font-medium appearance-none">
                  <option>Order Status</option>
                  <option>Protocol Question</option>
                  <option>Adverse Reaction</option>
                  <option>Wholesale Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-biomen-text-secondary ml-4">Message</label>
                <textarea rows="5" placeholder="How can our science team help?" className="w-full bg-biomen-bg-primary border border-biomen-text-primary/10 rounded-2xl px-6 py-4 text-biomen-text-primary focus:outline-none focus:border-[#0FA36B] transition-colors font-medium resize-none"></textarea>
              </div>

              <button className="btn-sweep w-full bg-biomen-copper hover:bg-biomen-copper-dark text-biomen-text-primary py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.2)] flex items-center justify-center gap-3">
                Send Transmission <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
