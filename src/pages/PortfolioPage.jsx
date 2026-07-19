import { projects } from '../data/siteData';
import CTASection from '../components/sections/CTASection';

function PortfolioPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Portfolio</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Selected projects that show our product thinking and execution.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">These are sample portfolio pieces intended to illustrate the quality and depth of our work.</p>
        </div>

        <div className="mt-16 space-y-8">
          {projects.map((project) => (
            <div key={project.name} className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
              <img src={project.image} alt={project.name} className="h-72 w-full object-cover lg:h-full" />
              <div className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{project.category}</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-white">{project.name}</h2>
                <p className="mt-4 text-base leading-8 text-slate-400">{project.description}</p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Challenge</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">Designing a solution that could scale while staying intuitive and fast to use.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Solution</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">A thoughtful product experience supported by modular architecture and modern delivery practices.</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((stack) => (
                    <span key={stack} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">{stack}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="See more" title="Let’s build a portfolio-worthy product with lasting impact." description="We create digital products that feel polished, perform reliably, and adapt as your organization grows." primaryLabel="Start Your Project" secondaryLabel="View Services" />
    </main>
  );
}

export default PortfolioPage;
