import { WORD_BANKS } from '../data/wordBanks'
import { REWRITE_CATEGORIES, type RewriteCategory } from '../data/types'

interface WordBankPanelProps {
  category: RewriteCategory
}

export function WordBankPanel({ category }: WordBankPanelProps) {
  const words = WORD_BANKS[category]
  const categoryLabel =
    REWRITE_CATEGORIES.find((c) => c.id === category)?.label ?? category.toUpperCase()

  return (
    <section className="word-bank" aria-label={`${categoryLabel} starter word bank`}>
      <h2 className="word-bank__title">{categoryLabel} — try starting with…</h2>
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
