import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

function ServiceCard({ title, description, icon, link }) {
  const Icon = Icons[icon];

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#091426] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#0052ff]/50 hover:bg-[#0d1c31] hover:shadow-glow">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#0052ff]/0 blur-2xl transition group-hover:bg-[#0052ff]/10" />
      <div className="relative">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#0052ff]/20 bg-[#0052ff]/10 text-[#0052ff]">
          {Icon ? <Icon size={20} /> : null}
        </div>
        <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
        <Link to={link} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0052ff] transition group-hover:gap-3">
          Learn more <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
