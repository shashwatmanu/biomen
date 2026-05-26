import React, { useState, useEffect } from 'react';
import { Star, BadgeCheck, MessageSquare, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    window.scrollTo(0, 0);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              The Protocol <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 font-black">Feedback Hub</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-2xl font-black tracking-tight">4.9/5 RATING</span>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm border-l border-white/20 pl-4">3,794 Reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse border border-white/5" />
            ))
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-gradient-to-b from-white/5 to-transparent p-10 rounded-[2.5rem] border border-white/10 hover:border-emerald-500/50 transition-all group flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex text-orange-500">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                      {review.category || "Overall Vitality"}
                    </span>
                  </div>
                  <p className="text-white text-lg leading-relaxed mb-8 font-medium italic opacity-90">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-black">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase text-sm tracking-wider">{review.name}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mt-0.5">
                      <BadgeCheck size={12} /> Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-emerald-900/20 via-black to-emerald-900/20 p-16 rounded-[3rem] border border-white/5">
          <MessageSquare size={48} className="mx-auto mb-6 text-emerald-500" />
          <h2 className="text-3xl font-black uppercase mb-4">Have you tried the Protocol?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto font-medium">
            Join thousands of men who have optimized their vitality. Share your results with the community.
          </p>
          <Link to="/" className="inline-block bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)]">
            Write a Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
