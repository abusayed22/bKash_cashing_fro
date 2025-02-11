/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'unityagro.com',
            port: '',
            // pathname: '/account123/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
