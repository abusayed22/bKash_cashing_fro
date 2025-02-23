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
      // headers: () => [
      //   {
      //     source: '/:path*',
      //     headers: [
      //       {
      //         key: 'Cache-Control',
      //         value: 'no-store',
      //       },
      //     ],
      //   },
      // ],
      experimental: {
        staleTimes: {
          dynamic: 30,
        },
      },

      logging:{
        fetches:{
          fullUrl:true
        }
      }
};

export default nextConfig;
