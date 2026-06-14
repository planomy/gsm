export type ChallengeTier = 'easy' | 'medium' | 'hard'

export interface Challenge {
  id: number
  badge: string
  text: string
  tier: ChallengeTier
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    badge: 'Start strong',
    text: 'Use one of the words from the word bank as your first two words.',
    tier: 'easy',
  },
  {
    id: 2,
    badge: 'Say more',
    text: 'Make your rewrite at least 3 words longer than the starter sentence.',
    tier: 'easy',
  },
  {
    id: 3,
    badge: 'Paint a picture',
    text: 'Add one detail about what you can see, hear, or feel.',
    tier: 'easy',
  },
  {
    id: 4,
    badge: 'Swap the boring bit',
    text: 'Find the dullest word in the starter sentence and replace it with something stronger.',
    tier: 'medium',
  },
  {
    id: 5,
    badge: 'Two ideas in one',
    text: 'Your sentence should have two parts — use a comma or “and” to join them.',
    tier: 'medium',
  },
  {
    id: 6,
    badge: 'Why or when bonus',
    text: 'If your wheel says WHY or WHEN, make sure your reader knows the reason or the time clearly.',
    tier: 'medium',
  },
  {
    id: 7,
    badge: 'Action upgrade',
    text: 'Include a doing word (-ing or past tense) that shows something happening.',
    tier: 'medium',
  },
  {
    id: 8,
    badge: 'Same story, new voice',
    text: 'Keep the same meaning as the starter, but make it sound like you talking to a friend.',
    tier: 'hard',
  },
  {
    id: 9,
    badge: 'Question hook',
    text: 'Turn your rewrite into a question, or start with a question then answer it in the same sentence.',
    tier: 'hard',
  },
  {
    id: 10,
    badge: 'Stretch sentence',
    text: 'Use 15 words or more and try to fit in two words from the word bank.',
    tier: 'hard',
  },
]

export function randomChallenge(excludeId?: number): Challenge {
  const pool = excludeId ? CHALLENGES.filter((c) => c.id !== excludeId) : CHALLENGES
  return pool[Math.floor(Math.random() * pool.length)]
}
