import CTASection from '../components/sections/CTASection';

function PrivacyPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Privacy Policy</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">This policy outlines how Qubriant Technologies collects, uses, and protects your information when you visit our website or engage with us.</p>
        <div className="mt-8 space-y-6 text-sm leading-8 text-slate-400">
          <p>We collect information you provide through contact forms, project inquiries, and public communications. This may include your name, email address, company details, and message contents.</p>
          <p>We use this information to respond to inquiries, understand project requirements, improve our services, and maintain secure and compliant operations.</p>
          <p>We do not sell your personal data. We may share information with trusted service providers that support our operations under appropriate confidentiality obligations.</p>
          <p>We recommend that you contact us if you would like to review, update, or delete your information.</p>
        </div>
      </section>
      <CTASection eyebrow="Questions" title="Have questions about privacy or data handling?" description="We’re happy to help you understand how your information is used and protected." primaryLabel="Contact Us" secondaryLabel="Back Home" primaryHref="/contact" secondaryHref="/" />
    </main>
  );
}

export default PrivacyPage;
