'use client'

import dynamic from 'next/dynamic'

// Dynamically import the cursor component with no SSR
const CustomCursor = dynamic(() => import('./custom-cursor'), {
  ssr: false
})

export default function CursorProvider() {
  return <CustomCursor />
}
