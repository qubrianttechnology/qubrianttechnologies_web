function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#0052ff]">— {eyebrow}</p>}
      <h2 className="font-heading text-3xl font-semibold leading-tight text-[#eef6ff] sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-lg leading-8 text-[#9fb2ca]">{description}</p>}
    </div>
  );
}

export default SectionHeading;
