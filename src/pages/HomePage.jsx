import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Bot, Boxes, CloudCog, Code2, Smartphone, Store, Stethoscope, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import TrustedSection from '../components/sections/TrustedSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import CTASection from '../components/sections/CTASection';
import { services, technologies } from '../data/siteData';

const outcomes = [
  { number: '01', title: 'Think beyond the brief', copy: 'We challenge assumptions, find the highest-value opportunity and create a practical product roadmap.' },
  { number: '02', title: 'Design for real people', copy: 'Every interaction is clear, intentional and shaped around the people who will actually use it.' },
  { number: '03', title: 'Engineer for tomorrow', copy: 'Secure, maintainable architecture gives your product room to evolve without slowing down.' }
];

const industries = [
  ['Healthcare', Stethoscope], ['Fintech', Boxes], ['E-commerce', Store],
  ['Logistics', Truck], ['AI products', Bot], ['Startups', Code2]
];

function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <TrustedSection />

      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What we do" title="One partner. Every digital capability." description="From the first sketch to production at scale, our multidisciplinary team takes responsibility for the complete product journey." />
            <Link to="/services" className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0052ff]">View all services <ArrowUpRight className="transition group-hover:rotate-45" size={18} /></Link>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 8).map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] px-4 py-24 text-[#071426] sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-[#3e6688]">— The Qubriant difference</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_.85fr]">
            <h2 className="max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-6xl">We don’t just ship code. We solve the right problem.</h2>
            <p className="max-w-xl text-lg leading-8 text-[#4c6680]">Strong digital products sit where business strategy, human experience and engineering discipline meet. That intersection is where we do our best work.</p>
          </div>
          <div className="mt-16 grid border-y border-black/15 lg:grid-cols-3">
            {outcomes.map((item, index) => (
              <motion.article key={item.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="border-b border-black/15 py-9 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                <span className="font-heading text-sm font-bold text-[#2563eb]">{item.number}</span>
                <h3 className="mt-8 font-heading text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#526b83]">{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Built for your world" title="Industry context changes everything." description="We bring adaptable technology and domain-aware thinking to organizations at every stage of growth." />
            <Link to="/industries" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-[#0052ff]">Explore industries <ArrowUpRight size={17} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map(([name, Icon], index) => (
              <motion.div key={name} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#091426] p-6 transition hover:border-[#0052ff]/40">
                <span className="font-heading text-lg font-semibold">{name}</span><Icon className="text-[#647b96] transition group-hover:text-[#0052ff]" size={22} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[#091426] p-7 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#6b0aff]">Technology, with purpose</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight sm:text-4xl">The right stack for the challenge.</h2>
              <div className="mt-7 flex gap-3 text-[#0052ff]"><CloudCog /><Smartphone /><BadgeCheck /></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(technologies).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold uppercase tracking-[.2em] text-[#7288a1]">{category}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#c4d2e3]">{items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Your next move" title="Ready to turn complexity into momentum?" description="Tell us what you’re building, fixing or reimagining. We’ll bring the product thinking and engineering to move it forward." primaryLabel="Talk to our team" secondaryLabel="See our capabilities" secondaryHref="/services" />
    </main>
  );
}

export default HomePage;
