/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@formforges/core',
    '@formforges/react',
    '@formforges/themes',
    '@formforges/validator',
    '@formforges/layout-engine',
    '@formforges/accessibility',
  ],
}

export default nextConfig
