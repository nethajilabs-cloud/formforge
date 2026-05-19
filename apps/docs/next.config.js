/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@formforge/core',
    '@formforge/react',
    '@formforge/themes',
    '@formforge/validator',
    '@formforge/layout-engine',
    '@formforge/accessibility',
  ],
}

export default nextConfig
