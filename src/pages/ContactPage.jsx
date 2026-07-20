import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import CTASection from '../components/sections/CTASection';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailjs.init('TyqwNrqRGWtcy6imM');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!form.name || !form.email || !form.message) {
      setStatus('Please complete the required fields.');
      return;
    }
    
    if (!emailRegex.test(form.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      await emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', {
        to_email: 'qubrianttechnology@gmail.com',
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        company: form.company,
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
      });

      setStatus('✅ Thank you! Your inquiry has been sent successfully. We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
    } catch (error) {
      setStatus('❌ Failed to send inquiry. Please try again or contact us directly.');
      console.error('Email error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Contact</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Let’s discuss the next step for your product or platform.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">Share your ambitions with us and we’ll help you shape a clear path forward.</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-2xl font-semibold text-white">Project inquiry</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <input required className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Service required" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Estimated budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Project timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
              <textarea required className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none md:col-span-2" placeholder="Project details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-5 text-sm text-slate-400 md:col-span-2">
                Attach project files
                <input type="file" className="hidden" />
              </label>
              <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white md:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
              {status && <p className={`text-sm md:col-span-2 ${status.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{status}</p>}
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold text-white">Contact details</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
                <li>quabrianttechnology@gmail.com</li>
                <li>+94 78 777 7216</li>
                <li>Colombo, Sri Lanka</li>
              </ul>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold text-white">Business hours</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">Mon–Fri · 9:00 AM – 6:00 PM</p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-semibold text-white">FAQ</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">We typically begin with a discovery conversation, followed by a tailored proposal and roadmap.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Need a consultation" title="Let's map out your next digital move." description="We're ready to support a new product, a redesign, an AI initiative, or a platform modernization project." primaryLabel="Book a Call" secondaryLabel="View Services" primaryHref="wa.me/94724643109" secondaryHref="/services" />
    </main>
  );
}

export default ContactPage;
