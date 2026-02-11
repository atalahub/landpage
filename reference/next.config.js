/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  compiler: {
    // Remove unnecessary polyfills for modern browsers
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // SWC minification is enabled by default in Next.js 13+
  // This ensures maximum compression for JS and CSS
  swcMinify: true,
  // Optimize production builds (disable source maps to reduce size)
  productionBrowserSourceMaps: false,
  // Experimental features for better optimization
  experimental: {
    optimizePackageImports: ['date-fns'],
  },
  // Disable polyfills for modern browsers
  transpilePackages: [],
  // Webpack optimizations for better compression
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production optimizations for maximum compression
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        sideEffects: false,
        // Tree shaking
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
      
      // Remove polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
      
      // Exclude polyfills from core-js - more aggressive approach
      const existingAlias = config.resolve.alias || {}
      config.resolve.alias = {
        ...existingAlias,
        'core-js/modules/es.array.at': false,
        'core-js/modules/es.array.flat': false,
        'core-js/modules/es.array.flat-map': false,
        'core-js/modules/es.object.from-entries': false,
        'core-js/modules/es.object.has-own': false,
        'core-js/modules/es.string.trim-end': false,
        'core-js/modules/es.string.trim-start': false,
        'core-js': false,
        '@swc/helpers': false,
      }
      
      // Prevent polyfills from being included
      if (config.plugins) {
        config.plugins = config.plugins.filter((plugin) => {
          return !(plugin && plugin.constructor && plugin.constructor.name === 'ProvidePlugin' && plugin.definitions && Object.keys(plugin.definitions).some((key) => key.includes('core-js')))
        })
      }
    }
    return config
  },
}

module.exports = nextConfig

