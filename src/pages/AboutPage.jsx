import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/sections/CTASection';
import { teamMembers } from '../data/siteData';

function AboutPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">About Us</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Building premium digital products for a more intelligent future.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">Qubriant Technologies is a modern software development and digital innovation company focused on creating secure, scalable, and high-performing products for ambitious organizations.</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-2xl font-semibold text-white">Mission</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">To create intelligent, reliable, and scalable software solutions that help businesses achieve meaningful digital growth.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-2xl font-semibold text-white">Vision</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">To become a globally trusted technology partner known for innovation, engineering excellence, and long-term client success.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <SectionHeading eyebrow="Values" title="The principles that guide our work." description="We build with integrity, discipline, and a strong commitment to quality and client success." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {['Innovation', 'Integrity', 'Quality', 'Collaboration', 'Security', 'Continuous Learning', 'Client Success'].map((value) => (
            <div key={value} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
              <h3 className="font-heading text-xl font-semibold text-white">{value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <SectionHeading eyebrow="Leadership" title="Experienced minds shaping thoughtful technology." description="Our leadership team brings together strategy, product understanding, and engineering depth." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/20" />
              <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{member.name}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-8 backdrop-blur-xl">
        <h2 className="font-heading text-3xl font-semibold text-white">Technology philosophy</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">We believe in creating elegant systems that are usable, adaptable, and resilient. Our process balances product ambition with engineering discipline and long-term maintainability.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {['Quality standards', 'Development principles'].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <h3 className="font-heading text-xl font-semibold text-white">{item}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">We prioritize clarity, measurable outcomes, dependable delivery, and continuous improvement across every engagement.</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Ready to partner" title="Let’s shape your next intelligent product experience." description="Whether you need a new platform or a transformation initiative, we’re ready to help you build with confidence." primaryLabel="Start a Conversation" secondaryLabel="Explore Services" />
    </main>
  );
}

export default AboutPage;
