/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        midnight: '#020617',
        slateblue: '#111827',
        electric: '#7c3aed',
        cyan: '#22d3ee'
      },
      boxShadow: {
        glow: '0 0 60px rgba(124, 58, 237, 0.35)'
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
