/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
  }
