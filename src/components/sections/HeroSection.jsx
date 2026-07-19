import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_25%)]" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-20" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Sparkles size={16} /> Intelligent software engineering for global growth
          </div>
          <h1 className="mt-8 font-heading text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Engineering Intelligent Digital Experiences.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
            Qubriant Technologies builds innovative software, AI-powered solutions, web platforms, and mobile applications that help businesses transform, scale, and succeed.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl">
              <Play size={18} /> Explore Our Work
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(124,58,237,0.2)] backdrop-blur-xl">
            <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5">
                  <p className="text-sm text-slate-400">System Intelligence</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white">94%</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                  <p className="text-sm text-slate-400">Platform Uptime</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white">99.9%</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">AI Workflow Engine</p>
                  <p className="text-sm text-cyan-300">Live</p>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                </div>
                <div className="mt-6 grid gap-3">
                  {['Strategy', 'Automation', 'Security', 'Insights'].map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                      <span>{item}</span>
                      <span className="text-cyan-300">0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
