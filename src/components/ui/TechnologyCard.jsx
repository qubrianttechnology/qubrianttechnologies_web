function TechnologyCard({ title, items }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_0_36px_rgba(2,8,23,0.45)] backdrop-blur-xl">
      <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-slate-200">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default TechnologyCard;
