import { useCallback, useMemo, useState } from 'react'
import { RewriteInput } from './components/RewriteInput'
import { SentenceDisplay } from './components/SentenceDisplay'
import { SpinWheel } from './components/SpinWheel'
import { WordBankPanel } from './components/WordBankPanel'
import { randomSentence } from './data/sentences'
import type { RewriteCategory, Sentence } from './data/types'
import './App.css'

function App() {
  const [sentence, setSentence] = useState<Sentence>(() => randomSentence())
  const [category, setCategory] = useState<RewriteCategory | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [draft, setDraft] = useState('')

  const pickSentence = useCallback(() => {
    let next = randomSentence()
    while (next.id === sentence.id && next.text === sentence.text) {
      next = randomSentence()
    }
    setSentence(next)
    setCategory(null)
    setDraft('')
  }, [sentence.id, sentence.text])

  const handleSpinComplete = useCallback((picked: RewriteCategory) => {
    setCategory(picked)
    setSpinning(false)
  }, [])

  const subtitle = useMemo(() => {
    if (!category) return 'Spin the wheel to pick a rewrite style'
    return `Rewrite using a ${category.toUpperCase()} starter`
  }, [category])

  return (
    <div className="gsm">
      <header className="gsm__header">
        <h1 className="gsm__title">The Great Sentence Machine</h1>
        <p className="gsm__subtitle">{subtitle}</p>
      </header>

      <main className="gsm__main">
        <SentenceDisplay sentence={sentence} onNewSentence={pickSentence} />

        <section className="gsm__wheel-section" aria-label="Rewrite category wheel">
          <SpinWheel
            spinning={spinning}
            selected={category}
            onSpinStart={() => {
              setSpinning(true)
              setCategory(null)
            }}
            onSpinComplete={handleSpinComplete}
          />
        </section>

        {category && <WordBankPanel category={category} />}

        <RewriteInput value={draft} onChange={setDraft} category={category} />
      </main>
    </div>
  )
}

export default App
