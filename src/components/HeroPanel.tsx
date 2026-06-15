import { CHALLENGES, type Challenge } from '../data/challenges'
import { PROBLEM_WORDS } from '../data/problemWords'

export type HeroMode = 'challenge' | 'problem'

interface HeroPanelProps {
  mode: HeroMode
  onModeChange: (mode: HeroMode) => void
  challenge: Challenge
  onShuffle: () => void
}

const TIER_LABELS = {
  easy: 'Good for everyone',
  medium: 'Level up',
  hard: 'Hero challenge',
} as const

export function HeroPanel({ mode, onModeChange, challenge, onShuffle }: HeroPanelProps) {
  return (
    <div className="hero-panel" aria-live="polite">
      <div className="hero-panel__glow" aria-hidden="true" />
      <div className="hero-panel__inner">
        <div className="hero-panel__toggle" role="tablist" aria-label="Header focus">
          <button
            type="button"
            role="tab"
            className={mode === 'challenge' ? 'hero-panel__tab hero-panel__tab--active' : 'hero-panel__tab'}
            aria-selected={mode === 'challenge'}
            onClick={() => onModeChange('challenge')}
          >
            Challenge
          </button>
          <button
            type="button"
            role="tab"
            className={mode === 'problem' ? 'hero-panel__tab hero-panel__tab--active' : 'hero-panel__tab'}
            aria-selected={mode === 'problem'}
            onClick={() => onModeChange('problem')}
          >
            The Problem
          </button>
        </div>

        {mode === 'challenge' ? (
          <div role="tabpanel" className="hero-panel__panel">
            <div className="hero-panel__top">
              <span className="hero-panel__star" aria-hidden="true">
                ★
              </span>
              <span className="hero-panel__eyebrow">
                Your challenge · {challenge.id}/{CHALLENGES.length}
              </span>
              <span className={`hero-panel__tier hero-panel__tier--${challenge.tier}`}>
                {TIER_LABELS[challenge.tier]}
              </span>
            </div>
            <p className="hero-panel__badge">{challenge.badge}</p>
            <p className="hero-panel__text">{challenge.text}</p>
            <button type="button" className="hero-panel__shuffle" onClick={onShuffle}>
              Different challenge →
            </button>
          </div>
        ) : (
          <div role="tabpanel" className="hero-panel__panel hero-panel__panel--problem">
            <p className="hero-panel__problem-title">Too often used words</p>
            <p className="hero-panel__problem-hint">
              Weak openers make boring sentences. Spot them in red, then spin the wheel to
              rewrite!
            </p>
            <ul className="hero-panel__problem-words" aria-label="Overused sentence starters">
              {PROBLEM_WORDS.map((word) => (
                <li key={word} className="hero-panel__problem-word">
                  {word}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
