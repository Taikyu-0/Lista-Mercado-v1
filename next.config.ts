import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Removendo output: "export" para permitir servidor de desenvolvimento
  // output: "export",
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
}

export default nextConfig
