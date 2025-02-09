/** @type {import('next').NextConfig} */
const nextConfig = {
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
