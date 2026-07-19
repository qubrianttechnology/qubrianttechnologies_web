import CTASection from '../components/sections/CTASection';
import { technologies } from '../data/siteData';

function TechnologiesPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Technologies</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">A modern toolchain built for product quality and speed.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">We select technologies based on performance, maintainability, team alignment, and long-term product strategy.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(technologies).map(([category, items]) => (
            <div key={category} className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold capitalize text-white">{category}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-slate-200">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Technology strategy" title="Let’s choose the right stack for your product ambition." description="We align the technology approach with your business model, delivery pace, and future roadmap." primaryLabel="Discuss Tech Stack" secondaryLabel="Talk to Our Team" />
    </main>
  );
}

export default TechnologiesPage;
