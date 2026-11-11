<script lang="ts">
	import { y2k } from "../data";

	interface Entry {
		id: string;
		name: string;
		message: string;
		date: string;
		webring: string;
		reply?: string;
	}

	const entries = $state<Entry[]>([
		{ id: "pkmnfan", name: "PkMnFaN_2000", message: "got my dark charizard in 4 days!!! A+++++ would buy again", date: "11/08/2000", webring: "", reply: "Thanks!!! Enjoy it ^_^" },
		{ id: "jen", name: "~*JeNnY*~", message: "omg ur site is so cute!!! i love the music!! plz visit my page its all about jigglypuff and n*sync", date: "11/02/2000", webring: "Jigglypuff Singers" },
		{ id: "tom", name: "Tom (Ohio)", message: "Ordered for my son's birthday, cards arrived well packed with a handwritten note. Thank you young man!", date: "10/27/2000", webring: "", reply: "Thank you sir! Happy birthday to your son!" },
		{ id: "gary", name: "Gary", message: "Cool site! Check out my Pokémon gym at /~garysgyarados", date: "10/19/2000", webring: "Kanto Trainers Ring" },
		{ id: "dark", name: "xX_DarkMewtwo_Xx", message: "is mew under the truck??? my cousin said so", date: "10/03/2000", webring: "", reply: "NO. Read the rumors page!!!" },
		{ id: "misty", name: "MistyMermaid", message: "I love water Pokémon! Your site is awesome!", date: "09/12/2000", webring: "Cerulean City WebRing" },
		{ id: "brock", name: "BrockRock99", message: "Great card selection! Do you have any rare Onix cards?", date: "08/30/2000", webring: "", reply: "Onix is only a common sorry! But I have tons of them lol" },
		{ id: "ashk", name: "AshK", message: "Gotta catch em all!!!", date: "03/14/2000", webring: "" },
	]);
	let draft = $state({ name: "", message: "", webring: "" });

	function sign(event: SubmitEvent) {
		event.preventDefault();
		entries.unshift({ ...draft, id: crypto.randomUUID(), date: y2k().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) });
		draft = { name: "", message: "", webring: "" };
	}
</script>

<form class="box mb-8 grid gap-2 bg-lilac font-bold [&_input,&_textarea]:border-2 [&_input,&_textarea]:border-gray-500 [&_input,&_textarea]:bg-white [&_input,&_textarea]:p-1 [&_input,&_textarea]:font-normal [&_input,&_textarea]:[border-style:inset]" onsubmit={sign}>
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
{#each entries as entry (entry.id)}
	<div class="mb-4 border-4 border-silver bg-white p-4 [border-style:ridge]">
		<b class="text-visited">★ {entry.name}</b> <span class="text-sm text-gray-600">{entry.date}</span>
		<p class="mt-2 border-l-4 border-sky pl-4">{entry.message}</p>
		{#if entry.webring}<p class="mt-2 text-sm text-teal">[{entry.webring}]</p>{/if}
		{#if entry.reply}<p class="mt-2 text-sm text-red-700"><b>Webmaster says:</b> {entry.reply}</p>{/if}
	</div>
{/each}
