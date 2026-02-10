"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          kabeer andrabi.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#story" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Story
          </a>
          <Link href="/canvas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Canvas
          </Link>
          <a
            href="https://www.linkedin.com/in/kabeerandrabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-foreground transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col px-6 py-4 gap-4">
              <a href="#work" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Work
              </a>
              <a href="#story" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Story
              </a>
              <Link href="/canvas" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Canvas
              </Link>
              <a
                href="https://www.linkedin.com/in/kabeerandrabi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
