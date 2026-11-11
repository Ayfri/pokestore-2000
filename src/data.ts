/**
 * Sprites stay GIF: these PokeAPI sprites are already gifsicle-optimal, and animated WebP/AVIF came out the same size overall
 * (385 KB each, AVIF only won on one file), so a single format keeps things uniform.
 */
export const sprites = [
	"bulbasaur", "charizard", "charmander", "geodude", "greatball", "jigglypuff", "magikarp", "masterball", "mew", "mewtwo",
	"pichu", "pikachu", "pokeball", "porygon", "psyduck", "squirtle", "staryu", "ultraball",
] as const;

export type Sprite = (typeof sprites)[number];

export const spriteUrl = (name: Sprite): string => `/gifs/${name}.gif`;

export interface Card {
	id: string;
	name: string;
	price: number;
	rarity: string;
	sprite: Sprite;
	image: string;
}

const card = (name: string, price: number, rarity: string, sprite: Sprite, number: number): Card => ({
	id: name.toLowerCase(), name, price, rarity, sprite, image: `https://images.pokemontcg.io/base1/${number}_hires.png`,
});

export const cards: Card[] = [
	card("Pikachu", 29.99, "Rare", "pikachu", 58),
	card("Charizard", 199.99, "Ultra Rare", "charizard", 4),
	card("Mewtwo", 149.99, "Secret Rare", "mewtwo", 10),
	card("Blastoise", 89.99, "Holo Rare", "squirtle", 2),
	card("Venusaur", 79.99, "Holo Rare", "bulbasaur", 15),
	card("Magikarp", 0.99, "Common", "magikarp", 35),
];

export const price = (value: number): string => `$${value.toFixed(2)}`;
