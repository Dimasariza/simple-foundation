/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
    },
    images: {
        unoptimized: true
    },
    // output: "export",
    reactStrictMode: false,
    trailingSlash: true,
    env: {
        PUBLIC_URL: process.env.PUBLIC_URL,
        DB_URL: process.env.DB_URL,
    },
};

export default nextConfig;