import { ArrowUpRight } from 'lucide-react';

function ProjectCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 shadow-[0_0_40px_rgba(2,8,23,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-purple-400/30">
      <div className="relative h-56 overflow-hidden">
        <img src={project.image} alt={project.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          {project.category}
        </div>
      </div>
      <div className="p-7">
        <h3 className="font-heading text-2xl font-semibold text-white">{project.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{tech}</span>
          ))}
        </div>
        <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-white">
          View case study <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
