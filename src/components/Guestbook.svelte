<script lang="ts">
	interface Entry {
		name: string;
		message: string;
		date: string;
		webring: string;
	}

	const entries = $state<Entry[]>([
		{ name: "Gary", message: "Cool site! Check out my Pokémon gym at /~garysgyarados", date: "03/15/2000", webring: "Kanto Trainers Ring" },
		{ name: "AshK", message: "Gotta catch em all!!!", date: "03/14/2000", webring: "" },
		{ name: "MistyMermaid", message: "I love water Pokémon! Your site is awesome!", date: "03/12/2000", webring: "Cerulean City WebRing" },
		{ name: "BrockRock99", message: "Great card selection! Do you have any rare Onix cards?", date: "03/10/2000", webring: "" },
	]);
	let draft = $state({ name: "", message: "", webring: "" });

	function sign(event: SubmitEvent) {
		event.preventDefault();
		entries.unshift({ ...draft, date: new Date().toLocaleDateString("en-US") });
		draft = { name: "", message: "", webring: "" };
	}
</script>

<form class="box mb-8 grid gap-2 bg-linear-to-r from-blue-100 to-purple-100 font-bold [&_input,&_textarea]:border-2 [&_input,&_textarea]:border-gray-400 [&_input,&_textarea]:bg-white [&_input,&_textarea]:p-1 [&_input,&_textarea]:font-normal" onsubmit={sign}>
	<h3 class="text-xl"><img src="/gifs/mew.gif" alt="" class="inline h-8" /> Sign the Guestbook!</h3>
	<label for="gb-name">Name:</label>
	<input id="gb-name" bind:value={draft.name} required />
	<label for="gb-message">Message:</label>
	<textarea id="gb-message" bind:value={draft.message} required class="h-24"></textarea>
	<label for="gb-webring">Webring (optional):</label>
	<input id="gb-webring" bind:value={draft.webring} />
	<button class="btn mx-auto mt-2"><img src="/gifs/pikachu.gif" alt="" class="h-6" />Sign Guestbook</button>
</form>

<h3 class="mb-4 animate-blink bg-yellow-200 p-2 text-center text-xl font-bold">Recent Signatures</h3>
{#each entries as entry, i (i)}
	<div class="mb-4 border-b-2 border-blue-300 bg-linear-to-r from-blue-50 to-purple-50 p-4">
		<b class="text-purple-700">★ {entry.name}</b> <span class="text-sm text-gray-600">{entry.date}</span>
		<p class="mt-2 border-l-4 border-blue-300 pl-4">{entry.message}</p>
		{#if entry.webring}<p class="mt-2 text-sm text-blue-600">[{entry.webring}]</p>{/if}
	</div>
{/each}
