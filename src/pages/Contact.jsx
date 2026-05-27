import React from 'react';
import { Mail, MessageSquare, MapPin, Send, Phone } from 'lucide-react';
import Footer from '../components/shared/Footer';

const Contact = () => {
  return (
    <div className="bg-[#030705] min-h-screen text-[#F4F6F2] pt-48">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 leading-none">
            Connect <br/> <span className="text-[#0FA36B]">With Labs</span>
          </h1>
          <p className="text-xl text-[#A8B3AA] font-medium leading-relaxed max-w-2xl mx-auto">
            Our science team is here to support your protocol. Expect a response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#052E22] border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-[#16C784] shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#A8B3AA] mb-2">Protocol Support</h3>
                  <div className="text-2xl font-black text-white hover:text-[#16C784] transition-colors cursor-pointer">support@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#052E22] border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-[#16C784] shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#A8B3AA] mb-2">Press & Partnerships</h3>
                  <div className="text-2xl font-black text-white hover:text-[#16C784] transition-colors cursor-pointer">partners@biomenlabs.com</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#052E22] border border-[#0FA36B]/20 rounded-2xl flex items-center justify-center text-[#16C784] shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#A8B3AA] mb-2">Headquarters</h3>
                  <div className="text-2xl font-black text-white">Biomen Labs Research Facility<br/>Mumbai, India</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#052E22]/30 border border-[#0FA36B]/20 rounded-[2rem] flex items-center gap-6">
              <div className="w-12 h-12 bg-[#16C784] text-black rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <p className="text-sm font-bold text-[#A8B3AA]">
                Priority support available for active protocol subscribers.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0FA36B]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] ml-4">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#030705] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0FA36B] transition-colors font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] ml-4">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#030705] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0FA36B] transition-colors font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] ml-4">Subject</label>
                <select className="w-full bg-[#030705] border border-white/10 rounded-2xl px-6 py-4 text-[#A8B3AA] focus:outline-none focus:border-[#0FA36B] transition-colors font-medium appearance-none">
                  <option>Order Status</option>
                  <option>Protocol Question</option>
                  <option>Adverse Reaction</option>
                  <option>Wholesale Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A8B3AA] ml-4">Message</label>
                <textarea rows="5" placeholder="How can our science team help?" className="w-full bg-[#030705] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0FA36B] transition-colors font-medium resize-none"></textarea>
              </div>

              <button className="w-full bg-[#D85A1F] hover:bg-[#b94a17] text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(216,90,31,0.2)] flex items-center justify-center gap-3">
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
