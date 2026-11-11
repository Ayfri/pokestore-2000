/**
 * National Pokédex numbers, which `bun sprites` uses to fetch any missing animated sprite from PokeAPI.
 * Sprites stay GIF: these PokeAPI sprites are already gifsicle-optimal, and animated WebP/AVIF came out the same size overall
 * (385 KB each, AVIF only won on one file), so a single format keeps things uniform.
 */
export const pokedex = {
	abra: 63, aerodactyl: 142, articuno: 144, bulbasaur: 1, chansey: 113, charizard: 6, charmander: 4, clefairy: 35, ditto: 132, dragonite: 149,
	eevee: 133, flareon: 136, gengar: 94, geodude: 74, gyarados: 130, jigglypuff: 39, jolteon: 135, kangaskhan: 115, lapras: 131, machamp: 68,
	magikarp: 129, meowth: 52, mew: 151, mewtwo: 150, moltres: 146, onix: 95, pichu: 172, pikachu: 25, porygon: 137, psyduck: 54, raichu: 26,
	scyther: 123, slowpoke: 79, snorlax: 143, squirtle: 7, staryu: 120, vulpix: 37, wigglytuff: 40, zapdos: 145,
} as const;

export type Pokemon = keyof typeof pokedex;
export const pokemon = Object.keys(pokedex) as Pokemon[];

/** Ball sprites are hand-converted item PNGs, so the downloader leaves them alone. */
const balls = ["pokeball", "greatball", "ultraball", "masterball"] as const;

/** Real GeoCities clip art found with `bun gifcities`, re-optimized with gifsicle. */
const clipart = ["fire", "welcome", "rainbow"] as const;

export type Sprite = Pokemon | (typeof balls)[number] | (typeof clipart)[number];
export const sprites: Sprite[] = [...pokemon, ...balls, ...clipart];

export const spriteUrl = (name: Sprite): string => `/gifs/${name}.gif`;

/** The English sets out by late 2000, keyed by their pokemontcg.io ids. */
export const sets = { base1: "Base Set", base2: "Jungle", base3: "Fossil", base5: "Team Rocket" } as const;

export interface Card {
	id: string;
	name: string;
	set: (typeof sets)[keyof typeof sets];
	number: number;
	price: number;
	rarity: "Holo Rare" | "Uncommon" | "Common";
	stock: number;
	sprite: Sprite;
	image: string;
}

const card = (set: keyof typeof sets, number: number, name: string, price: number, stock: number, sprite: Sprite, rarity: Card["rarity"] = "Holo Rare"): Card => ({
	id: `${set}-${number}`, name, set: sets[set], number, price, rarity, stock, sprite, image: `https://images.pokemontcg.io/${set}/${number}_hires.png`,
});

