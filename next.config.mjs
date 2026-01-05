/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/my',
          permanent: false,
        },
      ];
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ui-avatars.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
