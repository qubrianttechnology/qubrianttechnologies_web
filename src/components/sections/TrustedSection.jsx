function TrustedSection() {
  const brands = ['NovaForge', 'Northstar', 'Aurex', 'Helio', 'Lumen', 'Flux'];

  return (
    <section className="border-y border-white/10 bg-slate-950/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Trusted Technology</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white">Built for Growth, Designed with Precision.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 backdrop-blur-xl">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedSection;
