/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
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
