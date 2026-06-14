import type { RewriteCategory } from '../data/types'

interface RewriteInputProps {
  value: string
  onChange: (value: string) => void
  category: RewriteCategory | null
}

export function RewriteInput({ value, onChange, category }: RewriteInputProps) {
  return (
    <section className="rewrite-input" aria-label="Rewrite display">
      <label className="rewrite-input__label" htmlFor="rewrite-field">
        {category ? 'Live rewrite (display)' : 'Your rewrite will appear here'}
      </label>
      <textarea
        id="rewrite-field"
        className="rewrite-input__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type the new sentence for the class to see…"
        rows={4}
        spellCheck
      />
    </section>
  )
}
