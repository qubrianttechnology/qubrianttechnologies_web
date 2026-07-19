import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function CTASection({ eyebrow, title, description, primaryLabel, secondaryLabel, primaryHref = '/contact', secondaryHref = '/about' }) {
  const isPrimaryExternal = primaryHref?.startsWith('http') || primaryHref?.startsWith('wa.me');
  const isSecondaryExternal = secondaryHref?.startsWith('http') || secondaryHref?.startsWith('wa.me');

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-cyan-400/20 bg-gradient-to-br from-purple-600/20 via-slate-950/90 to-cyan-500/15 p-8 shadow-[0_0_60px_rgba(124,58,237,0.2)] sm:p-12">
        <div className="max-w-3xl">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>}
          <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {isPrimaryExternal ? (
              <a href={primaryHref.startsWith('wa.me') ? `https://${primaryHref}` : primaryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white">
                {primaryLabel} <ArrowRight size={18} />
              </a>
            ) : (
              <Link to={primaryHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white">
                {primaryLabel} <ArrowRight size={18} />
              </Link>
            )}
            {isSecondaryExternal ? (
              <a href={secondaryHref.startsWith('wa.me') ? `https://${secondaryHref}` : secondaryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl">
                {secondaryLabel}
              </a>
            ) : (
              <Link to={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
