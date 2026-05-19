import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-biomen-accent text-biomen-green text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <ShieldCheck size={64} className="mb-6 opacity-80" />
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The 90-Day Biological Guarantee</h2>
        <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 max-w-2xl">
          We believe in the science of T-CORE. Try it as a daily habit for 90 days. If you don't feel a noticeable shift in your energy, drive, and recovery, we will refund your purchase. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default GuaranteeSection;
