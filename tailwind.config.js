/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Aipan: white rice-paste on red geru ground
        geru: { DEFAULT: '#9E2B1E', deep: '#6E1A10', warm: '#B8412C', soft: '#C45A45' },
        rice: '#FBF6EE',        // warm rice-paste white
        cream: '#FDF9F3',
        ivory: '#F6EEE2',
        sand: '#EBDFCE',
        gold: { DEFAULT: '#C6A55C', light: '#DCC084', muted: '#A98F52' },
        ink: '#241712',        // deep warm near-black
        clay: '#7A5A4A',
        taupe: '#A8907E',
      },
      fontFamily: {
        // Display: characterful serif. Body: readable serif. UI: humanist sans.
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Spectral"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { prose: '68ch', content: '1180px' },
      borderRadius: { sm: '8px', md: '16px', lg: '28px', pill: '999px' },
      boxShadow: {
        soft: '0 8px 40px rgba(110,26,16,0.07)',
        hover: '0 16px 60px rgba(110,26,16,0.12)',
      },
      keyframes: {
        riseIn: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'rise-in': 'riseIn 0.8s cubic-bezier(0.22,1,0.36,1) both' },
    },
  },
  plugins: [],
}
