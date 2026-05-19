import React, { useState, useEffect } from 'react';
import { Star, BadgeCheck, MessageSquare, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
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
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3">
              <Filter size={18} className="text-emerald-500" />
              <select className="bg-transparent outline-none font-bold uppercase tracking-widest text-xs cursor-pointer">
                <option>Newest First</option>
                <option>Highest Rated</option>
                <option>Verified Only</option>
              </select>
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
              <div key={review._id} className="bg-gradient-to-b from-white/5 to-transparent p-10 rounded-[2.5rem] border border-white/10 hover:border-emerald-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-orange-500">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed mb-8 font-medium italic opacity-90">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-black">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase text-sm tracking-wider">{review.name}</div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
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
