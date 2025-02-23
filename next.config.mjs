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
      async headers() {
        return [
            {
                source: '/:path*', 
                headers: [
                    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
                ],
            },
        ];
    },
};

export default nextConfig;
