import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050b18]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr_.65fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0052ff]">Have a project in mind?</p>
            <Link to="/contact" className="group mt-5 inline-flex max-w-2xl items-end gap-4 font-heading text-4xl font-semibold leading-tight tracking-[-.04em] text-white sm:text-6xl">
              Let’s make it happen <ArrowUpRight className="mb-2 shrink-0 text-[#0052ff] transition group-hover:rotate-45" />
            </Link>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#71839d]">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#b9c9dc]">
              <Link to="/services" className="hover:text-[#0052ff]">Services</Link>
              <Link to="/solutions" className="hover:text-[#0052ff]">Solutions</Link>
              <Link to="/portfolio" className="hover:text-[#0052ff]">Our work</Link>
              <Link to="/about" className="hover:text-[#0052ff]">About us</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#71839d]">Talk to us</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-[#b9c9dc]">
              <a href="tel:+94722616616" className="flex items-center gap-3 hover:text-[#0052ff]"><Phone size={15} /> 0722 616 616</a>
              <a href="mailto:info@qubriant.com" className="flex items-center gap-3 hover:text-[#0052ff]"><Mail size={15} /> info@qubriant.com</a>
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-[#71839d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span>© {new Date().getFullYear()} Qubriant Technologies (Pvt) Ltd.</span>
          </div>
          <div className="flex gap-5"><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
