<script lang="ts">
	import { cart } from "../cart.svelte";

	const { id }: { id: string } = $props();
</script>

<button class="btn" onclick={() => cart.add(id)}>
	<img src="/gifs/pokeball.gif" alt="" class="h-4" />Add to Cart
</button>
