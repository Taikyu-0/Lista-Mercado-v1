"use client"

import { useState } from "react"
import * as React from "react"
import { LandingPage } from "./landing-page"
import { GroceryList } from "./grocery-list"
import { GroceryReport } from "./grocery-report"
import { useIsMobile } from "@/components/ui/use-mobile"

export function AppContainer() {
  const [currentView, setCurrentView] = useState<'landing' | 'list' | 'report'>('landing')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [checkedItems, setCheckedItems] = useState<any[]>([])
  const isMobile = useIsMobile()

  // Prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('list')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400)
  }

  const handleBack = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('landing')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400)
  }

  const handleShowReport = (items: any[]) => {
    setCheckedItems(items)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('report')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400)
  }

  const handleBackFromReport = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView('list')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${isMobile ? 'min-h-screen' : 'min-h-screen'}`}>
      {/* Barra superior decorativa apenas no desktop */}
      {!isMobile && (
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700 z-0" />
      )}
      
      <div className={`${isMobile ? '' : 'max-w-6xl mx-auto pt-16'}`}>
      {/* Landing Page */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          currentView === 'landing' && !isTransitioning 
            ? 'translate-y-0 opacity-100 scale-100' 
            : '-translate-y-full opacity-0 scale-95'
        }`}
        style={{
          transform: currentView === 'landing' && !isTransitioning 
            ? 'translateY(0) scale(1)' 
            : 'translateY(-100%) scale(0.95)',
          opacity: currentView === 'landing' && !isTransitioning ? 1 : 0
        }}
      >
        <LandingPage onStart={handleStart} />
      </div>

      {/* Grocery List */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          currentView === 'list' && !isTransitioning 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95'
        }`}
        style={{
          transform: currentView === 'list' && !isTransitioning 
            ? 'translateY(0) scale(1)' 
            : 'translateY(100%) scale(0.95)',
          opacity: currentView === 'list' && !isTransitioning ? 1 : 0
        }}
      >
        <GroceryList onBack={handleBack} onShowReport={handleShowReport} />
      </div>

      {/* Grocery Report */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          currentView === 'report' && !isTransitioning 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95'
        }`}
        style={{
          transform: currentView === 'report' && !isTransitioning 
            ? 'translateY(0) scale(1)' 
            : 'translateY(100%) scale(0.95)',
          opacity: currentView === 'report' && !isTransitioning ? 1 : 0
        }}
      >
        <GroceryReport onBack={handleBackFromReport} checkedItems={checkedItems} />
      </div>

      {/* Overlay de transição */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-blue-500/20 dark:from-green-400/20 dark:to-blue-400/20 z-10 transition-opacity duration-300" />
      )}
      </div>
    </div>
  )
} 