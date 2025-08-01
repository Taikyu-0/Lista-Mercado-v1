"use client"

import { useState } from "react"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart, Trash2, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"

interface GroceryItem {
  id: string
  name: string
  category: string
  checked: boolean
}

interface GroceryListProps {
  onBack: () => void
}

const initialItems: GroceryItem[] = [
  // Frutas e Verduras
  { id: "1", name: "Banana", category: "Frutas e Verduras", checked: false },
  { id: "2", name: "Maçã", category: "Frutas e Verduras", checked: false },
  { id: "3", name: "Tomate", category: "Frutas e Verduras", checked: false },
  { id: "4", name: "Alface", category: "Frutas e Verduras", checked: false },
  { id: "5", name: "Cebola", category: "Frutas e Verduras", checked: false },
  { id: "6", name: "Batata", category: "Frutas e Verduras", checked: false },

  // Laticínios
  { id: "7", name: "Leite", category: "Laticínios", checked: false },
  { id: "8", name: "Queijo", category: "Laticínios", checked: false },
  { id: "9", name: "Iogurte", category: "Laticínios", checked: false },
  { id: "10", name: "Manteiga", category: "Laticínios", checked: false },

  // Carnes e Peixes
  { id: "11", name: "Frango", category: "Carnes e Peixes", checked: false },
  { id: "12", name: "Carne Bovina", category: "Carnes e Peixes", checked: false },
  { id: "13", name: "Peixe", category: "Carnes e Peixes", checked: false },

  // Padaria
  { id: "14", name: "Pão", category: "Padaria", checked: false },
  { id: "15", name: "Biscoito", category: "Padaria", checked: false },

  // Mercearia
  { id: "16", name: "Arroz", category: "Mercearia", checked: false },
  { id: "17", name: "Feijão", category: "Mercearia", checked: false },
  { id: "18", name: "Macarrão", category: "Mercearia", checked: false },
  { id: "19", name: "Óleo", category: "Mercearia", checked: false },
  { id: "20", name: "Açúcar", category: "Mercearia", checked: false },
  { id: "21", name: "Sal", category: "Mercearia", checked: false },
  { id: "31", name: "Farinha de Trigo", category: "Mercearia", checked: false },
  { id: "32", name: "Café", category: "Mercearia", checked: false },
  { id: "33", name: "Chá", category: "Mercearia", checked: false },
  { id: "34", name: "Molho de Tomate", category: "Mercearia", checked: false },
  { id: "35", name: "Tempero Completo", category: "Mercearia", checked: false },

  // Limpeza
  { id: "22", name: "Detergente", category: "Limpeza", checked: false },
  { id: "23", name: "Sabão em Pó", category: "Limpeza", checked: false },
  { id: "24", name: "Papel Higiênico", category: "Limpeza", checked: false },
  { id: "25", name: "Desinfetante", category: "Limpeza", checked: false },
  { id: "26", name: "Limpador Multiuso", category: "Limpeza", checked: false },
  { id: "27", name: "Esponja de Cozinha", category: "Limpeza", checked: false },
  { id: "28", name: "Pano de Prato", category: "Limpeza", checked: false },
  { id: "29", name: "Lixeira", category: "Limpeza", checked: false },
  { id: "30", name: "Sacos de Lixo", category: "Limpeza", checked: false },
]

const categories = ["Frutas e Verduras", "Laticínios", "Carnes e Peixes", "Padaria", "Mercearia", "Limpeza"]

