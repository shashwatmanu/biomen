import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

const LongTestimonials = () => {
  const stories = [
    {
      name: "David R., 42",
      headline: "My baseline energy feels like it did in my 20s.",
      story: "I work 60 hours a week and try to train 4 days. By Thursday, I was usually completely burned out. I started taking T-CORE as an experiment. Within the first two weeks, I noticed I was waking up before my alarm, and my afternoon brain fog vanished. By day 60, my recovery in the gym had improved significantly, and my recent bloodwork showed a total testosterone increase of 180 ng/dL compared to last year. It’s not magic, it’s just the right biological foundation.",
      stats: ["+180 ng/dL Total T", "Eliminated afternoon crashes"]
    },
    {
      name: "Michael T., 35",
      headline: "The missing link in my daily routine.",
      story: "I had my diet and sleep dialed in, but my drive was just flat. I didn't want to jump straight to aggressive hormone therapies because of the side effects. T-CORE provided the exact middle ground I was looking for. It took about a month to really kick in, but the shift in my focus and motivation has been incredible. I’ve leaned out slightly, but the biggest change is just the consistent daily drive.",
      stats: ["Noticeable drive increase", "Improved daily focus"]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-black/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Clinical Outcomes, Real Stories</h2>
          <p className="text-gray-400">Detailed feedback from men committed to the T-CORE protocol.</p>
        </div>

        <div className="flex flex-col gap-12">
          {stories.map((story, i) => (
            <div key={i} className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-biomen-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="md:w-1/3 shrink-0">
                  <div className="flex text-biomen-accent mb-4">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{story.headline}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-wider mb-6">
                    {story.name} <BadgeCheck size={16} className="text-biomen-accent" />
                  </div>
                  
                  <div className="space-y-2">
                    {story.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white/5 px-4 py-2 rounded-lg text-sm text-biomen-accent font-medium border border-white/5">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <p className="text-gray-300 text-lg leading-relaxed italic">"{story.story}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LongTestimonials;
