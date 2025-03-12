/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    experimental: {
        polyfillsOptimization: true
    },
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/resume-builder' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/resume-builder/' : ''
};

module.exports = nextConfig;
