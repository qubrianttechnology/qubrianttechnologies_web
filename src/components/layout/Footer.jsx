import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-white">Qubriant</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            We build intelligent software, scalable platforms, AI-powered systems, and premium digital experiences for modern businesses.
          </p>
          <div className="mt-6 flex gap-3">
            {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
              <a key={index} href="#" className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-white">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Navigation</h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/solutions" className="hover:text-white">Solutions</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Our Work</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li>hello@qubriant.com</li>
            <li>+94 78 7777 216</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Stay Updated</h4>
          <p className="mt-5 text-sm text-slate-400">Receive insights on product design, AI, and software engineering.</p>
          <form className="mt-4 flex flex-col gap-3">
            <input className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0" placeholder="Email address" />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© 2026 Qubriant Technologies (Pvt) Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
