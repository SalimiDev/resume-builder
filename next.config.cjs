/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    output: 'export',
    experimental: {
        polyfillsOptimization: true
    }
};

module.exports = nextConfig;
