function TrustedSection() {
  const items = ['Custom Software', 'Artificial Intelligence', 'SaaS Platforms', 'Mobile Apps', 'Cloud & DevOps', 'UI/UX Design'];
  const loop = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#0052ff] py-5 text-white" aria-label="Core capabilities">
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-heading text-sm font-bold uppercase tracking-[.2em]">{item}</span>
            <span className="text-xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default TrustedSection;
