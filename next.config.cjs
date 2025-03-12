// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    swcMinify: true,
    experimental: {
        polyfillsOptimization: true
    }
};

module.exports = nextConfig;
