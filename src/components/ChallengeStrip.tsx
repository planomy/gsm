import { CHALLENGES, type Challenge } from '../data/challenges'

interface ChallengeStripProps {
  challenge: Challenge
  onShuffle: () => void
}

const TIER_LABELS = {
  easy: 'Good for everyone',
  medium: 'Level up',
  hard: 'Hero challenge',
} as const

export function ChallengeStrip({ challenge, onShuffle }: ChallengeStripProps) {
  return (
    <div className="challenge-strip" aria-live="polite">
      <div className="challenge-strip__glow" aria-hidden="true" />
      <div className="challenge-strip__inner">
        <div className="challenge-strip__top">
          <span className="challenge-strip__star" aria-hidden="true">
            ★
          </span>
          <span className="challenge-strip__eyebrow">
            Your challenge · {challenge.id}/{CHALLENGES.length}
          </span>
          <span className={`challenge-strip__tier challenge-strip__tier--${challenge.tier}`}>
            {TIER_LABELS[challenge.tier]}
          </span>
        </div>
        <p className="challenge-strip__badge">{challenge.badge}</p>
        <p className="challenge-strip__text">{challenge.text}</p>
        <button type="button" className="challenge-strip__shuffle" onClick={onShuffle}>
          Different challenge →
        </button>
      </div>
    </div>
  )
}
