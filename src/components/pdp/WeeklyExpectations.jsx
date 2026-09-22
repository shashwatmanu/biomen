import React from 'react';
import { Calendar } from 'lucide-react';

const WeeklyExpectations = () => {
  const weeks = [
    {
      range: "Weeks 1-2",
      title: "Cellular Hydration & Micronutrient Replenishment",
      points: [
        "Slight improvement in morning wakefulness.",
        "Reduction in mid-afternoon energy crashes.",
        "Initial support of the stress response system."
      ]
    },
    {
      range: "Weeks 3-4",
      title: "Adaptogenic Loading & Hormonal Foundation",
      points: [
        "Noticeable increase in sustained daily drive.",
        "Improved recovery times after physical exertion.",
        "Better sleep architecture and deeper rest."
      ]
    },
    {
      range: "Weeks 5-8",
      title: "Systemic Optimization",
      points: [
        "Consistent, steady energy levels throughout the week.",
        "Enhanced focus and mental clarity during stressful tasks.",
        "Supported natural testosterone metabolism."
      ]
    },
    {
      range: "Weeks 9+",
      title: "The New Baseline",
      points: [
        "Vitality feels natural and effortless.",
        "Physical and mental resilience is maintained.",
        "Long-term biological support is established."
      ]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-biomen-green" id="what-to-expect">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The 12-Week Protocol</h2>
            <p className="text-gray-300 text-lg">Detailed expectations for your body’s adjustment period.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeks.map((week, i) => (
            <div key={i} className="bg-black/30 p-8 rounded-3xl border border-white/5 hover:border-biomen-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={20} className="text-biomen-accent" />
                <div className="text-biomen-accent font-black uppercase tracking-widest text-sm">{week.range}</div>
              </div>
              <h3 className="text-xl font-bold mb-6 text-white">{week.title}</h3>
              <ul className="space-y-3">
                {week.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyExpectations;
