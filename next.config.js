/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Keep Turbopack scoped to this extracted project. Without this, a lockfile
  // higher in the user's directory can be mistaken for the workspace root.
  turbopack: { root: __dirname },
  async redirects() {
    return [
      { source: '/aipan/lakshmi-pad-motif', destination: '/aipan/lakshmi-pad', permanent: true },
      { source: '/festival', destination: '/festivals', permanent: true },
      { source: '/festival/khatarua-uttarakhand', destination: '/festivals/khatarua', permanent: true },
      { source: '/p/festivals-of-uttarakhand-aipan-house', destination: '/festivals', permanent: true },
      { source: '/home/nanda-ashtami-2026-date-and-nanda-devi-traditions', destination: '/festivals/nanda-ashtami', permanent: true },
    ]
  },
}
