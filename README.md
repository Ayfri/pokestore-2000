# ★★★ POKÉSTORE 2000 ★★★

<p align="center">
  <img src="src/assets/pokestore.webp" alt="Pokéstore Logo" width="400">
</p>

## WELCOME TRAINERS!!! ^_^

THIS IS THE **OFFICIAL** REPOSITORY FOR POKÉSTORE 2000 - THE #1 POKÉMON CARD SHOP ON THE INTERNET!!!

### ~~~~~ FEATURES: ~~~~~

- [X] AWESOME animated GIFs!!! (REAL ones from GeoCities)
- [X] Shop for RARE Pokémon cards from Base Set, Jungle, Fossil AND Team Rocket!!!
- [X] Boosters, theme decks, Game Boy games and GOODIES!!!
- [X] Sign our GUESTBOOK!!!
- [X] Working SHOPPING CART system (it even REMEMBERS your cards)!!!
- [X] MIDI MUSIC with a REAL media player!!!
- [X] Who's That Pokémon game, Which Pokémon Are You quiz, Secrets & Rumors!!!
- [X] FREE downloads (on 56k)!!!
- [X] Hit counter, webring, 88x31 buttons and a 1,000,000th visitor prize!!!
- [X] Secret code... (up up down down...)
- [X] NO FRAMES or JAVA REQUIRED!!!

### ~~~~~ SYSTEM REQUIREMENTS: ~~~~~

- 486 DX2/66 or PENTIUM processor
- 16 MB RAM (32 MB RECOMMENDED)
- 800x600 screen resolution (1024x768 RECOMMENDED)
- Bun 1.4.4+

### ~~~~~ INSTALLATION: ~~~~~

```
bun install
```

### ~~~~~ RUN THE SERVER: ~~~~~

```
bun dev
```

### ~~~~~ MAKE A PRODUCTION BUILD: ~~~~~

```
bun run build
```

The site is static Astro pages with Svelte islands for the stateful widgets (cart, guestbook, poll, games, MIDI player, hit counter), and one
bundled script for the site-wide gimmicks (cursor sparkles, falling Poké Balls, clock, popup, Konami code). Card scans are downloaded at
build time and product photos (`src/assets/products`, from Bulbapedia) are local, both re-encoded to AVIF, and fonts are self-hosted through Astro's Fonts API.
`wrangler.toml` serves `dist/` as Cloudflare Workers static assets, with cache rules in `public/_headers`.

### ~~~~~ GIF SCRIPTS: ~~~~~

```
bun sprites                      # download every Pokémon of src/data.ts missing from public/gifs
bun gifcities "under construction"   # search GeoCities GIFs, results land in scripts/gifcities.json
```

### ~~~~~ MADE BY: ~~~~~

[Ayfri](https://github.com/Ayfri), with Notepad and love.

### ~~~~~ CONTACT THE WEBMASTER: ~~~~~

EMAIL: webmaster@pokestore-2000.com
ICQ: 48271936
AIM: PokeStore2000

### ~~~~~ LEGAL DISCLAIMER: ~~~~~
POKÉMON and all related CHARACTERS are property of NINTENDO. This is a FAN SITE and is not affiliated with Nintendo in any way.

![PIKACHU!](public/gifs/pikachu.gif) ![UNDER CONSTRUCTION](public/gifs/geodude.gif) ![MEW!](public/gifs/mew.gif)

-------------------------------
© 2000 POKÉSTORE. ALL RIGHTS RESERVED.
VERSION 1.9.2 BETA - LAST UPDATED: 11/11/2000
