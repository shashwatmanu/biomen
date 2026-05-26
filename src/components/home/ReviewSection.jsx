import React, { useState, useEffect } from 'react';
import { Star, BadgeCheck, Play, Send, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', category: 'Morning Energy' });

  const categories = [
    "All",
    "Morning Energy",
    "Recovery Support",
    "Daily Focus",
    "Better Consistency",
    "Overall Vitality"
  ];

  const staticReviews = [
    {
      _id: "s1",
      name: "Amit Sharma",
      rating: 5,
      category: "Morning Energy",
      comment: "Waking up used to be a drag. Now I have a clean surge of energy right at 6 AM, no mid-day crashes or brain fog. It is the cleanest energy shift I've felt.",
      date: "2026-05-24"
    },
    {
      _id: "s2",
      name: "Vikram Malhotra",
      rating: 5,
      category: "Recovery Support",
      comment: "My muscle soreness after lifting has decreased significantly. I feel ready for the next session much faster, and my sleep quality is outstanding.",
      date: "2026-05-22"
    },
    {
      _id: "s3",
      name: "Rohan Verma",
      rating: 5,
      category: "Daily Focus",
      comment: "The mental fog is completely gone. I can focus on my deep work tasks for 4 hours straight without getting distracted or needing constant coffee.",
      date: "2026-05-20"
    },
    {
      _id: "s4",
      name: "Aditya Sen",
      rating: 5,
      category: "Better Consistency",
      comment: "T-Core has helped me stay highly consistent with my workouts and work discipline. It is a systematic habit that sets a steady tone for my day.",
      date: "2026-05-18"
    },
    {
      _id: "s5",
      name: "Kabir Mehta",
      rating: 5,
      category: "Overall Vitality",
      comment: "I just feel more like myself again. More drive, more stamina, stronger physical resilience, and much better stress tolerance at my high-pressure job.",
      date: "2026-05-15"
    }
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews([...staticReviews, ...data]);
      } else {
        setReviews(staticReviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews(staticReviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setShowForm(false);
        setNewReview({ name: '', rating: 5, comment: '', category: 'Morning Energy' });
        fetchReviews();
      } else {
        // Optimistic fallback update for mock state if API is not fully set up
        const mockNew = {
          _id: Math.random().toString(),
          name: newReview.name,
          rating: newReview.rating,
          category: newReview.category,
          comment: newReview.comment,
          date: new Date().toISOString()
        };
        setReviews([mockNew, ...reviews]);
        setShowForm(false);
        setNewReview({ name: '', rating: 5, comment: '', category: 'Morning Energy' });
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      // Mock fallback update
      const mockNew = {
        _id: Math.random().toString(),
        name: newReview.name,
        rating: newReview.rating,
        category: newReview.category,
        comment: newReview.comment,
        date: new Date().toISOString()
      };
      setReviews([mockNew, ...reviews]);
      setShowForm(false);
      setNewReview({ name: '', rating: 5, comment: '', category: 'Morning Energy' });
    }
  };

  const filteredReviews = activeCategory === 'All'
    ? reviews
    : reviews.filter(r => r.category === activeCategory);

  return (
    <section className="py-24 px-6 md:px-20 bg-black border-t border-white/5" id="testimonials">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block with exact intro copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block">
              User Testimonials
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white">
              Real Feedback. <br />
              <span className="text-emerald-400">Real Consistency.</span>
            </h2>
            <div className="space-y-4 text-gray-300 font-medium text-base md:text-lg leading-relaxed pt-2">
              <p className="font-bold text-white">
                What men usually notice first is not something dramatic. It is:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400 font-semibold uppercase tracking-wider pl-4 border-l-2 border-emerald-500/40">
                <li>✨ Cleaner mornings</li>
                <li>✨ Steadier energy</li>
                <li>✨ Stronger recovery</li>
                <li>✨ Better routine consistency</li>
                <li>✨ Feeling more like themselves again</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-5 lg:text-right flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-6 bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="text-center lg:text-right">
              <div className="flex text-orange-500 justify-center lg:justify-end mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="font-black text-2xl text-white block">4.9 / 5.0 Rating</span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mt-1">
                Verified feedback from men using T-Core as part of a real daily routine.
              </span>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)]"
            >
              {showForm ? 'Cancel Submission' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-white/15">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === cat ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="mb-16 bg-white/5 p-8 rounded-[2rem] border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white uppercase">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                />
                <select 
                  className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors font-bold uppercase tracking-wider text-xs"
                  value={newReview.category}
                  onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                >
                  {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <select 
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
              <textarea 
                placeholder="What clean energy or recovery changes have you noticed?"
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors h-32"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              />
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                Submit Experience <Send size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-500 uppercase tracking-widest font-bold">
              No experiences recorded in this category yet.
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review._id} className="bg-gradient-to-b from-white/5 to-transparent p-8 rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all group flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex text-orange-500">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                      {review.category || "Overall Vitality"}
                    </span>
                  </div>
                  <p className="text-white text-base leading-relaxed mb-8 font-medium italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-full flex items-center justify-center text-emerald-400 font-black text-sm border border-emerald-500/20">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase text-xs tracking-wider">{review.name}</div>
                    <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mt-0.5">
                      <BadgeCheck size={10} /> Verified User
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Link */}
        <div className="mt-16 text-center">
          <Link 
            to="/reviews" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-black uppercase tracking-[0.2em] text-xs transition-all hover:gap-4"
          >
            Load More Reviews <ArrowRight size={14} className="text-orange-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
