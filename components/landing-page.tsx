"use client"

import { useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, ArrowRight, CheckCircle, Star, Users, Dog } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  //
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  //
    if (isMobile) {
      document.body.classList.add('mobile-scrollbar')
    } else {
      document.body.classList.remove('mobile-scrollbar')
    }
    
    // 
    return () => {
      document.body.classList.remove('mobile-scrollbar')
    }
  }, [isMobile])

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Esse site é pra gente se organizar",
      description: "As vezes pode dar problema , mas eu tento arrumar"
    },
    {
      icon: <Dog className="w-6 h-6 text-yellow-500" />,
      title: "Ainda é um teste",
      description: ""
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Pra gente",
      description: "Compra Salgadinho pra mim hehehe"
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isMobile ? 'h-screen' : 'min-h-screen'} p-2 sm:p-4`}
    >
      <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'h-full flex flex-col justify-between' : ''}`}>
        {/* Header com botão de tema */}
        <div className={`absolute ${isMobile ? 'top-4 right-4' : 'top-8 right-8'} z-10`}>
          <ThemeToggle />
        </div>

        {/* Logo e Título Principal */}
        <div className={`${isMobile ? 'pt-16 mb-4' : 'pt-16 mb-8 sm:mb-12'} animate-fade-in`}>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-6">
            <div className="relative">
              <ShoppingCart className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-16 sm:h-16'} text-green-600 dark:text-green-400 animate-bounce`} />
              <div className={`absolute -top-1 -right-1 ${isMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse`}>
                3
              </div>
            </div>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight`}>
              Lista do Mercado
            </h1>
          </div>
          <p className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg md:text-xl'} text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 sm:px-4`}>
            Pra gente não ter mais que fazer um monte de lista no whats !!
          </p>
        </div>

        {/* Cards de Features */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'} ${isMobile ? 'mb-4' : 'mb-8 sm:mb-12'} animate-slide-up px-2 sm:px-4`}>
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 touch-feedback">
              <CardContent className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
                <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                  <div className={`${isMobile ? 'p-1' : 'p-2 sm:p-3'} bg-gray-100 dark:bg-gray-800 rounded-full`}>
                    {feature.icon}
                  </div>
                  <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-gray-800 dark:text-white`}>
                    {feature.title}
                  </h3>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-300 text-center`}>
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão Principal */}
        <div className={`animate-fade-in-delayed ${isMobile ? 'px-2 mb-4' : 'px-4'}`}>
          <Button
            size={isMobile ? "default" : "lg"}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto touch-target"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStart}
          >
            Bora pra lista
            <ArrowRight className={`ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Button>
        </div>

        {/* Footer */}
        <div className={`${isMobile ? 'mt-2' : 'mt-12 sm:mt-16'} text-center text-gray-400 dark:text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'} animate-fade-in-delayed-3 px-2 sm:px-4 ${isMobile ? 'pb-2' : 'pb-8'}`}>
          <p>Desenvolvido com ❤️ pelo Rafinha</p>
        </div>
      </div>
    </div>
  )
} 