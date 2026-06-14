export type StarterType =
  | 'it'
  | 'a'
  | 'an'
  | 'he'
  | 'she'
  | 'his'
  | 'her'
  | 'this'
  | 'these'
  | 'those'
  | 'they'
  | 'then'
  | 'there'

export type RewriteCategory =
  | 'where'
  | 'when'
  | 'why'
  | 'verb'
  | 'prepositional'
  | 'emotional'

export interface Sentence {
  id: number
  text: string
  starter: StarterType
}

export const REWRITE_CATEGORIES: {
  id: RewriteCategory
  label: string
  color: string
}[] = [
  { id: 'where', label: 'WHERE', color: '#22c55e' },
  { id: 'when', label: 'WHEN', color: '#3b82f6' },
  { id: 'why', label: 'WHY', color: '#f59e0b' },
  { id: 'verb', label: 'VERB', color: '#ef4444' },
  { id: 'prepositional', label: 'PREP', color: '#06b6d4' },
  { id: 'emotional', label: 'FEELING', color: '#ec4899' },
]

export const STARTER_LABELS: Record<StarterType, string> = {
  it: 'It',
  a: 'A',
  an: 'An',
  he: 'He',
  she: 'She',
  his: 'His',
  her: 'Her',
  this: 'This',
  these: 'These',
  those: 'Those',
  they: 'They',
  then: 'Then',
  there: 'There',
}
