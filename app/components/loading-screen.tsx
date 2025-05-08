"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-64 h-64 relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-r-4 border-l-4 border-yellow-400 animate-spin-slow"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">{Math.round(progress)}%</div>
        </div>
      </div>
      <h1 className="text-white text-2xl font-bold mb-4">FIFA WORLD CUP 2022</h1>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-gray-400 mt-4">Loading 3D Experience...</p>
    </div>
  )
}
