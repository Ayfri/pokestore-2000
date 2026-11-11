<script lang="ts">
	import { type Pokemon, pokedex, pokemon } from "../data";

	const shuffle = <T,>(items: readonly T[]): T[] =>
		items.map(item => [Math.random(), item] as const).sort((a, b) => a[0] - b[0]).map(([, item]) => item);

	let answer = $state<Pokemon>("pikachu");
	let choices = $state<Pokemon[]>([]);
	let guess = $state<Pokemon | null>(null);
	let score = $state(0);
	let streak = $state(0);
	let best = $state(0);
	try {
		best = Number(localStorage.getItem("whos-that-best") ?? 0);
	} catch {}

	function round() {
		const [next, ...others] = shuffle(pokemon.filter(name => name !== answer));
		answer = next!;
		choices = shuffle([answer, ...others.slice(0, 3)]);
		guess = null;
	}
	round();

	function pick(name: Pokemon) {
		guess = name;
		if (name !== answer) {
			streak = 0;
			return;
		}
		score++;
		streak++;
		if (streak <= best) return;
		best = streak;
		try {
			localStorage.setItem("whos-that-best", String(best));
		} catch {}
	}
</script>

<div class="panel mx-auto max-w-md bg-row1 p-3 text-center">
	<p class="logo-text text-[22px]">Who's That Pokémon?!</p>
	<div class="my-4 flex h-32 items-center justify-center">
		<img src="/gifs/{answer}.gif" alt={guess ? answer : "Mystery Pokémon"} class="max-h-32 scale-150 transition duration-500" style:filter={guess ? "none" : "brightness(0)"} />
	</div>
	{#if guess}
		<p class="font-bold {guess === answer ? 'text-green-700' : 'text-red-700'}">
			{guess === answer ? "Correct!" : "Wrong!"} It's #{String(pokedex[answer]).padStart(3, "0")} <span class="capitalize">{answer}</span>!
		</p>
		<button class="btn mt-2" onclick={round}>Next Pokémon &gt;&gt;</button>
	{:else}
		<div class="grid grid-cols-2 gap-2">
			{#each choices as name (name)}<button class="btn justify-center capitalize" onclick={() => pick(name)}>{name}</button>{/each}
		</div>
	{/if}
	<p class="mt-4 font-mono">SCORE: {score} | STREAK: {streak} | BEST: {best}</p>
</div>
