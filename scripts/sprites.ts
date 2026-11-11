/// <reference types="bun" />
/** Downloads every Pokémon of `pokedex` that has no GIF in public/gifs yet. PokeAPI's Gen 5 animated sprites are already gifsicle-optimal. */
import { pokedex, type Pokemon } from "../src/data";

const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated";
const entries = Object.entries(pokedex) as [Pokemon, number][];

const results = await Promise.all(entries.map(async ([name, number]) => {
	const file = Bun.file(`public/gifs/${name}.gif`);
	if (await file.exists()) return null;
	const response = await fetch(`${base}/${number}.gif`);
	if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
	return `${name}.gif (${await Bun.write(file, response)} B)`;
}));

const downloaded = results.filter(result => result !== null);
console.log(downloaded.length ? `Downloaded ${downloaded.join(", ")}` : "Every sprite is already there.");
