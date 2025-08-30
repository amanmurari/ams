import React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CursorProvider from "@/components/cursor-provider"
import GlobalStyles from "@/components/global-styles"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aman Murari Singh - Portfolio",
  description: "Personal portfolio website of Aman Murari Singh, AI Engineer and Web Developer",
    
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={inter.className}>
        <GlobalStyles />
        <CursorProvider />
        {children}
      </body>
    </html>
  )
}
