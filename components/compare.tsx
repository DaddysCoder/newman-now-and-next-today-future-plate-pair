'use client'

import Image from 'next/image'
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'

import type { Hotspot } from '@/content/projects'
import { cn } from '@/lib/utils'

interface CompareProps {
  todaySrc: string
  futureSrc: string
  hotspots?: Hotspot[]
  selectedHotspotId?: string | null
  onHotspotSelect?: (hotspot: Hotspot) => void
  initialPosition?: number
  priority?: boolean
  className?: string
}

type CompareStyle = CSSProperties & { '--pos': string }

function clamp(value: number) {
  return Math.min(100, Math.max(0, value))
}

export function Compare({
  todaySrc,
  futureSrc,
  hotspots = [],
  selectedHotspotId,
  onHotspotSelect,
  initialPosition = 50,
  priority = false,
  className,
}: CompareProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(() => clamp(initialPosition))
  const [isDragging, setIsDragging] = useState(false)
  const roundedPosition = Math.round(position)

  const updateFromPointer = useCallback((clientX: number) => {
    const frame = frameRef.current
    if (!frame) return

    const bounds = frame.getBoundingClientRect()
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100
    setPosition(clamp(nextPosition))
  }, [])

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
    updateFromPointer(event.clientX)
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    updateFromPointer(event.clientX)
  }

  function handlePointerEnd(event: PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 10 : 2

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPosition((current) => clamp(current - step))
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPosition((current) => clamp(current + step))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setPosition(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setPosition(100)
    }
  }

  const style: CompareStyle = { '--pos': `${position}%` }

  return (
    <div
      ref={frameRef}
      style={style}
      className={cn(
        'relative isolate min-h-80 w-full self-stretch overflow-hidden bg-muted select-none',
        className,
      )}
    >
      <Image
        src={futureSrc}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        draggable={false}
        className="pointer-events-none object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: 'inset(0 0 0 var(--pos))' }}
      >
        <p className="absolute top-5 right-5 rounded-sm border border-paper/40 bg-glass px-3 py-2 text-xs font-semibold tracking-[0.14em] text-paper uppercase backdrop-blur-md md:top-6 md:right-6">
          Indicative visualisation
        </p>
      </div>

      {hotspots.length > 0 ? (
        <div
          className="absolute inset-0"
          style={{ clipPath: 'inset(0 0 0 var(--pos))' }}
        >
          {hotspots.map((hotspot, index) => {
            const isSelected = hotspot.id === selectedHotspotId

            return (
              <button
                key={hotspot.id}
                type="button"
                aria-label={`${index + 1}. ${hotspot.title}`}
                aria-pressed={isSelected}
                onClick={() => onHotspotSelect?.(hotspot)}
                className={cn(
                  'absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper bg-glass text-sm font-bold text-paper shadow-lg backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper',
                  isSelected && 'scale-110 bg-ember text-ink',
                )}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}
      >
        <Image
          src={todaySrc}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          draggable={false}
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px bg-paper shadow-lg"
        style={{ left: 'var(--pos)' }}
      />

      <button
        type="button"
        role="slider"
        tabIndex={0}
        aria-label="Compare today with the future proposal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedPosition}
        aria-valuetext={`${roundedPosition}% today visible, ${100 - roundedPosition}% future visible`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={() => setIsDragging(false)}
        className={cn(
          'absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 touch-none cursor-ew-resize items-center justify-center rounded-full border border-paper bg-glass text-paper shadow-lg backdrop-blur-md outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ember-lit focus-visible:ring-offset-4 focus-visible:ring-offset-transparent',
          isDragging && 'scale-95',
        )}
        style={{ left: 'var(--pos)' }}
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <span className="block size-2 rotate-45 border-b border-l border-current" />
          <span className="block h-4 w-px bg-current/60" />
          <span className="block size-2 rotate-45 border-t border-r border-current" />
        </span>
      </button>
    </div>
  )
}
