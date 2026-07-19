import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { navItems } from '../../data/siteData';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-purple-950/20' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white transition-transform duration-300 hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-200 shadow-[0_0_24px_rgba(124,58,237,0.2)]">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold tracking-wide">Qubriant</p>
            <p className="text-xs text-slate-400">Technologies</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-4 py-2 text-sm font-semibold text-white shadow-glow">
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>

        <button className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-100 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-white/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
