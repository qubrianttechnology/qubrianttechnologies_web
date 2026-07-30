import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from '../../data/siteData';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'border-white/10 bg-[#050b18]/90 shadow-[0_12px_45px_rgba(0,0,0,.22)] backdrop-blur-2xl' : 'border-transparent bg-[#050b18]'}`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${scrolled ? 'py-3' : 'py-4'}`}>
        <Link to="/" className="group flex items-center gap-3 text-white">
          <motion.div whileHover={{ rotate: 8, scale: 1.08 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="relative">
            <span className="absolute inset-0 rounded-full bg-[#0052ff]/25 opacity-0 blur-lg transition group-hover:opacity-100" />
            <img src="/logo.png" alt="Qubriant Technologies" className="relative h-10 w-10 object-contain" />
          </motion.div>
          <div>
            <p className="font-heading text-lg font-bold tracking-[-.03em] transition group-hover:text-[#78a1ff]">Qubriant</p>
            <p className="text-[9px] uppercase tracking-[.25em] text-[#71839d]">Technologies</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `group relative py-2 text-sm font-medium transition ${isActive ? 'text-[#5f8cff]' : 'text-[#a8b8cf] hover:text-white'}`}>
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-[#0052ff] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            <Link to="/contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0052ff] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(0,82,255,.28)]">
              <span className="absolute inset-0 translate-y-full bg-[#174fff] transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative">Start a Project</span>
              <ArrowUpRight className="relative transition-transform duration-300 group-hover:rotate-45" size={16} />
            </Link>
          </motion.div>
        </div>

        <button className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-100 transition hover:border-[#0052ff]/50 hover:bg-[#0052ff]/10 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={mobileOpen ? 'close' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .18 }} className="block">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-white/10 bg-[#050b18]/95 backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col gap-2 px-4 py-5">
              {navItems.map((item, index) => (
                <motion.div key={item.path} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * .035 }}>
                  <NavLink to={item.path} onClick={() => setMobileOpen(false)} className={({ isActive }) => `block rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-[#0052ff]/10 text-[#5f8cff]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#0052ff] px-4 py-3 text-sm font-bold text-white">
                Start a Project <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
