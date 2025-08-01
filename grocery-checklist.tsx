"use client"

import { useState } from "react"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart, Trash2, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"

interface GroceryItem {
  id: string
  name: string
  category: string
  checked: boolean
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

  // Limpeza
  { id: "22", name: "Detergente", category: "Limpeza", checked: false },
  { id: "23", name: "Sabão em Pó", category: "Limpeza", checked: false },
  { id: "24", name: "Papel Higiênico", category: "Limpeza", checked: false },
]

const categories = ["Frutas e Verduras", "Laticínios", "Carnes e Peixes", "Padaria", "Mercearia", "Limpeza"]

export default function Component() {
  const [items, setItems] = useState<GroceryItem[]>(initialItems)
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Frutas e Verduras")
  const [showAddForm, setShowAddForm] = useState(false)
  const isMobile = useIsMobile()

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
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
      if (isMobile) {
        setShowAddForm(false)
      }
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 ${isMobile ? 'mobile-scrollbar' : 'hide-scrollbar'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white">Lista de Compras</h1>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <Badge variant="outline" className="text-xs">Total: {getTotalItems()}</Badge>
            <Badge variant="outline" className="text-xs">Marcados: {getCheckedItems()}</Badge>
            <Badge variant="outline" className="text-xs">Restantes: {getTotalItems() - getCheckedItems()}</Badge>
          </div>
        </div>

        {/* Add New Item - Mobile Optimized */}
        {isMobile ? (
          <>
            {!showAddForm ? (
              <div className="mb-4">
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 h-12 text-base"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Item
                </Button>
              </div>
            ) : (
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Adicionar Item
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddForm(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Nome do item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                    className="h-12 text-base"
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Button 
                    onClick={addItem} 
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 h-12 text-base"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Adicionar Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Nome do item..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  className="flex-1"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button onClick={addItem} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clear Checked Items */}
        {getCheckedItems() > 0 && (
          <div className="mb-4 sm:mb-6 text-center">
            <Button
              onClick={clearChecked}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 bg-transparent h-10 sm:h-9 text-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remover Marcados ({getCheckedItems()})
            </Button>
          </div>
        )}

        {/* Categories */}
        <div className="grid gap-4 sm:gap-6">
          {categories.map((category) => {
            const categoryItems = getItemsByCategory(category)
            if (categoryItems.length === 0) return null

            return (
              <Card key={category} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg text-gray-700 dark:text-gray-200 flex items-center justify-between">
                    <span>{category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {categoryItems.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-2 sm:gap-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 sm:p-3 rounded-lg border transition-all min-h-[56px] sm:min-h-[48px] ${
                          item.checked
                            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Checkbox 
                            id={item.id} 
                            checked={item.checked} 
                            onCheckedChange={() => toggleItem(item.id)}
                            className="flex-shrink-0 touch-target"
                          />
                          <label
                            htmlFor={item.id}
                            className={`font-medium cursor-pointer truncate no-select ${item.checked ? "line-through" : ""}`}
                          >
                            {item.name}
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 flex-shrink-0 h-8 w-8 p-0 touch-target touch-feedback"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          <p>Agradeça o Rafinha !</p>
        </div>
      </div>
    </div>
  )
}
