/// <reference types="bun" />
/**
 * Searches GifCities (the Internet Archive's GeoCities GIF search) and merges the hits into scripts/gifcities.json, deduplicated by checksum.
 * Usage: `bun gifcities` for the default terms, or `bun gifcities "pokemon button" "under construction"`.
 * The site's own JSON API answers instantly, where scraping its search page needed a browser and ~20 s per term.
 */

interface ApiHit {
	url_text: string;
	weight: number;
	/** `<timestamp>/<original url>`, a Wayback Machine path without its prefix. */
	gif: string;
	checksum: string;
	width: number;
	height: number;
	page: string;
}

interface Gif {
	url: string;
	page: string;
	text: string;
	width: number;
	height: number;
	term: string;
	checksum: string;
}

const defaultTerms = [
	"pokemon", "pikachu", "pokeball", "charmander", "bulbasaur", "squirtle", "pokemon logo", "pokemon battle", "mewtwo", "jigglypuff", "psyduck",
	"pokedex", "pokemon button",
];
const terms = Bun.argv.length > 2 ? Bun.argv.slice(2) : defaultTerms;
const output = Bun.file(`${import.meta.dir}/gifcities.json`);

async function search(term: string): Promise<Gif[]> {
	const response = await fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${encodeURIComponent(term)}`);
	if (!response.ok) throw new Error(`"${term}": HTTP ${response.status}`);
	const hits = (await response.json()) as ApiHit[];
	console.log(`${hits.length} GIFs for "${term}"`);
	/** The `im_` flag makes the Wayback Machine serve the raw image instead of wrapping it in its toolbar page. */
	return hits.map(hit => {
		const [timestamp, ...original] = hit.gif.split("/");
		return {
			url: `https://web.archive.org/web/${timestamp}im_/${original.join("/")}`,
			page: hit.page, text: hit.url_text, width: hit.width, height: hit.height, term, checksum: hit.checksum,
		};
	});
}

const existing: Gif[] = (await output.exists()) ? await output.json() : [];
const known = new Set(existing.map(gif => gif.checksum));
const found = (await Promise.all(terms.map(search))).flat().filter(gif => !known.has(gif.checksum) && known.add(gif.checksum));

await Bun.write(output, JSON.stringify([...existing, ...found], null, "\t"));
console.log(`Added ${found.length} new GIFs, ${existing.length + found.length} total in ${output.name}`);
