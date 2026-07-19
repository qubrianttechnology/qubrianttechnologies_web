import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <main className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[36px] border border-white/10 bg-white/5 px-8 py-20 text-center backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">404</p>
        <h1 className="mt-4 font-heading text-5xl font-semibold text-white sm:text-6xl">Page not found.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">The page you’re looking for may have moved or no longer exists.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white">
          <ArrowLeft size={16} /> Return home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
