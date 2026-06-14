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
  const rotationRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const spin = () => {
    if (spinning) return

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    onSpinStart()

    const index = Math.floor(Math.random() * REWRITE_CATEGORIES.length)
    const picked = REWRITE_CATEGORIES[index].id
    const sliceCenter = index * SLICE + SLICE / 2
    const desiredMod = (360 - sliceCenter + 360) % 360
    const prev = rotationRef.current
    const currentMod = ((prev % 360) + 360) % 360
    let delta = desiredMod - currentMod
    if (delta <= 0) delta += 360
    const extraTurns = 4 + Math.floor(Math.random() * 3)
    const nextRotation = prev + extraTurns * 360 + delta

    rotationRef.current = nextRotation
    setRotation(nextRotation)

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      onSpinComplete(picked)
    }, SPIN_MS)
  }

  const activeLabel = selected
    ? REWRITE_CATEGORIES.find((c) => c.id === selected)?.label
    : null

  const showWin = !spinning && selected !== null
  const rotatorStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.85, 0.2, 1)` : undefined,
  }

  return (
    <div className="spin-wheel">
      <div className="spin-wheel__pointer" aria-hidden="true" />
      <div className="spin-wheel__rotator" style={rotatorStyle}>
        <div className="spin-wheel__disc">
          {REWRITE_CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={`spin-wheel__slice${showWin && selected === cat.id ? ' spin-wheel__slice--pop' : ''}`}
              style={{
                ['--slice-start' as string]: `${i * SLICE}deg`,
                ['--slice-color' as string]: cat.color,
              }}
            />
          ))}
        </div>
        <div className="spin-wheel__labels" aria-hidden="true">
          {REWRITE_CATEGORIES.map((cat, i) => {
            const sliceCenter = i * SLICE + SLICE / 2
            const rad = ((sliceCenter - 90) * Math.PI) / 180
            const r = 32
            const x = 50 + Math.cos(rad) * r
            const y = 50 + Math.sin(rad) * r
            return (
              <span
                key={cat.id}
                className={`spin-wheel__label${showWin && selected === cat.id ? ' spin-wheel__label--pop' : ''}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  ['--label-rotate' as string]: `${sliceCenter}deg`,
                  transform: `translate(-50%, -50%) rotate(${sliceCenter}deg)`,
                }}
              >
                {cat.label}
              </span>
            )
          })}
        </div>
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
