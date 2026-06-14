import type { Sentence } from '../data/types'
import { STARTER_LABELS } from '../data/types'

interface SentenceDisplayProps {
  sentence: Sentence
  onNewSentence: () => void
}

export function SentenceDisplay({ sentence, onNewSentence }: SentenceDisplayProps) {
  return (
    <section className="sentence-display" aria-label="Starter sentence">
      <div className="sentence-display__meta">
        <span className="sentence-display__badge">{STARTER_LABELS[sentence.starter]} starter</span>
        <button type="button" className="sentence-display__new" onClick={onNewSentence}>
          New sentence
        </button>
      </div>
      <p className="sentence-display__text">{sentence.text}</p>
    </section>
  )
}
