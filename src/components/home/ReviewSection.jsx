import React, { useState, useEffect } from 'react';
import { Star, BadgeCheck, Play, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
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
        setNewReview({ name: '', rating: 5, comment: '' });
        fetchReviews();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase text-white">Clinical Feedback</h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="font-bold text-xl text-gray-300">4.9/5 Average Rating</span>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)]"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showForm && (
          <div className="mb-16 bg-white/5 p-8 rounded-[2rem] border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white uppercase">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                required
              />
              <select 
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
              <textarea 
                placeholder="What changes have you noticed?"
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors h-32"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              />
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                Submit Review <Send size={18} />
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Testimonial Placeholder */}
          <div className="lg:col-span-1 aspect-[4/5] bg-gradient-to-br from-emerald-900/20 to-black rounded-[2.5rem] border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-2xl">
                <Play fill="currentColor" size={32} />
              </div>
            </div>
            <div className="absolute bottom-10 left-10 pr-6">
              <div className="font-black text-2xl mb-1 uppercase tracking-tighter">Trainer Feedback</div>
              <div className="text-sm text-gray-400 font-medium">Authentic results from clinical trials</div>
            </div>
          </div>

          {/* Text Reviews */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="bg-white/5 rounded-[2rem] h-[250px] animate-pulse border border-white/5" />)
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="bg-gradient-to-b from-white/5 to-transparent p-10 rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex text-orange-500">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-white text-lg leading-relaxed mb-8 font-medium italic">
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