/** Ids, names and rarities checked against the pokemontcg.io API. Prices are plausible estimates (no verified 2000 price list was found), Base Set holos on top. */
export const cards: Card[] = [
	card("base1", 4, "Charizard", 199.99, 1, "charizard"),
	card("base1", 2, "Blastoise", 89.99, 3, "squirtle"),
	card("base1", 15, "Venusaur", 79.99, 2, "bulbasaur"),
	card("base1", 10, "Mewtwo", 59.99, 4, "mewtwo"),
	card("base1", 1, "Alakazam", 34.99, 2, "abra"),
	card("base1", 6, "Gyarados", 29.99, 5, "gyarados"),
	card("base1", 16, "Zapdos", 26.99, 3, "zapdos"),
	card("base1", 12, "Ninetales", 24.99, 3, "vulpix"),
	card("base1", 3, "Chansey", 22.99, 2, "chansey"),
	card("base1", 14, "Raichu", 19.99, 4, "raichu"),
	card("base1", 5, "Clefairy", 14.99, 5, "clefairy"),
	card("base1", 8, "Machamp", 6.99, 11, "machamp"),
	card("base1", 58, "Pikachu", 2.99, 24, "pikachu", "Common"),
	card("base1", 46, "Charmander", 1.49, 17, "charmander", "Common"),
	card("base1", 63, "Squirtle", 0.89, 21, "squirtle", "Common"),
	card("base1", 44, "Bulbasaur", 0.79, 19, "bulbasaur", "Common"),
	card("base1", 35, "Magikarp", 0.99, 87, "magikarp", "Uncommon"),
	card("base2", 10, "Scyther", 15.99, 3, "scyther"),
	card("base2", 11, "Snorlax", 14.99, 6, "snorlax"),
	card("base2", 12, "Vaporeon", 16.99, 4, "eevee"),
	card("base2", 4, "Jolteon", 13.99, 4, "jolteon"),
	card("base2", 3, "Flareon", 12.99, 5, "flareon"),
	card("base2", 16, "Wigglytuff", 9.99, 7, "wigglytuff"),
	card("base2", 5, "Kangaskhan", 8.99, 6, "kangaskhan"),
	card("base3", 4, "Dragonite", 24.99, 2, "dragonite"),
	card("base3", 2, "Articuno", 19.99, 3, "articuno"),
	card("base3", 5, "Gengar", 19.99, 3, "gengar"),
	card("base3", 12, "Moltres", 17.99, 4, "moltres"),
	card("base3", 1, "Aerodactyl", 13.99, 5, "aerodactyl"),
	card("base3", 10, "Lapras", 11.99, 6, "lapras"),
	card("base3", 3, "Ditto", 12.99, 5, "ditto"),
	card("base5", 4, "Dark Charizard", 49.99, 2, "charizard"),
	card("base5", 3, "Dark Blastoise", 29.99, 3, "squirtle"),
	card("base5", 5, "Dark Dragonite", 22.99, 2, "dragonite"),
	card("base5", 1, "Dark Alakazam", 19.99, 4, "abra"),
	card("base5", 8, "Dark Gyarados", 17.99, 4, "gyarados"),
];

export interface Product {
	id: string;
	name: string;
	kind: "Booster Packs" | "Theme Decks" | "Video Games" | "Supplies" | "Goodies";
	price: number;
	stock: number;
	sprite: Sprite;
	description: string;
}

const product = (id: string, kind: Product["kind"], name: string, price: number, stock: number, sprite: Sprite, description: string): Product => ({
	id, kind, name, price, stock, sprite, description,
});

