import { useEffect, useRef, useState } from 'react'
import { REWRITE_CATEGORIES, type RewriteCategory } from '../data/types'

interface SpinWheelProps {
  spinning: boolean
  selected: RewriteCategory | null
  onSpinStart: () => void
  onSpinComplete: (category: RewriteCategory) => void
}

const SPIN_MS = 3200
const SLICE = 360 / REWRITE_CATEGORIES.length

export function SpinWheel({ spinning, selected, onSpinStart, onSpinComplete }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const spin = () => {
    if (spinning) return
    onSpinStart()

    const index = Math.floor(Math.random() * REWRITE_CATEGORIES.length)
    const picked = REWRITE_CATEGORIES[index].id
    const extraTurns = 4 + Math.floor(Math.random() * 3)
    const target = extraTurns * 360 + (360 - index * SLICE - SLICE / 2)

    setRotation((prev) => prev + target)

    timerRef.current = window.setTimeout(() => {
      onSpinComplete(picked)
    }, SPIN_MS)
  }

  const activeLabel = selected
    ? REWRITE_CATEGORIES.find((c) => c.id === selected)?.label
    : null

  return (
    <div className="spin-wheel">
      <div className="spin-wheel__pointer" aria-hidden="true" />
      <div
        className="spin-wheel__disc"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.85, 0.2, 1)` : undefined,
        }}
      />
      <div
        className="spin-wheel__labels"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.85, 0.2, 1)` : undefined,
        }}
        aria-hidden="true"
      >
        {REWRITE_CATEGORIES.map((cat, i) => {
          const angle = i * SLICE + SLICE / 2 - 90
          const rad = (angle * Math.PI) / 180
          const r = 38
          const x = 50 + Math.cos(rad) * r
          const y = 50 + Math.sin(rad) * r
          return (
            <span
              key={cat.id}
              className="spin-wheel__label"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              }}
            >
              {cat.label}
            </span>
          )
        })}
      </div>
      <button
        type="button"
        className="spin-wheel__button"
        onClick={spin}
        disabled={spinning}
        aria-label="Spin the rewrite wheel"
      >
        {spinning ? '…' : 'SPIN!'}
      </button>
      {activeLabel && !spinning && (
        <p className="spin-wheel__result" aria-live="polite">
          {activeLabel}
        </p>
      )}
    </div>
  )
}
