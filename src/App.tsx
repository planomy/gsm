import { useCallback, useState } from 'react'
import gsmLogo from './assets/gsm-logo.png'
import { ChallengeStrip } from './components/ChallengeStrip'
import { RewriteInput } from './components/RewriteInput'
import { SentenceDisplay } from './components/SentenceDisplay'
import { SpinWheel } from './components/SpinWheel'
import { WordBankPanel } from './components/WordBankPanel'
import { randomChallenge } from './data/challenges'
import { randomSentence } from './data/sentences'
import type { RewriteCategory, Sentence } from './data/types'
import './App.css'

function App() {
  const [sentence, setSentence] = useState<Sentence>(() => randomSentence())
  const [category, setCategory] = useState<RewriteCategory | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [draft, setDraft] = useState('')
  const [challenge, setChallenge] = useState(() => randomChallenge())

  const shuffleChallenge = useCallback(() => {
    setChallenge((current) => randomChallenge(current.id))
  }, [])

  const pickSentence = useCallback(() => {
    let next = randomSentence()
    while (next.id === sentence.id && next.text === sentence.text) {
      next = randomSentence()
    }
    setSentence(next)
    setCategory(null)
    setDraft('')
    setChallenge((current) => randomChallenge(current.id))
  }, [sentence.id, sentence.text])

  const handleSpinComplete = useCallback((picked: RewriteCategory) => {
    setCategory(picked)
    setSpinning(false)
  }, [])

  return (
    <div className="gsm">
      <header className="gsm__header">
        <img
          src={gsmLogo}
          alt="The Great Sentence Machine"
          className="gsm__logo"
          width={220}
          height={220}
        />
        <ChallengeStrip challenge={challenge} onShuffle={shuffleChallenge} />
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
