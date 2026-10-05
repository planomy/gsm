import { useEffect, useState, type CSSProperties } from 'react'
import gsmLogo from '../assets/gsm-logo.png'

interface MachineLogoProps {
  busy?: boolean
}

/** Centres and diameters on the 866×628 logo. */
const GEARS = [
  { x: 512, y: 536, d: 104, dur: '7.5s' },
  { x: 603, y: 544, d: 80, dur: '5.6s', rev: true },
  { x: 650, y: 507, d: 44, dur: '3.6s' },
] as const

const WORD_CUT = { x: 50, y: 0, w: 214, h: 111 }

const NEEDLE = { x: 607, y: 121, d: 64 }

function discStyle(
  part: { x: number; y: number; d: number },
  extra?: Record<string, string>,
): CSSProperties {
  return {
    '--x': String(part.x),
    '--y': String(part.y),
    '--d': String(part.d),
    ...extra,
  } as CSSProperties
}

/** Base painting with the hopper words removed, so the floating copy is the only one. */
function usePunchedLogo() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      ctx.clearRect(WORD_CUT.x, WORD_CUT.y, WORD_CUT.w, WORD_CUT.h)
      setSrc(canvas.toDataURL('image/png'))
    }
    img.src = gsmLogo
  }, [])

  return src
}

export function MachineLogo({ busy = false }: MachineLogoProps) {
  const punched = usePunchedLogo()

  return (
    <div className={`machine-logo${busy ? ' machine-logo--busy' : ''}`}>
      <img
        src={punched ?? gsmLogo}
        alt="The Great Sentence Machine"
        className="machine-logo__img"
        width={866}
        height={628}
        draggable={false}
      />
      <div className="machine-logo__fx" aria-hidden="true">
        {punched && (
          <div
            className="machine-logo__words"
            style={
              {
                '--wx': String(WORD_CUT.x),
                '--wy': String(WORD_CUT.y),
                '--ww': String(WORD_CUT.w),
                '--wh': String(WORD_CUT.h),
              } as CSSProperties
            }
          >
            <img src={gsmLogo} alt="" draggable={false} />
          </div>
        )}

        <div className="machine-logo__needle" style={discStyle(NEEDLE)}>
          <img src={gsmLogo} alt="" draggable={false} />
        </div>

        {GEARS.map((gear) => (
          <div
            key={`${gear.x}-${gear.y}`}
            className={`machine-logo__gear${'rev' in gear && gear.rev ? ' machine-logo__gear--rev' : ''}`}
            style={discStyle(gear, { '--dur': gear.dur })}
          >
            <img src={gsmLogo} alt="" draggable={false} />
          </div>
        ))}

        <span className="machine-logo__bulb" />
      </div>
    </div>
  )
}