export function GroceryList({ onBack }: GroceryListProps) {
  const [items, setItems] = useState<GroceryItem[]>(initialItems)
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Frutas e Verduras")
  const isMobile = useIsMobile()

  // Prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const addItem = () => {
    if (newItem.trim() !== "") {
      const item: GroceryItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        category: selectedCategory,
        checked: false,
      }
      setItems([...items, item])
      setNewItem("")
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const clearChecked = () => {
    setItems(items.filter((item) => !item.checked))
  }

  const getItemsByCategory = (category: string) => {
    return items.filter((item) => item.category === category)
  }

  const getTotalItems = () => items.length
  const getCheckedItems = () => items.filter((item) => item.checked).length

  const scrollToTop = () => {
    const listContainer = document.getElementById('list-container')
    if (listContainer) {
      listContainer.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToBottom = () => {
    const listContainer = document.getElementById('list-container')
    if (listContainer) {
      listContainer.scrollTo({ top: listContainer.scrollHeight, behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 ${isMobile ? 'h-screen' : 'min-h-screen'} p-2 sm:p-4`}>
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
                <ShoppingCart className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-green-600 dark:text-green-400`} />
                <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-gray-800 dark:text-white`}>Lista de Compras</h1>
              </div>
              <ThemeToggle />
            </div>
            <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-4 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-300`}>
              <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>Total: {getTotalItems()}</Badge>
              <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>Marcados: {getCheckedItems()}</Badge>
              <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>Restantes: {getTotalItems() - getCheckedItems()}</Badge>
            </div>
          </div>
        </div>

        {/* Área de Adicionar Item - Fixa */}
        <div className="flex-shrink-0 mb-2 sm:mb-4">
          <Card className={isMobile ? 'shadow-sm' : ''}>
            <CardHeader className={isMobile ? 'pb-2' : ''}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Plus className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Adicionar Item
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'pt-0' : ''}>
              <div className={`flex flex-col ${isMobile ? 'gap-2' : 'sm:flex-row gap-3'}`}>
                <Input
                  placeholder="Nome do item..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  className={`flex-1 ${isMobile ? 'h-10 text-sm' : ''}`}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isMobile ? 'py-2 h-10 text-sm' : 'py-2'}`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button 
                  onClick={addItem} 
                  className={`bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 ${isMobile ? 'h-10 text-sm' : ''}`}
                >
                  <Plus className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão Limpar Itens Marcados - Fixo */}
        {getCheckedItems() > 0 && (
          <div className="flex-shrink-0 mb-2 sm:mb-4 text-center">
            <Button
              onClick={clearChecked}
              variant="outline"
              className={`text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 bg-transparent ${isMobile ? 'h-8 text-xs' : ''}`}
            >
              <Trash2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
              {isMobile ? `Remover (${getCheckedItems()})` : `Remover Itens Marcados (${getCheckedItems()})`}
            </Button>
          </div>
        )}

        {/* Área de Scroll da Lista - Com altura mínima */}
        <div className="flex-1 min-h-0 relative">
          <div 
            id="list-container"
            className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 ${isMobile ? 'pr-2' : 'pr-16'}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(209 213 219) transparent',
              minHeight: isMobile ? '200px' : '250px'
            }}
          >
            <div className={`grid ${isMobile ? 'gap-3' : 'gap-6'} pb-4`}>
              {categories.map((category) => {
                const categoryItems = getItemsByCategory(category)
                if (categoryItems.length === 0) return null

                return (
                  <Card key={category} className={`shadow-sm hover:shadow-md transition-shadow card-hover ${isMobile ? 'shadow-sm' : ''}`}>
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
                            className={`flex items-center justify-between ${isMobile ? 'p-2' : 'p-3'} rounded-lg border transition-all min-h-[${isMobile ? '40px' : '48px'}] ${
                              item.checked
                                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <Checkbox 
                                id={item.id} 
                                checked={item.checked} 
                                onCheckedChange={() => toggleItem(item.id)}
                                className="flex-shrink-0"
                              />
                              <label
                                htmlFor={item.id}
                                className={`font-medium cursor-pointer truncate ${isMobile ? 'text-sm' : ''} ${item.checked ? "line-through" : ""}`}
                              >
                                {item.name}
                              </label>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className={`text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 flex-shrink-0 ${isMobile ? 'h-6 w-6 p-0' : 'h-8 w-8 p-0'}`}
                            >
                              <Trash2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Botões de Navegação de Scroll - Apenas em desktop */}
          {!isMobile && (
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={scrollToTop}
                className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg scroll-button border-gray-200 dark:border-gray-600"
                title="Ir para o topo"
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={scrollToBottom}
                className="w-8 h-8 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg scroll-button border-gray-200 dark:border-gray-600"
                title="Ir para o final"
              >
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer Fixo */}
        <div className={`flex-shrink-0 ${isMobile ? 'mt-2' : 'mt-4'} text-center text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <p>Agradeça o Rafinha !</p>
        </div>
      </div>
    </div>
  )
} 