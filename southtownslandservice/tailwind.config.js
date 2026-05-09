/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2F2B27',
        moss: '#2d5016',
        olive: '#546326',
        sand: '#FFFCE9',
        mist: '#f5f5f5',
        sky: '#005a84'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(0, 0, 0, 0.12)',
        glow: '0 18px 60px rgba(45, 80, 22, 0.18)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 20% 20%, rgba(45, 80, 22, 0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(0, 90, 132, 0.16), transparent 22%), linear-gradient(180deg, rgba(17, 17, 17, 0.1), rgba(17, 17, 17, 0.7))'
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        display: ['SchotisText', 'Poppins', 'serif']
      }
    }
  },
  plugins: []
};
