import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

function ServiceCard({ title, description, icon, link }) {
  const Icon = Icons[icon];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_0_40px_rgba(7,14,28,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-cyan-300">
          {Icon ? <Icon size={20} /> : null}
        </div>
        <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
        <Link to={link} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-white">
          Learn more <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
