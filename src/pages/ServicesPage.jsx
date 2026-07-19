import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/sections/CTASection';
import { services } from '../data/siteData';

function ServicesPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Services</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Comprehensive services for modern digital products.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">We combine strategic consulting, product design, engineering, and support to deliver world-class digital experiences.</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold text-white">{service.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">{service.description}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="font-semibold text-white">Business benefits</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">Improved efficiency, better experience, and stronger systems readiness.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="font-semibold text-white">Technologies</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">Modern architecture, secure delivery, and scalable product practices.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Need a tailored solution" title="Let us shape a service plan around your goals." description="From initial discovery to long-term support, Qubriant can help you build with confidence and precision." primaryLabel="Request a Proposal" secondaryLabel="Contact Team" />
    </main>
  );
}

export default ServicesPage;
