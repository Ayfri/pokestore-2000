/// <reference types="bun" />
/**
 * Builds the site's Photoshop-style montages (header, 468x60 banner, 88x31 button, Neo Genesis teaser, staff avatars) with ImageMagick 7,
 * into src/assets/montages as WebP. In the site's story they are Gengar_FX's Paint Shop Pro work, hence the credit in the header.
 * Artwork is cropped from Base Set card scans, period art from 1999, because PokeAPI's official artwork is the post-2004 redraw (modern Pikachu).
 * Only the Gen 1-2 renders that barely changed since 2000 (Charizard, Mewtwo, Lugia) come from PokeAPI. Downloads are cached in the OS temp folder.
 */
import { $ } from "bun";
import { tmpdir } from "node:os";

/** Forward slashes, since ImageMagick reads the backslashes of a Windows -font path as escapes. */
const cache = `${tmpdir().replaceAll("\\", "/")}/pokestore-montages`;
const out = "src/assets/montages";

const sources = {
	silkscreen: "https://raw.githubusercontent.com/google/fonts/main/ofl/silkscreen/Silkscreen-Regular.ttf",
	titan: "https://raw.githubusercontent.com/google/fonts/main/ofl/titanone/TitanOne-Regular.ttf",
	charizard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
	mewtwo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
	lugia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png",
	pikachuCard: "https://images.pokemontcg.io/base1/58_hires.png",
	charizardCard: "https://images.pokemontcg.io/base1/4_hires.png",
	mewtwoCard: "https://images.pokemontcg.io/base1/10_hires.png",
	darkCharizardCard: "https://images.pokemontcg.io/base5/4_hires.png",
	gengarCard: "https://images.pokemontcg.io/base3/5_hires.png",
	snorlaxCard: "https://images.pokemontcg.io/base2/11_hires.png",
} as const;

type Source = keyof typeof sources;

const fetchAll = async (): Promise<Record<Source, string>> => {
	const entries = await Promise.all(Object.entries(sources).map(async ([name, url]) => {
		const path = `${cache}/${name}${url.slice(url.lastIndexOf("."))}`;
		const file = Bun.file(path);
		if (!(await file.exists())) {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
			await Bun.write(file, response);
		}
		return [name, path] as const;
	}));
	return Object.fromEntries(entries) as Record<Source, string>;
};

const src = await fetchAll();

/** The art window of a Base Set hires scan (600x825), without its yellow frame. */
const art = { width: 456, height: 316, crop: "456x316+72+100" } as const;

type Args = string[];

/** Wraps an image in a soft outer glow of `color`, the Photoshop layer effect every banner of the time leaned on. */
const glow = (color: string, sigma: number, opacity = 90): Args =>
	["(", "+clone", "-background", color, "-shadow", `${opacity}x${sigma}+0+0`, ")", "+swap", "-background", "none", "-layers", "merge", "+repage"];

const dropShadow = (offset: number): Args =>
	["(", "+clone", "-background", "#000000", "-shadow", `80x0+${offset}+${offset}`, ")", "+swap", "-background", "none", "-layers", "merge", "+repage"];

/** Card art cropped to its art window and faded from opaque on the left to transparent on its right edge, so it never ends on a hard line. */
const cardArt = (card: string, height: number): Args => [
	"(", card, "+gravity", "-crop", art.crop, "+repage", "-resize", `x${height}`, "-modulate", "90,110", "-alpha", "set",
	"(", "-size", `${height}x${Math.round((art.width / art.height) * height)}`, "gradient:white-black", "-rotate", "-90", "-level", "0,50%", ")",
	"-compose", "copyalpha", "-composite", ")",
	"-gravity", "west", "-geometry", "+0+0", "-compose", "over", "-composite",
];

/** Text in the Pokémon logo colors: a black shadow, then the blue outline, then the yellow fill on top. */
const logoText = (text: string, size: number, x: number, y: number, gravity = "center"): Args => {
	const signed = (n: number) => `${n >= 0 ? "+" : ""}${n}`;
	const at = (dx: number) => `${signed(x + dx)}${signed(y + dx)}`;
	const stroke = String(Math.round(size / 5));
	return [
		"-font", src.titan, "-pointsize", String(size), "-gravity", gravity,
		"-fill", "#000000", "-stroke", "#000000", "-strokewidth", stroke, "-annotate", at(Math.ceil(size / 12)), text,
		"-fill", "#2a5bb8", "-stroke", "#2a5bb8", "-annotate", at(0), text,
		"-fill", "#ffcb05", "-stroke", "none", "-annotate", at(0), text,
	];
};

/** Silkscreen is an 8px bitmap design, so antialiasing stays off and the size stays at 8 to keep it crisp. */
const pixelText = (lines: [text: string, color: string, gravity: string, offset: string][]): Args =>
	["+antialias", "-font", src.silkscreen, "-pointsize", "8", "-stroke", "none", ...lines.flatMap(([text, color, gravity, offset]) => ["-fill", color, "-gravity", gravity, "-annotate", offset, text]), "-antialias"];

/**
 * A 1px dark line every other row, the scanlines pattern every 2000s banner was layered with, then an optional `inner` 1px border and a 1px black one.
 * +geometry drops the offset left by the previous -composite, which would otherwise shift the scanline layer.
 */
