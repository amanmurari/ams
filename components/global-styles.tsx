'use client'

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      body {
        min-height: 100vh;
        position: relative;
      }
    `}</style>
  )
}
