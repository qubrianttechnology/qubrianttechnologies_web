import CTASection from '../components/sections/CTASection';
import { industries } from '../data/siteData';

function IndustriesPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Industries</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Flexible solutions for a diverse range of industries.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">Qubriant designs technology that supports industry-specific operations, customer experience, and long-term growth.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <div key={industry} className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-heading text-xl font-semibold text-white">{industry}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">We help organizations in this space modernize operations with secure, adaptable, and insight-driven digital products.</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Industry-focused delivery" title="Let’s shape a product strategy for your sector." description="We adapt our approach to the realities of your market, regulations, users, and growth goals." primaryLabel="Discuss Your Industry" secondaryLabel="Explore Solutions" />
    </main>
  );
}

export default IndustriesPage;
