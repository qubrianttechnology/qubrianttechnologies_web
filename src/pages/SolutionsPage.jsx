import CTASection from '../components/sections/CTASection';

const solutions = [
  {
    title: 'AI Business Assistants',
    problem: 'Teams need faster access to knowledge and actions across fragmented tools.',
    solution: 'We design copilots and assistants that connect systems, automate workflows, and surface insights quickly.',
    features: ['Natural language input', 'Secure knowledge retrieval', 'Workflow automation'],
    benefits: ['Improved productivity', 'Faster decision-making', 'Lower operational friction']
  },
  {
    title: 'Customer Support Automation',
    problem: 'Support teams need faster, more consistent service at scale.',
    solution: 'We build omnichannel support workflows with automation, knowledge bases, and intelligent routing.',
    features: ['Chat automation', 'Ticket triage', 'Knowledge base integrations'],
    benefits: ['Lower response times', 'Higher consistency', 'Better customer experience']
  },
  {
    title: 'E-commerce Platforms',
    problem: 'Brands need reliable digital storefronts that convert and scale.',
    solution: 'We create elegant commerce experiences with product discovery, checkout, and backend integrations.',
    features: ['Personalized shopping flows', 'Inventory control', 'Secure payments'],
    benefits: ['Stronger conversion', 'Better retention', 'Flexible growth']
  }
];

function SolutionsPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Solutions</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Purpose-built solutions for modern business challenges.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">We translate complex needs into scalable digital systems that create strategic advantage.</p>
        </div>

        <div className="mt-16 space-y-8">
          {solutions.map((solution) => (
            <div key={solution.title} className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold text-white">{solution.title}</h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Problem</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{solution.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Qubriant solution</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{solution.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Key features</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-400">
                    {solution.features.map((feature) => <li key={feature}>• {feature}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {solution.benefits.map((benefit) => (
                  <span key={benefit} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">{benefit}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Let’s discuss your challenge" title="Bring your operational complexity to a clearer digital future." description="We can design a solution that increases efficiency, improves experience, and scales with your team." primaryLabel="Book a Strategy Call" secondaryLabel="Explore Services" />
    </main>
  );
}

export default SolutionsPage;
