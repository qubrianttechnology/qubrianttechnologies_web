import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import TrustedSection from '../components/sections/TrustedSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import ProjectCard from '../components/ui/ProjectCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import TestimonialCard from '../components/ui/TestimonialCard';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import CTASection from '../components/sections/CTASection';
import { services, projects, stats, testimonials, technologies } from '../data/siteData';
import { ArrowRight, ShieldCheck, Layers3, Rocket, MessageCircleMore, Zap, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <TrustedSection />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Premium software solutions, carefully engineered." description="From strategic consulting to long-term maintenance, we build with a premium blend of craft, intelligence, and operational readiness." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_50px_rgba(2,8,23,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">About Qubriant</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white">Technology designed around your business.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Qubriant combines software engineering, intelligent automation, user-centered design, and strategic thinking to create secure, scalable, and high-performing digital products.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Innovation', 'Forward-looking systems and elegant execution.'],
                ['Security', 'Responsible engineering with a strong foundation.'],
                ['Scalability', 'Built to adapt as teams and operations grow.'],
                ['Support', 'Long-term care for reliable product performance.']
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
              Learn more about us <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_50px_rgba(124,58,237,0.18)]">
            <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-purple-500/15 to-cyan-500/15 p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                  <ShieldCheck className="text-cyan-300" size={24} />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">Secure by Design</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">Security, privacy, and resilience shape every layer of our delivery model.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                  <Layers3 className="text-purple-300" size={24} />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">Scalable Foundations</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">Composable architecture supports rapid growth and new product initiatives.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                  <Rocket className="text-cyan-300" size={24} />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">Agile Delivery</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">Focused execution that keeps projects moving while maintaining quality.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                  <MessageCircleMore className="text-purple-300" size={24} />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">Transparent Communication</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">Clear collaboration, shared visibility, and thoughtful decision-making.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Qubriant" title="A premium experience from strategy to support." description="We combine business focus, design clarity, engineering excellence, and long-term partnership in every engagement." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Business-focused solutions', 'Product thinking aligned with your commercial goals.'],
              ['Scalable architecture', 'Future-ready systems built for growth.'],
              ['Modern technology stack', 'Reliable tools and practices for speed and quality.'],
              ['Secure development practices', 'A strong foundation for trust and resilience.'],
              ['Transparent communication', 'Open collaboration and shared visibility.'],
              ['Agile delivery', 'Iterative progress with measurable outcomes.'],
              ['Long-term technical support', 'Care that continues beyond launch.'],
              ['User-centered design', 'Interfaces crafted around meaningful interactions.']
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-cyan-300">
                  <Zap size={18} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Projects" title="Sample work that demonstrates our approach." description="These demonstration projects reflect how we shape software experiences for ambitious teams and growing organizations." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Technology Stack" title="Built with modern tools that support speed, quality, and scalability." description="We select the right stack for each product so teams can move confidently and deliver with clarity." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(technologies).map(([category, items]) => (
              <div key={category} className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="font-heading text-xl font-semibold capitalize text-white">{category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-slate-200">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Impact" title="Placeholder statistics for future verification." description="These values should be replaced with verified company metrics before launch or publication." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value.replace(/\D/g, '')} label={stat.label} suffix={stat.value.includes('+') ? '+' : ''} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="Placeholder client feedback for future publication." description="Only genuine testimonials should be published on the live site." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Let’s build" title="Have an idea? Let’s build something exceptional." description="Share your vision with Qubriant and turn it into a secure, scalable, and powerful digital solution." primaryLabel="Discuss Your Project" secondaryLabel="Contact Our Team" />
    </main>
  );
}

export default HomePage;
