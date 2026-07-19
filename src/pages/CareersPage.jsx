import CTASection from '../components/sections/CTASection';
import { jobOpenings } from '../data/siteData';

function CareersPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Careers</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Build meaningful products with a team that values craft and curiosity.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">Explore placeholder opportunities and connect with us for future collaboration, internships, and talent conversations.</p>
        </div>

        <div className="mt-16 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="font-heading text-2xl font-semibold text-white">Open positions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {jobOpenings.map((job) => (
              <div key={job.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold text-white">{job.title}</h3>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">{job.type}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-400">Location: {job.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-2xl font-semibold text-white">Application form</h2>
            <form className="mt-8 space-y-4">
              <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Full name" />
              <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Email address" />
              <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Role of interest" />
              <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-8 text-sm text-slate-400">
                Upload resume
                <input type="file" className="hidden" />
              </label>
            </form>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-2xl font-semibold text-white">Why join us</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
              <li>• Flexible collaboration and remote-first work</li>
              <li>• Growth focused culture and meaningful learning</li>
              <li>• Exposure to premium product and engineering practices</li>
              <li>• Equal opportunity and inclusive hiring principles</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Future opportunities" title="Tell us about your experience and interests." description="We welcome thoughtful conversations with future team members and interns." primaryLabel="Apply Now" secondaryLabel="Contact Careers" />
    </main>
  );
}

export default CareersPage;
