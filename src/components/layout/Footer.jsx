import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Our work', '/portfolio'],
  ['About us', '/about']
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050b18]">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0052ff]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr_.65fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65 }}>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0052ff]">Have a project in mind?</p>
            <Link to="/contact" className="group mt-5 inline-flex max-w-2xl items-end gap-4 font-heading text-4xl font-semibold leading-tight tracking-[-.04em] text-white sm:text-6xl">
              Let’s make it happen
              <ArrowUpRight className="mb-2 shrink-0 text-[#0052ff] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .12 }}>
            <p className="text-xs uppercase tracking-[.2em] text-[#71839d]">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#b9c9dc]">
              {footerLinks.map(([label, path]) => (
                <Link key={path} to={path} className="group flex w-fit items-center gap-2 transition hover:text-[#5f8cff]">
                  <span className="h-px w-0 bg-[#0052ff] transition-all duration-300 group-hover:w-4" />{label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .2 }}>
            <p className="text-xs uppercase tracking-[.2em] text-[#71839d]">Talk to us</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-[#b9c9dc]">
              <a href="tel:+94722616616" className="group flex items-center gap-3 transition hover:text-[#5f8cff]"><Phone className="transition group-hover:scale-110" size={15} /> 0722 616 616</a>
              <a href="mailto:info@qubriant.com" className="group flex items-center gap-3 transition hover:text-[#5f8cff]"><Mail className="transition group-hover:scale-110" size={15} /> info@qubriant.com</a>
              <span>Colombo, Sri Lanka</span>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6, delay: .18 }} className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-[#71839d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <motion.img whileHover={{ rotate: 8, scale: 1.08 }} src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span>© {new Date().getFullYear()} Qubriant Technologies (Pvt) Ltd.</span>
          </div>
          <div className="flex gap-5">
            <Link className="transition hover:text-white" to="/privacy-policy">Privacy</Link>
            <Link className="transition hover:text-white" to="/terms">Terms</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
