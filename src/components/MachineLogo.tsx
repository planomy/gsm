import gsmLogo from '../assets/gsm-logo.png'

interface MachineLogoProps {
  busy?: boolean
}

function Gear({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06Z"
      />
    </svg>
  )
}

export function MachineLogo({ busy = false }: MachineLogoProps) {
  return (
    <div className={`machine-logo${busy ? ' machine-logo--busy' : ''}`}>
      <img
        src={gsmLogo}
        alt="The Great Sentence Machine"
        className="machine-logo__img"
        width={866}
        height={628}
        draggable={false}
      />
      <div className="machine-logo__fx" aria-hidden="true">
        <span className="machine-logo__gauge-needle" />

        <Gear className="machine-logo__gear machine-logo__gear--lg" />
        <Gear className="machine-logo__gear machine-logo__gear--md" />
        <Gear className="machine-logo__gear machine-logo__gear--sm" />
      </div>
    </div>
  )
}
