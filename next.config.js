/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    // If you're not using Edge Runtime everywhere, specify which pages should use it
    runtime: 'nodejs', // or 'edge' if you want to use Edge Runtime
}

module.exports = nextConfig
