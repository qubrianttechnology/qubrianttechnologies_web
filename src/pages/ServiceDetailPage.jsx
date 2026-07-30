import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import CTASection from '../components/sections/CTASection';
import { servicePageList, servicePages } from '../data/servicePages';
import { serviceContent } from '../data/serviceContent';
import { projects, testimonials } from '../data/siteData';

const process = [
  ['Discover', 'We clarify the business case, users, constraints, and the outcomes that matter.'],
  ['Design', 'We map the experience and technical architecture before costly decisions are locked in.'],
  ['Build', 'Our team delivers in transparent iterations with testing, reviews, and regular demonstrations.'],
  ['Improve', 'We launch carefully, measure real usage, and keep improving the product with you.']
];

function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = servicePages[serviceSlug];
  if (!service) return <Navigate to="/services" replace />;
  const content = serviceContent[serviceSlug];
  const featuredProjects = content.projects
    .map((name) => projects.find((project) => project.name === name))
    .filter(Boolean);

  const related = servicePageList.filter((item) => item.slug !== serviceSlug).slice(0, 3);

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(0,82,255,.18),transparent_30%)]" />
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-white">Home</Link><ChevronRight size={14} />
            <Link to="/services" className="hover:text-white">Services</Link><ChevronRight size={14} />
            <span className="text-slate-300">{service.name}</span>
          </nav>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_.65fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.28em] text-[#4f86ff]">— {service.eyebrow}</p>
              <h1 className="mt-6 max-w-5xl font-heading text-4xl font-semibold leading-[1.06] tracking-[-.04em] text-white sm:text-6xl">{service.headline}</h1>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-300">{service.description}</p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0052ff] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#174fff]">
                Discuss your project <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">Why it matters</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">Built around the outcome, not just the technology.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-300">{service.intro}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-2xl border border-white/10 bg-[#091426] p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0052ff]/15 text-[#4f86ff]"><Check size={14} /></span>
                  <p className="text-sm leading-6 text-slate-300">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071020] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">Where it creates value</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">Practical solutions for real operating challenges.</h2>
              <p className="mt-6 leading-7 text-slate-400">{content.audience}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {content.useCases.map(([title, copy]) => (
                <article key={title} className="rounded-3xl border border-white/10 bg-[#091426] p-7">
                  <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-slate-500">Relevant industry experience</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {content.industries.map((industry) => <span key={industry} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">{industry}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">Selected project experience</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-.03em] text-white sm:text-5xl">See how we turn complex ideas into useful digital products.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-slate-400">Relevant work across AI, business platforms, customer experiences, and workflow-driven applications.</p>
            </div>
            <Link to="/portfolio" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#0052ff]">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className={`mt-12 grid gap-6 ${featuredProjects.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {featuredProjects.map((project) => (
              <article key={project.name} className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#091426] transition hover:-translate-y-1 hover:border-[#0052ff]/50">
                <div className="relative h-56 overflow-hidden">
                  <img src={project.image} alt={`${project.name} project by Qubriant Technologies`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091426] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#050b18]/80 px-3 py-1 text-xs font-semibold text-[#7ba3ff] backdrop-blur">{project.category}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((technology) => <span key={technology} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{technology}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] px-4 py-20 text-[#071426] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#315f86]">Client perspective</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-.03em] sm:text-4xl">A technology partner that stays focused on the outcome.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-3xl border border-[#071426]/10 bg-white/60 p-7">
                  <blockquote className="text-lg leading-8 text-[#304a64]">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-[#526b83]">{testimonial.role} · {testimonial.company}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] px-4 py-20 text-[#071426] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#315f86]">What we deliver</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <h2 className="font-heading text-3xl font-semibold tracking-[-.03em] sm:text-5xl">End-to-end {service.name.toLowerCase()} capabilities.</h2>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-[#071426]/15 bg-[#071426]/15 sm:grid-cols-2">
              {service.capabilities.map((capability, index) => (
                <div key={capability} className="bg-[#f5faff] p-6">
                  <span className="text-xs font-bold text-[#2563eb]">0{index + 1}</span>
                  <h3 className="mt-5 font-heading text-lg font-semibold">{capability}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">How we work</p>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">A clear path from opportunity to working product.</h2>
          <div className="mt-12 grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-4">
            {process.map(([title, copy], index) => (
              <article key={title} className="border-b border-white/10 py-8 md:px-7 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0">
                <span className="text-sm font-bold text-[#4f86ff]">0{index + 1}</span>
                <h3 className="mt-7 font-heading text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 rounded-3xl border border-white/10 bg-[#091426] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-slate-500">Technology selected for your goals</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {service.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{technology}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">Explore related services</p>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/services/${item.slug}`} className="group rounded-3xl border border-white/10 bg-[#091426] p-6 transition hover:-translate-y-1 hover:border-[#0052ff]/50">
                <h2 className="font-heading text-xl font-semibold text-white">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4f86ff]">Learn more <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4f86ff]">Frequently asked questions</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">What to know before you start.</h2>
            <p className="mt-5 leading-7 text-slate-400">Every engagement begins with your context. These answers explain our general approach; the right scope follows discovery.</p>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {content.faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-semibold text-white">
                  {question}<span className="text-2xl font-light text-[#4f86ff] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-4 text-sm leading-7 text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Start with a conversation" title={`Ready to explore ${service.name.toLowerCase()}?`} description="Tell us about the challenge, the outcome you need, and where you are today. We’ll help you identify the clearest next step." primaryLabel="Talk to our team" secondaryLabel="View all services" secondaryHref="/services" />
    </main>
  );
}

export default ServiceDetailPage;
