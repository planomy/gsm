import type { Sentence } from '../data/types'
import { STARTER_LABELS } from '../data/types'

interface SentenceDisplayProps {
  sentence: Sentence
  onNewSentence: () => void
  highlightStarter?: boolean
}

function renderSentenceText(text: string, starterLabel: string, highlightStarter: boolean) {
  if (!highlightStarter) return text

  const matchLen = starterLabel.length
  if (text.slice(0, matchLen).toLowerCase() !== starterLabel.toLowerCase()) {
    return text
  }

  return (
    <>
      <span className="sentence-display__problem-word">{text.slice(0, matchLen)}</span>
      {text.slice(matchLen)}
    </>
  )
}

export function SentenceDisplay({
  sentence,
  onNewSentence,
  highlightStarter = false,
}: SentenceDisplayProps) {
  const starterLabel = STARTER_LABELS[sentence.starter]

  return (
    <section className="sentence-display" aria-label="Starter sentence">
      <div className="sentence-display__meta">
        <span
          className={
            highlightStarter
              ? 'sentence-display__badge sentence-display__badge--problem'
              : 'sentence-display__badge'
          }
        >
          {starterLabel} starter
        </span>
        <button type="button" className="sentence-display__new" onClick={onNewSentence}>
          New sentence
        </button>
      </div>
      <p className="sentence-display__text">
        {renderSentenceText(sentence.text, starterLabel, highlightStarter)}
      </p>
    </section>
  )
}
