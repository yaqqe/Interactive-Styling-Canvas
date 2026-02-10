"use client"

import { useEffect, useRef, useCallback } from "react"

interface ShirtData {
  src: string
  alt: string
  className: string
  dataSrc: string
  shirtName: string
  modelSize: string
}

const shirts: ShirtData[] = [
  {
    src: "/assets/1Product.png",
    alt: "Product 1",
    className: "shirt top-left",
    dataSrc: "/assets/1Model.png",
    shirtName: "Ratphex-T",
    modelSize: "L",
  },
  {
    src: "/assets/3Product.png",
    alt: "Product 3",
    className: "shirt bottom-left",
    dataSrc: "/assets/3Model.png",
    shirtName: "AnimalCollective-T",
    modelSize: "S",
  },
  {
    src: "/assets/2Product.png",
    alt: "Product 2",
    className: "shirt middle-right",
    dataSrc: "/assets/2Model.png",
    shirtName: "RatwardScissor-T",
    modelSize: "XL",
  },
]

const HOVER_IMAGES = [
  "/assets/1ModelHover.png",
  "/assets/2ModelHover.png",
  "/assets/3ModelHover.png",
]

function preloadImages(paths: string[]): Promise<void> {
  return new Promise((resolve) => {
    if (paths.length === 0) {
      resolve()
      return
    }
    let loaded = 0
    paths.forEach((path) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        loaded++
        if (loaded === paths.length) resolve()
      }
      img.onerror = () => {
        loaded++
        if (loaded === paths.length) resolve()
      }
      img.src = path
    })
  })
}

