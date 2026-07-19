import { Star } from 'lucide-react';

function TestimonialCard({ testimonial }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_0_40px_rgba(2,8,23,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-6 text-lg leading-8 text-slate-300">“{testimonial.quote}”</p>
      <div className="mt-8 flex items-center gap-4">
        <img src={testimonial.image} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-slate-400">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
