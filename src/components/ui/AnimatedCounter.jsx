import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const target = parseFloat(value);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
      <p className="font-heading text-4xl font-semibold text-white">{displayValue}{suffix}</p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}

export default AnimatedCounter;
