/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para desenvolvimento local e de rede
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configurações para permitir acesso de rede
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Configurações de servidor
  serverRuntimeConfig: {
    // Configurações específicas do servidor
  },
  publicRuntimeConfig: {
    // Configurações públicas
  },
}

export default nextConfig
