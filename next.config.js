/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Keep Turbopack scoped to this extracted project. Without this, a lockfile
  // higher in the user's directory can be mistaken for the workspace root.
  turbopack: { root: __dirname },
  async redirects() {
    return [
      { source: '/aipan/lakshmi-pad-motif', destination: '/aipan/lakshmi-pad', permanent: true },
    ]
  },
}