export default function InteractiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerImageRef = useRef<HTMLImageElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const shirtRefs = useRef<(HTMLImageElement | null)[]>([])
  const bodyRef = useRef<HTMLElement | null>(null)

  // State refs for drag logic
  const activeShirtRef = useRef<HTMLImageElement | null>(null)
  const initialShirtPosRef = useRef({ left: "", top: "" })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const lastPosRef = useRef({ x: 0, y: 0 })
  const isMovingRef = useRef(false)
  const moveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const originalCenterImageSrcRef = useRef("")
  const isHoveringCenterImageRef = useRef(false)

  const updateTooltip = useCallback(() => {
    if (!tooltipRef.current) return
    const tooltipText = `Model is 5ft 4" and wears size S`
    tooltipRef.current.setAttribute("data-tooltip", tooltipText)
  }, [])

  useEffect(() => {
    bodyRef.current = document.body

    // Collect all image paths for preloading
    const imagePaths = new Set<string>()
    shirts.forEach((shirt) => {
      imagePaths.add(shirt.src)
      imagePaths.add(shirt.dataSrc)
    })
    HOVER_IMAGES.forEach((path) => imagePaths.add(path))
    imagePaths.add("/assets/1Model.png")

    // Add loading class and preload
    document.body.classList.add("loading")
    preloadImages([...imagePaths]).then(() => {
      document.body.classList.remove("loading")
    })

    updateTooltip()

    // Resize handler
    const handleResize = () => {
      shirtRefs.current.forEach((shirt) => {
        if (shirt) {
          shirt.style.left = ""
          shirt.style.top = ""
        }
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [updateTooltip])

  // Tooltip click handler
  useEffect(() => {
    const tooltip = tooltipRef.current
    if (!tooltip) return

    const handleTooltipClick = (e: MouseEvent) => {
      e.stopPropagation()
      tooltip.classList.toggle("tooltip-visible")
    }

    const handleDocumentClick = (e: MouseEvent) => {
      if (
        tooltip.classList.contains("tooltip-visible") &&
        !tooltip.contains(e.target as Node)
      ) {
        tooltip.classList.remove("tooltip-visible")
      }
    }

    tooltip.addEventListener("click", handleTooltipClick)
    document.addEventListener("click", handleDocumentClick)

    return () => {
      tooltip.removeEventListener("click", handleTooltipClick)
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    const activeShirt = activeShirtRef.current
    const centerImage = centerImageRef.current
    if (!activeShirt || !centerImage) return
    e.preventDefault()

    let clientX: number, clientY: number
    if ("touches" in e) {
      const touch = e.touches[0]
      clientX = touch.clientX
      clientY = touch.clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const deltaX = clientX - lastPosRef.current.x
    const deltaY = clientY - lastPosRef.current.y
    currentPosRef.current.x += deltaX
    currentPosRef.current.y += deltaY
    activeShirt.style.left = `${currentPosRef.current.x}px`
    activeShirt.style.top = `${currentPosRef.current.y}px`

    // Collision detection
    const shirtRect = activeShirt.getBoundingClientRect()
    const centerImageRect = centerImage.getBoundingClientRect()
    const collision = !(
      shirtRect.right < centerImageRect.left ||
      shirtRect.left > centerImageRect.right ||
      shirtRect.bottom < centerImageRect.top ||
      shirtRect.top > centerImageRect.bottom
    )

    if (collision) {
      const currentSrc = centerImage.src
      const isAlreadyHovering = currentSrc.includes("ModelHover.png")

      if (!isAlreadyHovering && originalCenterImageSrcRef.current) {
        const baseSrc = originalCenterImageSrcRef.current
        if (baseSrc.includes("Model.png") && !baseSrc.includes("ModelHover.png")) {
          const hoverSrc = baseSrc.replace("Model.png", "ModelHover.png")
          const hoverPath = new URL(hoverSrc, window.location.href).pathname
          const validPaths = HOVER_IMAGES
          if (validPaths.some((p) => hoverPath.endsWith(p.replace(/^\//, "")) || hoverPath === p)) {
            centerImage.src = hoverSrc
            isHoveringCenterImageRef.current = true
          }
        }
      }
    } else {
      if (isHoveringCenterImageRef.current && originalCenterImageSrcRef.current) {
        centerImage.src = originalCenterImageSrcRef.current
        isHoveringCenterImageRef.current = false
      }
    }

    // Visual feedback for dragging
    const isMovingNow = Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2
    if (isMovingNow && !isMovingRef.current) {
      activeShirt.classList.remove("grabbed")
      activeShirt.classList.add(deltaX > 0 ? "dragging-right" : "dragging-left")
      isMovingRef.current = true
    } else if (isMovingRef.current && deltaX !== 0) {
      activeShirt.classList.remove("dragging-right", "dragging-left")
      activeShirt.classList.add(deltaX > 0 ? "dragging-right" : "dragging-left")
    }

    lastPosRef.current = { x: clientX, y: clientY }

    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
    moveTimeoutRef.current = setTimeout(() => {
      if (isMovingRef.current && activeShirtRef.current) {
        activeShirtRef.current.classList.remove("dragging-right", "dragging-left")
        activeShirtRef.current.classList.add("grabbed")
        isMovingRef.current = false
      }
    }, 50)
  }, [])

  const handleEnd = useCallback(() => {
    const activeShirt = activeShirtRef.current
    const centerImage = centerImageRef.current
    if (!activeShirt || !centerImage) return

    const shirtRect = activeShirt.getBoundingClientRect()
    const centerImageRect = centerImage.getBoundingClientRect()
    const shirtCenterX = shirtRect.left + shirtRect.width / 2
    const shirtCenterY = shirtRect.top + shirtRect.height / 2

    const collision =
      shirtCenterX >= centerImageRect.left &&
      shirtCenterX <= centerImageRect.right &&
      shirtCenterY >= centerImageRect.top &&
      shirtCenterY <= centerImageRect.bottom

    if (collision) {
      const newImageSrc = activeShirt.getAttribute("data-mouse-src")
      if (newImageSrc) {
        centerImage.src = newImageSrc
        originalCenterImageSrcRef.current = newImageSrc
        updateTooltip()
      }
    } else {
      if (isHoveringCenterImageRef.current && originalCenterImageSrcRef.current) {
        centerImage.src = originalCenterImageSrcRef.current
      }
    }

    // Reset shirt position
    activeShirt.style.left = initialShirtPosRef.current.left
    activeShirt.style.top = initialShirtPosRef.current.top
    currentPosRef.current.x = parseInt(initialShirtPosRef.current.left) || 0
    currentPosRef.current.y = parseInt(initialShirtPosRef.current.top) || 0

    // Cleanup
    activeShirt.style.cursor = "grab"
    activeShirt.style.zIndex = ""
    activeShirt.classList.remove("dragging-right", "dragging-left", "grabbed")

    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)

    document.removeEventListener("mousemove", handleMove)
    document.removeEventListener("mouseup", handleEnd)
    document.removeEventListener("touchmove", handleMove)
    document.removeEventListener("touchend", handleEnd)
    document.removeEventListener("touchcancel", handleEnd)

    isHoveringCenterImageRef.current = false
    activeShirtRef.current = null
  }, [handleMove, updateTooltip])

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, shirtEl: HTMLImageElement) => {
      e.preventDefault()
      activeShirtRef.current = shirtEl
      const centerImage = centerImageRef.current

      // Capture the base version of centerImage.src
      if (centerImage && centerImage.src) {
        let currentSrc = centerImage.src
        if (currentSrc.includes("ModelHover.png")) {
          originalCenterImageSrcRef.current = currentSrc.replace(
            "ModelHover.png",
            "Model.png"
          )
        } else {
          originalCenterImageSrcRef.current = currentSrc
        }
      }

      isHoveringCenterImageRef.current = false

      // Store initial position
      const computedStyle = window.getComputedStyle(shirtEl)
      initialShirtPosRef.current = {
        left: computedStyle.left || "0px",
        top: computedStyle.top || "0px",
      }
      currentPosRef.current = {
        x: parseInt(computedStyle.left) || 0,
        y: parseInt(computedStyle.top) || 0,
      }

      if ("touches" in e.nativeEvent) {
        const touch = (e.nativeEvent as TouchEvent).touches[0]
        lastPosRef.current = { x: touch.clientX, y: touch.clientY }
        document.addEventListener("touchmove", handleMove, { passive: false })
        document.addEventListener("touchend", handleEnd)
        document.addEventListener("touchcancel", handleEnd)
      } else {
        const mouseEvent = e.nativeEvent as MouseEvent
        lastPosRef.current = { x: mouseEvent.clientX, y: mouseEvent.clientY }
        document.addEventListener("mousemove", handleMove)
        document.addEventListener("mouseup", handleEnd)
      }

      shirtEl.style.cursor = "grabbing"
      shirtEl.style.zIndex = "1000"
      shirtEl.classList.add("grabbed")
    },
    [handleMove, handleEnd]
  )

  return (
    <main className="canvas-page">
      <header className="frame">
        <h1 className="frame__title">Interactive Styling UI</h1>
        <a
          className="frame__back"
          href="https://tympanus.net/codrops/?p=94987"
        >
          Article
        </a>
        <a
          className="frame__archive"
          href="https://tympanus.net/codrops/demos/"
        >
          All demos
        </a>
        <a
          className="frame__github"
          href="https://github.com/kaberikram/Interactive-Styling-Canvas"
        >
          GitHub
        </a>
        <nav className="frame__tags">
          <a href="https://tympanus.net/codrops/demos/?tag=draggable">
            #draggable
          </a>
        </nav>
      </header>
      <div className="container" ref={containerRef}>
        <div className="shirts-container">
          {/* First shirt - top left */}
          <img
            ref={(el) => { shirtRefs.current[0] = el }}
            src={shirts[0].src}
            alt={shirts[0].alt}
            className={shirts[0].className}
            data-mouse-src={shirts[0].dataSrc}
            data-shirt-name={shirts[0].shirtName}
            data-model-size={shirts[0].modelSize}
            style={{ cursor: "grab" }}
            onMouseDown={(e) => {
              if (shirtRefs.current[0]) handleStart(e, shirtRefs.current[0])
            }}
            onTouchStart={(e) => {
              if (shirtRefs.current[0]) handleStart(e, shirtRefs.current[0])
            }}
            draggable={false}
          />

          {/* Center image */}
          <img
            ref={centerImageRef}
            src="/assets/1Model.png"
            alt="Model wearing Product"
            className="rat-center"
            id="centerImage"
            draggable={false}
          />

          {/* Tooltip */}
          <span
            ref={tooltipRef}
            id="info-tooltip"
            data-tooltip={'Model is 5ft 4" and wears size S'}
          >
            ?
          </span>

          {/* Second shirt - bottom left */}
          <img
            ref={(el) => { shirtRefs.current[1] = el }}
            src={shirts[1].src}
            alt={shirts[1].alt}
            className={shirts[1].className}
            data-mouse-src={shirts[1].dataSrc}
            data-shirt-name={shirts[1].shirtName}
            data-model-size={shirts[1].modelSize}
            style={{ cursor: "grab" }}
            onMouseDown={(e) => {
              if (shirtRefs.current[1]) handleStart(e, shirtRefs.current[1])
            }}
            onTouchStart={(e) => {
              if (shirtRefs.current[1]) handleStart(e, shirtRefs.current[1])
            }}
            draggable={false}
          />

          {/* Third shirt - middle right */}
          <img
            ref={(el) => { shirtRefs.current[2] = el }}
            src={shirts[2].src}
            alt={shirts[2].alt}
            className={shirts[2].className}
            data-mouse-src={shirts[2].dataSrc}
            data-shirt-name={shirts[2].shirtName}
            data-model-size={shirts[2].modelSize}
            style={{ cursor: "grab" }}
            onMouseDown={(e) => {
              if (shirtRefs.current[2]) handleStart(e, shirtRefs.current[2])
            }}
            onTouchStart={(e) => {
              if (shirtRefs.current[2]) handleStart(e, shirtRefs.current[2])
            }}
            draggable={false}
          />
        </div>
      </div>
    </main>
  )
}
