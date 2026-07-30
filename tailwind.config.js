/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['DM Sans', 'sans-serif']
      },
      colors: {
        midnight: '#050b18',
        slateblue: '#0b1628',
        electric: '#0052ff',
        cyan: '#0052ff'
      },
      boxShadow: {
        glow: '0 18px 70px rgba(0, 82, 255, 0.24)'
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
