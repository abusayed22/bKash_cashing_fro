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
    async headers() {
      return [
          {
              source: '/:path*', // Match all routes
              headers: [
                  { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
                  { key: 'Pragma', value: 'no-cache' },
                  { key: 'Expires', value: '0' },
              ],
          },
      ];
  },
};

export default nextConfig;
