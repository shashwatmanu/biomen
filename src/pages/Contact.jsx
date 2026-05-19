import React from 'react';
import { Mail, MessageSquare, MapPin, Send, Phone } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-48">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            Connect <br/> <span className="text-emerald-500">With Labs</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Our science team is here to support your protocol. Expect a response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Info Side */}
          <div>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Protocol Support</h3>
                  <div className="text-2xl font-black text-white hover:text-emerald-500 transition-colors cursor-pointer">support@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Press & Partnerships</h3>
                  <div className="text-2xl font-black text-white hover:text-emerald-500 transition-colors cursor-pointer">partners@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Headquarters</h3>
                  <div className="text-2xl font-black text-white">Biomen Labs Research Facility<br/>Mumbai, India / NY, USA</div>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-emerald-950/20 border border-emerald-500/30 rounded-[2rem] flex items-center gap-6">
              <div className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <p className="text-sm font-bold text-gray-300">
                Priority support available for active protocol subscribers.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Subject</label>
                <select className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium appearance-none">
                  <option>Order Status</option>
                  <option>Protocol Question</option>
                  <option>Adverse Reaction</option>
                  <option>Wholesale Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Message</label>
                <textarea rows="5" placeholder="How can our science team help?" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium resize-none"></textarea>
              </div>

              <button className="w-full bg-orange-600 hover:bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3">
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