/** Real products sold in the US in 1999-2000. */
export const products: Product[] = [
	product("pack-base1", "Booster Packs", "Base Set Booster", 3.99, 48, "charizard", "11 cards, 1 rare in every pack! Unlimited edition. I weighed NONE of them, promise."),
	product("pack-base2", "Booster Packs", "Jungle Booster", 3.99, 36, "snorlax", "11 cards. Pull a holo Scyther or Snorlax!"),
	product("pack-base3", "Booster Packs", "Fossil Booster", 3.99, 29, "dragonite", "11 cards. Holo Dragonite, Gengar and the legendary birds!"),
	product("pack-base5", "Booster Packs", "Team Rocket Booster", 3.99, 41, "meowth", "11 cards. Dark Pokémon are EVIL. Dark Charizard is in here somewhere!!"),
	product("pack-gym1", "Booster Packs", "Gym Heroes Booster", 3.99, 33, "onix", "11 cards. Brock, Misty, Lt. Surge, Erika and their own Pokémon!"),
	product("box-base5", "Booster Packs", "Team Rocket Booster Box", 109.99, 2, "meowth", "36 sealed packs. The best deal per pack on the whole Internet!!"),
	product("deck-overgrowth", "Theme Decks", "Overgrowth Theme Deck", 9.99, 6, "bulbasaur", "60-card Grass/Water deck, ready to play. Includes a holo Blastoise!"),
	product("deck-zap", "Theme Decks", "Zap! Theme Deck", 9.99, 4, "pikachu", "60-card Psychic/Lightning deck with a holo Mewtwo!"),
	product("deck-brushfire", "Theme Decks", "Brushfire Theme Deck", 9.99, 5, "charmander", "60-card Fire/Grass deck with a holo Ninetales!"),
	product("deck-blackout", "Theme Decks", "Blackout Theme Deck", 9.99, 3, "geodude", "60-card Fighting/Water deck with a holo Hitmonchan!"),
	product("deck-2player", "Theme Decks", "2-Player Starter Set", 14.99, 7, "pichu", "Two 30-card decks, a play mat, damage counters and the rulebook. Learn to play!"),
	product("game-yellow", "Video Games", "Pokémon Yellow", 29.99, 5, "pikachu", "Game Boy. Pikachu follows you around!!! Special Pikachu Edition."),
	product("game-gold", "Video Games", "Pokémon Gold", 34.99, 3, "pichu", "Game Boy Color. 100 NEW Pokémon, day and night, and you can go back to Kanto!!"),
	product("game-silver", "Video Games", "Pokémon Silver", 34.99, 4, "pichu", "Game Boy Color. Same as Gold but with Lugia on the box. Trade with your friends!"),
	product("game-tcg", "Video Games", "Pokémon Trading Card Game", 29.99, 6, "porygon", "Game Boy Color. The card game on your Game Boy! Comes with a promo card."),
	product("game-pinball", "Video Games", "Pokémon Pinball", 24.99, 2, "magikarp", "Game Boy Color. The cartridge RUMBLES. Needs 1 AAA battery."),
	product("game-stadium", "Video Games", "Pokémon Stadium", 59.99, 2, "mewtwo", "Nintendo 64. See your Pokémon in 3D! Includes the Transfer Pak."),
	product("game-snap", "Video Games", "Pokémon Snap", 49.99, 3, "psyduck", "Nintendo 64. Take pictures of Pokémon. You can print them at Blockbuster!!"),
	product("sleeves", "Supplies", "Card Sleeves (100)", 4.99, 30, "pokeball", "Keep your holos MINT. Clear sleeves, fits every Pokémon card."),
	product("toploaders", "Supplies", "Top Loaders (25)", 3.49, 22, "greatball", "Hard plastic for your best cards. Recommended for Charizard owners!!"),
	product("pages", "Supplies", "9-Pocket Binder Pages (20)", 3.99, 25, "ultraball", "Holds 180 cards. Every trade binder needs these."),
	product("binder", "Supplies", "3-Ring Collector's Album", 12.99, 8, "masterball", "The official binder with Snorlax, Meowth and Sandshrew on the cover. Pages not included."),
	product("plush", "Goodies", "Pikachu Plush (8 in.)", 14.99, 6, "pikachu", "Super soft! Says nothing, but it's cute."),
	product("pokedex", "Goodies", "Electronic Pokédex", 24.99, 3, "porygon", "Handheld Pokédex with all 151 Pokémon inside. Batteries included!"),
	product("pocket-pikachu", "Goodies", "Pocket Pikachu", 19.99, 4, "pikachu", "Virtual pet + step counter. Walk more and Pikachu likes you more!"),
	product("bk-card", "Goodies", "23K Gold-Plated Card", 19.99, 2, "mewtwo", "The gold-plated cards from the Burger King promo, still in the Poké Ball box!"),
	product("cd", "Goodies", "2.B.A. Master CD", 13.99, 5, "jigglypuff", "The soundtrack! Has the Pokérap, the theme song and \"Viridian City\"."),
];

/** Everything the cart can hold: cards and products share id, name, price and sprite. */
export const catalog: Pick<Card, "id" | "name" | "price" | "sprite">[] = [...cards, ...products];

/** The site role-plays the year 2000: dates keep today's month and day but land in 2000, a leap year, so Feb 29 still exists. */
export const y2k = (date = new Date()): Date => new Date(2000, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

export const price = (value: number): string => `$${value.toFixed(2)}`;
