import { WORD_BANKS } from '../data/wordBanks'
import type { RewriteCategory } from '../data/types'

interface WordBankPanelProps {
  category: RewriteCategory
}

export function WordBankPanel({ category }: WordBankPanelProps) {
  const words = WORD_BANKS[category]

  return (
    <section className="word-bank" aria-label="Starter word bank">
      <h2 className="word-bank__title">Try starting with…</h2>
      <ul className="word-bank__list">
        {words.map((word) => (
          <li key={word} className="word-bank__chip">
            {word}
          </li>
        ))}
      </ul>
    </section>
  )
}
