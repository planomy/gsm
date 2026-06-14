# The Great Sentence Machine

Classroom display app for rewriting simple narrative sentences. Spin a wheel to pick a rewrite style (where, when, why, verb, prepositional, emotional), see starter word banks, and type live rewrites for the class.

**Live site:** [planomy.github.io/gsm](https://planomy.github.io/gsm)

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Built site lives in `/docs` on `main`.

```bash
npm run build
rm -rf docs && cp -r dist docs && touch docs/.nojekyll
git add docs && git commit -m "Rebuild docs" && git push
```

In repo **Settings → Pages**, set source to branch `main`, folder `/docs`.

## Stack

- React + TypeScript + Vite
- Fredoka display font
- Monsterz purple theme
- 312 narrative starter sentences
