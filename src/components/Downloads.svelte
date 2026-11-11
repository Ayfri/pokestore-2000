<script lang="ts">
	/** Nothing is ever downloaded: each file plays a 56k transfer that ends on one of the classic ways downloads died in 2000. */
	const files: { name: string; description: string; size: number }[] = [
		{ name: "pikachu_theme.zip", description: "Windows 98 Desktop Theme with Pikachu wallpaper, icons AND sounds!!", size: 2_340 },
		{ name: "pokeball_winamp.wsz", description: "Poké Ball skin for Winamp 2.x. The play button is a Poké Ball!", size: 187 },
		{ name: "pokecursors.zip", description: "12 animated cursors for Windows. Your mouse becomes a Pikachu!", size: 96 },
		{ name: "poke_screensaver.zip", description: "Screen saver with flying Poké Balls. Better than the pipes one!!", size: 1_210 },
		{ name: "pokerap_FULL.mp3", description: "The Pokérap, all 150 Pokémon. Found it on Napster, 128 kbps", size: 3_560 },
		{ name: "pokestore_toolbar.exe", description: "The official Pokéstore Toolbar for Internet Explorer 5! (100% no spyware)", size: 643 },
	];
	const failures = [
		"Connection lost!!! Someone picked up the phone.",
		"Error: Disk full. Your 3½\" floppy only holds 1.44 MB.",
		"The server is not responding. (It's a Pentium II under my bed and my mom unplugged it to vacuum.)",
		"Download complete!!! ...just kidding, Norton AntiVirus ate it.",
		"Your free 10 hours of AOL this month are used up.",
	];

	let current = $state<{ name: string; size: number; done: number; error: string | null } | null>(null);
	let timer: ReturnType<typeof setInterval> | undefined;

	/** 56k modems really got ~4.5 KB/s; the bar is sped up 20x so the joke lands before anyone gets bored. */
	function download(name: string, size: number) {
		clearInterval(timer);
		current = { name, size, done: 0, error: null };
		const failAt = size * (0.6 + Math.random() * 0.39);
		timer = setInterval(() => {
			if (!current) return clearInterval(timer);
			current.done = Math.min(current.done + 9 * (0.3 + Math.random()), failAt);
			if (current.done < failAt) return;
			current.error = failures[Math.floor(Math.random() * failures.length)]!;
			clearInterval(timer);
		}, 100);
	}

	function close() {
		clearInterval(timer);
		current = null;
	}

	const minutes = (kilobytes: number) => Math.ceil(kilobytes / 4.5 / 60);
</script>

<table class="w-full border-2 border-navy bg-white text-sm [&_td]:border [&_td]:border-silver [&_td]:p-2">
	<thead class="bg-navy text-white"><tr><th>File</th><th>Size</th><th class="max-sm:hidden">56k</th><th></th></tr></thead>
	<tbody>
		{#each files as file (file.name)}
			<tr>
				<td><b class="font-mono break-all">{file.name}</b><br /><span class="text-xs">{file.description}</span></td>
				<td class="text-center whitespace-nowrap">{file.size >= 1000 ? `${(file.size / 1000).toFixed(1)} MB` : `${file.size} KB`}</td>
				<td class="text-center whitespace-nowrap max-sm:hidden">~{minutes(file.size)} min</td>
				<td class="text-center"><button class="btn text-xs" onclick={() => download(file.name, file.size)}>Download</button></td>
			</tr>
		{/each}
	</tbody>
</table>

{#if current}
	<div class="win fixed top-1/3 left-1/2 z-40 w-80 max-w-[90vw] -translate-x-1/2" role="dialog" aria-label="Download progress">
		<div class="titlebar"><span>{current.error ? "Error" : `${Math.floor((current.done / current.size) * 100)}% of ${current.name}`}</span><button class="btn px-1 py-0 text-xs" onclick={close} aria-label="Close">x</button></div>
		<div class="p-3 text-xs">
			{#if current.error}
				<p class="mb-3 flex items-center gap-2"><span class="text-2xl">⚠️</span>{current.error}</p>
				<div class="flex justify-center gap-2"><button class="btn" onclick={() => current && download(current.name, current.size)}>Retry</button><button class="btn" onclick={close}>Cancel</button></div>
			{:else}
				<p>Saving: <b>{current.name}</b> from www.pokestore-2000.com</p>
				<p class="my-1">Estimated time left: {minutes(current.size - current.done)} min ({Math.floor(current.done)} KB of {current.size} KB copied)</p>
				<p>Transfer rate: {(3 + Math.random() * 1.6).toFixed(1)} KB/Sec</p>
				<div class="mt-2 h-4 border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white bg-white p-px">
					<div class="h-full bg-[repeating-linear-gradient(90deg,#000080_0_8px,transparent_8px_10px)]" style:width="{(current.done / current.size) * 100}%"></div>
				</div>
			{/if}
		</div>
	</div>
{/if}
