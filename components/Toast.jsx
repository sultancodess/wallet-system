'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-green-200 text-green-800'
      case 'error':
        return 'bg-white border-red-200 text-red-800'
      case 'warning':
        return 'bg-white border-yellow-200 text-yellow-800'
      default:
        return 'bg-white border-green-200 text-green-800'
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center p-4 rounded-xl border shadow-lg backdrop-blur-sm ${getStyles()}`}>
        <div className="flex items-center">
          {getIcon()}
          <span className="ml-3 font-medium">{message}</span>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}