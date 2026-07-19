import CTASection from '../components/sections/CTASection';

function TermsPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Terms and Conditions</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-white">Terms and Conditions</h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">These terms govern your use of the Qubriant Technologies website and related services.</p>
        <div className="mt-8 space-y-6 text-sm leading-8 text-slate-400">
          <p>By accessing this website, you agree to use the content responsibly and not engage in unlawful or disruptive activities.</p>
          <p>All content, design, and materials provided on this website are intended for informational and business communication purposes.</p>
          <p>Qubriant Technologies reserves the right to update, remove, or modify site content at any time without notice.</p>
          <p>Any project engagement, proposal, or service collaboration remains subject to a separate agreement where applicable.</p>
        </div>
      </section>
      <CTASection eyebrow="Need clarification" title="Review the terms before engaging with our team." description="If you have questions about usage, proposals, or project delivery, please get in touch." primaryLabel="Contact Us" secondaryLabel="Back Home" primaryHref="/contact" secondaryHref="/" />
    </main>
  );
}

export default TermsPage;
