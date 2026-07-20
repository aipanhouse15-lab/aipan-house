/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/aipan/lakshmi-pad-motif', destination: '/aipan/lakshmi-pad', permanent: true },
    ]
  },
}
