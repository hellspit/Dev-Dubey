/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/',
          outputPath: 'static/',
        },
      },
    });
    return config;
  },
  // Add configuration for large files
  experimental: {
    largePageDataBytes: 128 * 100000, // Increase the limit for large files
  },
  // Configure static file handling
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Disable SSR for the entire app since we're using Three.js
  swcMinify: true,
  // Add transpilePackages for Three.js
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Increase the maximum payload size
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
  // Add webpack configuration for Three.js
  webpack: (config) => {
    config.externals.push({
      'react-native-config': 'react-native-config',
    });
    return config;
  },
}

module.exports = nextConfig; 