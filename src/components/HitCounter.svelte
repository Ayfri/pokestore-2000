<script lang="ts">
	/**
	 * Derived from the clock (one "hit" every 53 s since launch) so every visitor sees it climb the same way, plus their own page views.
	 * The odd base and rate keep the digits looking organic instead of landing on runs like 23456.
	 * The Layout also renders it statically as the island's fallback: localStorage throws at build time, so the fallback shows the build-time count.
	 */
	const launch = Date.UTC(2026, 10, 1);
	let views = 1;
	try {
		views = Number(localStorage.getItem("views") ?? 0) + 1;
		localStorage.setItem("views", String(views));
	} catch {}
	const hits = 61_387 + Math.floor((Date.now() - launch) / 53_000) + views;
</script>

<span class="inline-flex gap-px border-2 border-gray-500 bg-gray-700 p-px font-led text-xl leading-none text-lime-400">
	{#each String(hits).padStart(9, "0") as digit}<span class="bg-black px-0.5">{digit}</span>{/each}
</span>
