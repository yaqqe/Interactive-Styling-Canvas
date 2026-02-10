import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Interactive Styling Canvas",
  description: "An interactive drag-and-drop styling canvas for exploring product imagery",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
