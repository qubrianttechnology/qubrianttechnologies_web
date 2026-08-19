import { motion } from 'framer-motion';
import { ArrowUpRight, Asterisk, Braces, Cpu, Layers3, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  { label: 'AI / ML', icon: Cpu, position: 'left-0 top-12' },
  { label: 'Web & SaaS', icon: Braces, position: 'right-0 top-4' },
  { label: 'Cloud', icon: Layers3, position: 'bottom-2 right-8' }
];

function HeroSection() {
  return (
    <section className="noise relative min-h-[calc(100vh-76px)] overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute right-[-5rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full border border-[#0052ff]/10" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#65d9ff]/25 bg-[#65d9ff]/[.06] px-4 py-2 text-xs uppercase tracking-[.22em] text-[#c7d7eb]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0052ff]" />
            Sri Lanka · Building worldwide
          </div>
          <h1 className="mt-8 max-w-4xl font-heading text-[clamp(3.4rem,7.2vw,7rem)] font-semibold leading-[.91] tracking-[-.06em] text-[#eef6ff]">
            Software that moves
            <span className="block text-outline">business forward.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#9fb2ca] sm:text-xl">
            We design and engineer custom software, AI products, web platforms and mobile experiences that turn ambitious ideas into scalable businesses.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#2d6bff] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(45,107,255,.28)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#071426]">
              Start a project <ArrowUpRight className="transition group-hover:rotate-45" size={18} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[.02] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#65d9ff]/50 hover:bg-[#65d9ff]/[.06]">
              Explore our work
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[.18em] text-[#6f829c]">
            <span>Strategy</span><Asterisk size={14} className="text-[#6b0aff]" />
            <span>Design</span><Asterisk size={14} className="text-[#6b0aff]" />
            <span>Engineering</span><Asterisk size={14} className="text-[#6b0aff]" />
            <span>Scale</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative mx-auto hidden aspect-square w-full max-w-[500px] lg:block">
          <div className="absolute inset-[15%] rounded-full bg-[#2d6bff]/10 blur-3xl" />
          <div className="absolute inset-[8%] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-white/20" />
          <div className="absolute inset-[24%] animate-[spin_18s_linear_infinite_reverse] rounded-full border border-[#0052ff]/30" />
          <div className="absolute inset-[37%] flex items-center justify-center rounded-full bg-[#0052ff] text-white shadow-[0_0_80px_rgba(107,10,255,.32)]">
            <Orbit size={48} strokeWidth={1.5} />
          </div>
          {capabilities.map(({ label, icon: Icon, position }, index) => (
            <motion.div key={label} className={`absolute ${position} float-slow rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4 shadow-2xl backdrop-blur-xl`} style={{ animationDelay: `${index * .7}s` }}>
              <Icon className="text-[#0052ff]" size={20} />
              <p className="mt-3 text-sm font-semibold text-white">{label}</p>
            </motion.div>
          ))}
          <div className="absolute bottom-10 left-3 rounded-2xl border border-[#6b0aff]/20 bg-[#6b0aff]/10 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#b89cff]">Built for</p>
            <p className="mt-1 font-heading text-xl text-white">Real impact</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
