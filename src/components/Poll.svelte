<script lang="ts">
	import type { Sprite } from "../data";

	/** There is no backend: the other votes are made up and only the visitor's own vote is real, kept in localStorage. */
	const options: { name: string; sprite: Sprite; votes: number }[] = [
		{ name: "Bulbasaur", sprite: "bulbasaur", votes: 412 },
		{ name: "Charmander", sprite: "charmander", votes: 987 },
		{ name: "Squirtle", sprite: "squirtle", votes: 756 },
		{ name: "Pikachu", sprite: "pikachu", votes: 1203 },
	];
	let vote = $state<string | null>(null);
	try {
		vote = localStorage.getItem("poll");
	} catch {}
	const counts = $derived(options.map(option => option.votes + Number(option.name === vote)));
	const total = $derived(counts.reduce((sum, count) => sum + count, 0));

	function submit(event: SubmitEvent) {
		event.preventDefault();
		const choice = new FormData(event.currentTarget as HTMLFormElement).get("starter");
		if (typeof choice !== "string") return;
		vote = choice;
		try {
			localStorage.setItem("poll", choice);
		} catch {}
	}
</script>

<div class="win">
	<div class="titlebar">Poké-Poll</div>
	<div class="bg-white p-2">
		<p class="mb-2 font-bold">What is the BEST starter Pokémon???</p>
		{#if vote}
			{#each options as option, i (option.name)}
				{@const percent = Math.round((counts[i]! / total) * 100)}
				<p class="mt-1 flex items-center gap-1"><img src="/gifs/{option.sprite}.gif" alt="" class="h-5" />{option.name} {option.name === vote ? "(your vote!)" : ""}</p>
				<div class="flex items-center gap-1 text-[11px]">
					<span class="h-3 border border-black bg-linear-to-r from-red-500 to-yellow-300" style:width="{percent}%"></span>{percent}%
				</div>
			{/each}
			<p class="mt-2 text-center text-[11px] text-gray-600">{total} votes since 03/2000 - Thanks for voting!</p>
		{:else}
			<form onsubmit={submit} class="grid gap-1">
				{#each options as option (option.name)}
					<label class="flex items-center gap-1"><input type="radio" name="starter" value={option.name} required />{option.name}</label>
				{/each}
				<button class="btn mx-auto mt-2">VOTE!</button>
			</form>
		{/if}
	</div>
</div>
