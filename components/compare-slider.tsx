'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type CompareSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel: string
  afterLabel: string
}

export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const draggingRef = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      setFromClientX(e.clientX)
    }
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [setFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 2))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 2))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPosition(100)
    }
  }

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[16/10] w-full touch-none overflow-hidden rounded-lg border border-border bg-muted select-none"
      onPointerDown={(e) => {
        draggingRef.current = true
        setFromClientX(e.clientX)
      }}
    >
      {/* After image (base layer, revealed on the right) */}
      <Image
        src={afterSrc || '/placeholder.svg'}
        alt={afterAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 900px"
        className="object-cover"
        draggable={false}
      />

      {/* Before image (clipped to the left of the handle) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc || '/placeholder.svg'}
          alt={beforeAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium tracking-wide text-background backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-background/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare the site today with the proposed concept"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation()
            draggingRef.current = true
          }}
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
            <path d="m9 6 6 6-6 6" transform="translate(6 0)" />
          </svg>
        </button>
      </div>
    </div>
  )
}
