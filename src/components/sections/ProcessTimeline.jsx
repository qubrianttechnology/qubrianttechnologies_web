import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Compass, PenTool, Code2, TestTube2, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  { title: 'Discovery', description: 'We understand your goals, users, constraints, and the opportunity ahead.', icon: Compass },
  { title: 'Strategy', description: 'We shape a technical roadmap aligned to product vision and business outcomes.', icon: BrainCircuit },
  { title: 'UI/UX Design', description: 'We design intuitive journeys and polished interfaces with clarity and purpose.', icon: PenTool },
  { title: 'Development', description: 'We build with resilient architecture, clean code, and scalable foundations.', icon: Code2 },
  { title: 'Testing', description: 'We validate functionality, performance, and quality before launch.', icon: TestTube2 },
  { title: 'Deployment', description: 'We launch with precision, monitoring, and a focus on continuity.', icon: Rocket },
  { title: 'Support', description: 'We maintain, iterate, and help your product grow after delivery.', icon: LifeBuoy }
];

function ProcessTimeline() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Development Process</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">A structured path from idea to impact.</h2>
        </div>
        <div className="mt-12 space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(2,8,23,0.35)] backdrop-blur-xl lg:flex lg:items-center lg:justify-between">
                <div className="absolute left-6 top-6 h-full w-px bg-gradient-to-b from-cyan-400/30 to-transparent lg:left-auto lg:top-auto lg:right-8 lg:h-px lg:w-full" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">{index + 1}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">{step.description}</p>
                  </div>
                </div>
                <div className="relative mt-4 lg:mt-0">
                  <ArrowRight className="text-slate-500" size={18} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessTimeline;
