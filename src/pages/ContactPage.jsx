import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import CTASection from '../components/sections/CTASection';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const formRef = useRef(null);

  const EMAILJS_PUBLIC_KEY = 'I4KvdMD3eQ3NaryRE';
  const EMAILJS_SERVICE_ID = 'service_bovi3to';
  const EMAILJS_TEMPLATE_ID = 'template_jr2brw9';
  const emailjsConfigured = EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE' && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID_HERE';

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
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
      const timeString = new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      if (emailjsConfigured) {
        const payload = {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          company: form.company,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          attachments: attachments.length > 0 ? attachments.map((file) => file.name).join(', ') : 'No files attached',
        };

        if (formRef.current) {
          await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);
        } else {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
        }

        setStatus('✅ Thank you! Your inquiry has been sent successfully. We will get back to you soon.');
      } else {
        const subject = encodeURIComponent(`New inquiry from ${form.name}`);
        const bodyLines = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Company: ${form.company}`,
          `Service: ${form.service}`,
          `Budget: ${form.budget}`,
          `Timeline: ${form.timeline}`,
          `Message: ${form.message}`,
        ];

        if (attachments.length > 0) {
          bodyLines.push(`Attachments: ${attachments.map((file) => file.name).join(', ')}`);
        }

        const body = encodeURIComponent(bodyLines.join('\n'));

        window.location.href = `mailto:qubrianttechnology@gmail.com?subject=${subject}&body=${body}`;
        setStatus('📧 Your email app has opened. Please send the message from there if it did not open automatically.');
      }

      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
      setAttachments([]);
    } catch (error) {
      const errorText = error?.text || error?.message || 'Failed to send inquiry. Please try again or contact us directly.';
      const isTemplateIssue = /template/i.test(errorText) || error?.status === 404;

      if (isTemplateIssue) {
        const subject = encodeURIComponent(`New inquiry from ${form.name}`);
        const bodyLines = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Company: ${form.company}`,
          `Service: ${form.service}`,
          `Budget: ${form.budget}`,
          `Timeline: ${form.timeline}`,
          `Message: ${form.message}`,
        ];

        if (attachments.length > 0) {
          bodyLines.push(`Attachments: ${attachments.map((file) => file.name).join(', ')}`);
        }

        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:qubrianttechnology@gmail.com?subject=${subject}&body=${body}`;
        setStatus('📧 The EmailJS template could not be used. Your email app has opened with the inquiry details so you can send it directly.');
      } else {
        setStatus(`❌ ${errorText}`);
      }

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
            <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" className="mt-8 grid gap-4 md:grid-cols-2">
              <input required name="from_name" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required name="from_email" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input name="phone" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input name="company" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input name="service" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Service required" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
              <input name="budget" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Estimated budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
              <input name="timeline" className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Project timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
              <textarea required name="message" className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none md:col-span-2" placeholder="Project details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <div className="md:col-span-2">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-5 text-sm text-slate-400">
                  <span>{attachments.length > 0 ? `Attached: ${attachments.length} file${attachments.length > 1 ? 's' : ''}` : 'Attach project files'}</span>
                  <input
                    type="file"
                    name="attachment"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg,.zip,.rar"
                    className="hidden"
                    onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                  />
                </label>
                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
                        <span className="truncate pr-3">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                          className="text-xs font-semibold text-rose-300 transition hover:text-rose-200"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
