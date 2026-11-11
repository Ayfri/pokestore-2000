<script lang="ts">
	import type { Pokemon } from "../data";

	type Result = Extract<Pokemon, "pikachu" | "charmander" | "squirtle" | "bulbasaur" | "snorlax" | "psyduck">;

	const results: Record<Result, string> = {
		pikachu: "Everybody's favorite! You're cute, full of energy and you REFUSE to go in your Poké Ball. Your friends would follow you anywhere.",
		charmander: "Hot-headed and competitive! You never back down from a battle (or an argument). Just don't let your tail flame go out!!",
		squirtle: "The coolest kid in school. You wear sunglasses indoors and still somehow pull it off. Squirtle Squad 4 life!",
		bulbasaur: "Calm, kind and wise. You were the one who actually read the instruction booklet. Totally underrated!!",
		snorlax: "You love food and naps more than anything. Nobody can wake you up before noon on a Saturday. Respect.",
		psyduck: "Confused... a lot. But when your headache gets bad enough, you unlock UNLIMITED PSYCHIC POWER. Watch out!",
	};

	const questions: { question: string; answers: [string, Result][] }[] = [
		{
			question: "It's Saturday morning. What are you doing?",
			answers: [["Watching cartoons in my pajamas", "pikachu"], ["Training for the big tournament", "charmander"], ["Sleeping. Obviously.", "snorlax"], ["Wait, what day is it?", "psyduck"]],
		},
		{
			question: "Pick a snack:",
			answers: [["Ketchup (on everything)", "pikachu"], ["Extra spicy hot wings", "charmander"], ["A salad (for real)", "bulbasaur"], ["ALL OF THE SNACKS", "snorlax"]],
		},
		{
			question: "Where do you hang out after school?",
			answers: [["The pool", "squirtle"], ["The garden", "bulbasaur"], ["The arcade", "pikachu"], ["In front of the fridge", "snorlax"]],
		},
		{
			question: "Your friends describe you as...",
			answers: [["Loyal and cheerful", "pikachu"], ["Kinda hot-headed", "charmander"], ["Way too cool", "squirtle"], ["Always confused", "psyduck"]],
		},
		{
			question: "Someone picks up the phone and kills your dial-up connection. You:",
			answers: [["SCREAM at my little brother", "charmander"], ["Go outside and play instead", "bulbasaur"], ["Stay chill, reconnect later", "squirtle"], ["Stare at the screen for 2 hours", "psyduck"]],
		},
		{
			question: "Pick your AIM away message:",
			answers: [["brb saving the world ^_^", "pikachu"], ["~*~zZzZzZz~*~", "snorlax"], ["chillin at the beach B-)", "squirtle"], ["...huh?", "psyduck"], ["out in the garden, call me", "bulbasaur"]],
		},
	];

	let picks = $state<Result[]>([]);
	const current = $derived(questions[picks.length]);
	/** Ties go to whichever Pokémon reached the top score first. */
	const result = $derived.by((): Result | undefined => {
		if (current) return undefined;
		const scores = new Map<Result, number>();
		for (const pick of picks) scores.set(pick, (scores.get(pick) ?? 0) + 1);
		return [...scores].reduce((top, entry) => (entry[1] > top[1] ? entry : top))[0];
	});
	const code = $derived(
		`<center><img src="http://www.pokestore-2000.com/gifs/${result}.gif"><br><b>I'm ${result?.toUpperCase()}!!</b><br>`
			+ `<a href="http://www.pokestore-2000.com/quiz">Which Pokemon are YOU? Take the quiz at Pokestore 2000!</a></center>`,
	);
</script>

<div class="win mx-auto max-w-lg">
	<div class="titlebar"><span>Which Pokémon Are You? - Quiz {current ? `${picks.length + 1}/${questions.length}` : "RESULTS"}</span><span>x</span></div>
	<div class="bg-white p-3">
		{#if current}
			<p class="mb-3 font-bold">{current.question}</p>
			<div class="grid gap-2">
				{#each current.answers as [label, pick] (label)}<button class="btn justify-start" onclick={() => picks.push(pick)}>{label}</button>{/each}
			</div>
		{:else if result}
			<p class="logo-text text-center text-[22px]">You are <span class="capitalize">{result}</span>!</p>
			<img src="/gifs/{result}.gif" alt={result} class="mx-auto my-4 h-24" />
			<p class="mb-4">{results[result]}</p>
			<p class="font-bold">Put your result on YOUR homepage! Copy &amp; paste this code:</p>
			<textarea readonly class="h-24 w-full border-2 border-gray-400 p-1 font-mono text-[11px]" onfocus={event => event.currentTarget.select()}>{code}</textarea>
			<button class="btn mx-auto mt-2" onclick={() => (picks = [])}>Take it again!</button>
		{/if}
	</div>
</div>
