import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-white/10 bg-[#050b18]/90 backdrop-blur-2xl' : 'border-transparent bg-[#050b18]'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white transition-transform duration-300 hover:scale-105">
          <img src="/logo.png" alt="Qubriant Technologies" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-heading text-lg font-bold tracking-[-.03em]">Qubriant</p>
            <p className="text-[9px] uppercase tracking-[.25em] text-[#71839d]">Technologies</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-[#0052ff]' : 'text-[#a8b8cf] hover:text-white'}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0052ff] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white">
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </div>

        <button className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-100 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#050b18]/95 px-4 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-[#0052ff]/10 text-[#0052ff]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#0052ff] px-4 py-3 text-sm font-bold text-white">
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
