/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        geru: { DEFAULT: '#9E2B1E', deep: '#6E1A10', warm: '#C9472E' },
        rice: '#FBF6EE',
        // hill / mountain palette (from homepage)
        valley: { light: '#cdd8c4', DEFAULT: '#8CA08C', deep: '#5E7458' },
        slate: { DEFAULT: '#23323e', soft: '#3a4a56', mute: '#7a8690' },
        snow: '#dfeaf2',
        sand: '#E4C99A',
        gold: '#E0A04A',
        ink: '#23323e',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        head: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Spectral"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1140px', reading: '680px' },
    },
  },
  plugins: [],
}
