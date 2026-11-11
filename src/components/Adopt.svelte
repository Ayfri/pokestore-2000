<script lang="ts">
	import type { Pokemon } from "../data";

	const babies: Pokemon[] = ["pichu", "charmander", "squirtle", "bulbasaur", "eevee", "magikarp"];
	let chosen = $state<Pokemon | null>(null);
	let nickname = $state("");
	const code = $derived(
		`<img src="http://www.pokestore-2000.com/gifs/${chosen}.gif"><br>This is <b>${nickname || "my Pokémon"}</b>! `
			+ `<a href="http://www.pokestore-2000.com/link-to-us">Adopt your own at Pokéstore 2000!</a>`,
	);
</script>

<div class="box bg-mint text-center">
	<h3 class="mb-2 text-xl font-bold">🥚 Adopt a Pokémon! 🥚</h3>
	<p class="mb-3 text-sm">Pick a baby Pokémon, give it a name, and put it on your homepage. Please take good care of it!!</p>
	<div class="flex flex-wrap justify-center gap-2">
		{#each babies as baby (baby)}
			<button class={["btn h-16 w-16 justify-center", chosen === baby && "bg-yellow-300"]} onclick={() => (chosen = baby)} aria-label="Adopt {baby}">
				<img src="/gifs/{baby}.gif" alt="" class="max-h-12" />
			</button>
		{/each}
	</div>
	{#if chosen}
		<label class="mt-3 block text-sm font-bold">Nickname: <input bind:value={nickname} maxlength="10" class="border-2 border-gray-500 bg-white p-1 font-normal [border-style:inset]" /></label>
		<p class="mt-3 text-sm">Copy this code to your page:</p>
		<textarea readonly class="h-20 w-full border-2 border-gray-500 bg-white p-1 font-mono text-xs" onfocus={event => event.currentTarget.select()}>{code}</textarea>
	{/if}
</div>
