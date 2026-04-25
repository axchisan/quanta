import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'phaser': 'phaser/dist/phaser.min.js',
    };
    return config;
  },
};

export default nextConfig;