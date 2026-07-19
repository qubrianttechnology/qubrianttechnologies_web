import CTASection from '../components/sections/CTASection';
import { insightsPosts } from '../data/siteData';

function InsightsPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Insights</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">Fresh thinking on software, AI, and digital product strategy.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">Explore thoughtful perspectives on product design, engineering, intelligence, and modern digital transformation.</p>
        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Featured article</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white">Designing intelligent product experiences with AI</h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">A practical look at balancing automation, trust, and human-centered workflows in modern products.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Newsletter</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">Receive curated insights on AI, product design, engineering, and technology strategy.</p>
              <form className="mt-6 space-y-3">
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Email address" />
                <button className="w-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {insightsPosts.map((post) => (
            <article key={post.title} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-7 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{post.category}</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-white">{post.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{post.excerpt}</p>
              <div className="mt-6 text-sm text-slate-500">{post.author} · {post.readTime}</div>
            </article>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Stay informed" title="Follow our latest thinking on intelligent digital transformation." description="Subscribe for practical insights, product perspectives, and technology updates from Qubriant." primaryLabel="Read More" secondaryLabel="Contact Team" />
    </main>
  );
}

export default InsightsPage;