const finish = (width: number, height: number, inner: string): Args => [
	"(", "-size", "1x2", "xc:none", "-fill", "#0006", "-draw", "point 0,1", "-write", "mpr:scan", "+delete", ")",
	"(", "-size", `${width}x${height}`, "tile:mpr:scan", ")", "+geometry", "-gravity", "center", "-compose", "over", "-composite",
	...(inner ? ["-bordercolor", inner, "-border", "1"] : []), "-bordercolor", "#000000", "-border", "1",
];

const logo = (height: number, glowSigma: number): Args =>
	["(", "src/assets/pokestore.webp", "-resize", `x${height}`, ...glow("#ffffff", glowSigma, 70), ...dropShadow(Math.max(1, Math.round(height / 28))), ")"];

/** A 100x100 forum avatar: the square middle of a card's art, its owner's handle in pixel text on a dark bar, scanlines. */
const avatar = (name: string, card: string): Args => [
	card, "+gravity", "-crop", `${art.height}x${art.height}+${72 + (art.width - art.height) / 2}+100`, "+repage", "-resize", "98x98", "-modulate", "95,115",
	"(", "-size", "98x12", "xc:#000000aa", ")", "-gravity", "south", "-compose", "over", "-composite",
	...pixelText([[name.toUpperCase(), "#ffffff", "south", "+0+2"]]),
	...finish(98, 98, ""),
];

/** The staff of the About page, each with the card art Gengar_FX picked for their avatar. */
const team: [name: string, card: string][] = [
	["Ayfri", src.mewtwoCard],
	["DarkCharizard", src.darkCharizardCard],
	["Gengar_FX", src.gengarCard],
	["PikaPrincess", src.pikachuCard],
	["Mom", src.snorlaxCard],
];

const montages: Record<string, Args> = {
	/** The site header: Pikachu card art on the left, Charizard and a ghost of Lugia (the Neo Genesis teaser) on the right. */
	header: [
		"-size", "960x180", "gradient:#02021e-#14206a",
		"(", "-size", "600x280", "radial-gradient:#3b5bdbcc-#3b5bdb00", ")", "-gravity", "center", "-geometry", "+0+10", "-compose", "screen", "-composite",
		...cardArt(src.pikachuCard, 180),
		"(", src.lugia, "-resize", "250x250", "-channel", "A", "-evaluate", "multiply", "0.35", "+channel", ")", "-gravity", "east", "-geometry", "-60-10", "-composite",
		"(", src.charizard, "-resize", "195x195", ...glow("#ffcc33", 5), ")", "-gravity", "southeast", "-geometry", "+12-16", "-composite",
		...logo(92, 6), "-gravity", "center", "-geometry", "+10-24", "-composite",
		...logoText("2000", 36, 98, 26),
		...pixelText([
			["YOUR #1 SOURCE FOR RARE POKEMON CARDS  -  SINCE JAN. 2000", "#ffffff", "center", "+10+62"],
			["WWW.POKESTORE-2000.COM", "#ffcc33", "northeast", "+6+5"],
			["GFX BY GENGAR_FX", "#7f8fcf", "south", "+10+3"],
		]),
		...finish(960, 180, "#5b6cc4"),
	],
	/** The standard 468x60 ad banner for the "Link to Us" page. */
	banner: [
		"-size", "466x58", "gradient:#0b1250-#020218",
		...cardArt(src.charizardCard, 58),
		"(", src.mewtwo, "-resize", "84x84", ...glow("#cc99ff", 3), ")", "-gravity", "east", "-geometry", "+2-8", "-composite",
		...logo(30, 3), "-gravity", "northwest", "-geometry", "+104+4", "-composite",
		...logoText("2000", 16, 206, 14, "northwest"),
		...pixelText([
			["RARE CARDS - BOOSTERS - TRADES", "#ffffff", "southwest", "+108+14"],
			["CLICK HERE!", "#ffcc33", "southwest", "+108+4"],
		]),
		...finish(466, 58, ""),
	],
	/** The 88x31 button, made like the real ones: a tiny crop of art, a gradient and 8px pixel text. */
	button: [
		"-size", "86x29", "gradient:#14206a-#02021e",
		...cardArt(src.pikachuCard, 29),
		...pixelText([
			["POKESTORE", "#ffffff", "northeast", "+3+5"],
			["2000", "#ffcb05", "southeast", "+3+4"],
		]),
		...finish(86, 29, ""),
	],
	/** The Neo Genesis release teaser on the home page, Lugia being the set's big holo. */
	neo: [
		"-size", "466x58", "gradient:#06303f-#020a28",
		"(", "-size", "300x120", "radial-gradient:#3fa9c9aa-#3fa9c900", ")", "-gravity", "east", "-geometry", "-40+0", "-compose", "screen", "-composite", "-compose", "over",
		"(", src.lugia, "-resize", "110x110", ...glow("#99e6ff", 4), ")", "-gravity", "east", "-geometry", "+10+6", "-composite",
		...logoText("NEO GENESIS", 22, 12, 6, "northwest"),
		...pixelText([
			["IN STORES 12.16.2000 - PRE-ORDER YOUR BOX NOW!", "#ffffff", "southwest", "+14+8"],
		]),
		...finish(466, 58, ""),
	],
	...Object.fromEntries(team.map(([name, card]) => [`avatar-${name.toLowerCase()}`, avatar(name, card)])),
};

await $`mkdir -p ${out}`;
await Promise.all(Object.entries(montages).map(([name, args]) => $`magick ${args} -define webp:lossless=true ${out}/${name}.webp`));
console.log(`Wrote ${Object.keys(montages).map(name => `${out}/${name}.webp`).join(", ")}`);
