import { mockReviews } from '../data/mockReviews';

const Testimonials = () => {
  return (
    <section className="py-12 border-t border-white/5">
      <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8 text-center">User Feedback</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.slice(0, 6).map((review, index) => (
          <div key={index} className="border border-white/5 bg-[#0a0a0a] p-6">
            <p className="text-slate-300 italic mb-4">"{review.review}"</p>
            <div className="text-sm font-bold text-cyan-400">- {review.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
