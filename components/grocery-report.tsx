"use client"

import { useState } from "react"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, CheckCircle, TrendingUp, Calendar, BarChart3, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"

interface GroceryItem {
  id: string
  name: string
  category: string
  checked: boolean
}

interface GroceryReportProps {
  onBack: () => void
  checkedItems: GroceryItem[]
}

export function GroceryReport({ onBack, checkedItems }: GroceryReportProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  // Prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getItemsByCategory = (category: string) => {
    return checkedItems.filter((item) => item.category === category)
  }

  const categories = ["Frutas e Verduras", "Laticínios", "Carnes e Peixes", "Padaria", "Mercearia", "Limpeza"]
  
  const totalItems = checkedItems.length
  const categoriesWithItems = categories.filter(category => getItemsByCategory(category).length > 0)

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
      <div className={`max-w-4xl mx-auto ${isMobile ? 'h-full flex flex-col' : 'h-screen flex flex-col'}`}>
        {/* Header Fixo */}
        <div className="flex-shrink-0 mb-2 sm:mb-4">
          <div className="text-center">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className={`flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white ${isMobile ? 'text-sm' : ''}`}
              >
                <ArrowLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                {isMobile ? 'Voltar' : 'Voltar'}
              </Button>
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-green-600 dark:text-green-400`} />
                <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-gray-800 dark:text-white`}>Relatório</h1>
              </div>
              <ThemeToggle />
            </div>
            <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-4 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-300`}>
              <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>Total: {totalItems}</Badge>
              <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>Categorias: {categoriesWithItems.length}</Badge>
            </div>
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-3 gap-4'} ${isMobile ? 'mb-4' : 'mb-6'} animate-slide-up px-2 sm:px-4`}>
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 touch-feedback">
            <CardContent className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
              <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                <div className={`${isMobile ? 'p-1' : 'p-2 sm:p-3'} bg-green-100 dark:bg-green-900/30 rounded-full`}>
                  <CheckCircle className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-green-600 dark:text-green-400`} />
                </div>
                <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-gray-800 dark:text-white`}>
                  Itens Comprados
                </h3>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-green-600 dark:text-green-400`}>
                  {totalItems}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 touch-feedback">
            <CardContent className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
              <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                <div className={`${isMobile ? 'p-1' : 'p-2 sm:p-3'} bg-blue-100 dark:bg-blue-900/30 rounded-full`}>
                  <BarChart3 className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-blue-600 dark:text-blue-400`} />
                </div>
                <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-gray-800 dark:text-white`}>
                  Categorias
                </h3>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-blue-600 dark:text-blue-400`}>
                  {categoriesWithItems.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 touch-feedback">
            <CardContent className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
              <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                <div className={`${isMobile ? 'p-1' : 'p-2 sm:p-3'} bg-purple-100 dark:bg-purple-900/30 rounded-full`}>
                  <TrendingUp className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-purple-600 dark:text-purple-400`} />
                </div>
                <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-gray-800 dark:text-white`}>
                  Produtividade
                </h3>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-purple-600 dark:text-purple-400`}>
                  {totalItems > 0 ? '100%' : '0%'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Itens por Categoria */}
        <div className="flex-1 min-h-0 relative">
          <div 
            className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 ${isMobile ? 'pr-2' : 'pr-16'}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(209 213 219) transparent',
              minHeight: isMobile ? '200px' : '250px'
            }}
          >
            <div className={`grid ${isMobile ? 'gap-3' : 'gap-6'} pb-4`}>
              {categoriesWithItems.map((category) => {
                const categoryItems = getItemsByCategory(category)
                if (categoryItems.length === 0) return null

                return (
                  <Card key={category} className={`shadow-sm hover:shadow-md transition-shadow card-hover animate-fade-in ${isMobile ? 'shadow-sm' : ''}`}>
                    <CardHeader className={isMobile ? 'pb-2' : ''}>
                      <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-700 dark:text-gray-200 flex items-center justify-between`}>
                        <span>{category}</span>
                        <Badge variant="secondary" className={isMobile ? 'text-xs' : ''}>
                          {categoryItems.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={isMobile ? 'pt-0' : ''}>
                      <div className={`grid ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        {categoryItems.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between ${isMobile ? 'p-2' : 'p-3'} rounded-lg border bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300 transition-all min-h-[${isMobile ? '40px' : '48px'}]`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-green-600 dark:text-green-400 flex-shrink-0`} />
                              <span className={`font-medium truncate ${isMobile ? 'text-sm' : ''}`}>
                                {item.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Botão de Voltar para Lista */}
        <div className={`flex-shrink-0 ${isMobile ? 'mt-4' : 'mt-6'} animate-fade-in-delayed px-2 sm:px-4`}>
          <Button
            size={isMobile ? "default" : "lg"}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto touch-target"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onBack}
          >
            Voltar para Lista
            <ArrowRight className={`ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Button>
        </div>

        {/* Footer */}
        <div className={`${isMobile ? 'mt-2' : 'mt-12 sm:mt-16'} text-center text-gray-400 dark:text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'} animate-fade-in-delayed-3 px-2 sm:px-4 ${isMobile ? 'pb-2' : 'pb-8'}`}>
          <p>Relatório gerado com ❤️ pelo Rafinha</p>
        </div>
      </div>
    </div>
  )
} 