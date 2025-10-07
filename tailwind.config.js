/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
        script: ['Dancing Script', 'Pacifico', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        neon: {
          red: '#DC0000',
          'red-bright': '#FF0000',
          magenta: '#FF00FF',
          cyan: '#00FFFF',
          blue: '#0080FF',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'ken-burns': 'kenburns 20s ease-out infinite alternate',
        'glitch-top': 'glitchTop 1s linear infinite',
        'glitch-bottom': 'glitchBottom 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenburns: {
          '100%': { transform: 'scale(1.15) translate(2%, -2%)' },
        },
        glitchTop: {
          '2%, 64%': { transform: 'translate(2px, -2px)' },
          '4%, 60%': { transform: 'translate(-2px, 2px)' },
          '62%': { transform: 'translate(13px, -1px) skew(-13deg)' },
        },
        glitchBottom: {
          '2%, 64%': { transform: 'translate(-2px, 0)' },
          '4%, 60%': { transform: 'translate(-2px, 0)' },
          '62%': { transform: 'translate(-22px, 5px) skew(21deg)' },
        },
      },
    },
  },
  plugins: [],
};
