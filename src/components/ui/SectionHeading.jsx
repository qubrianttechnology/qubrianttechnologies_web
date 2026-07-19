function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>}
      <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-8 text-slate-400">{description}</p>}
    </div>
  );
}

export default SectionHeading;
