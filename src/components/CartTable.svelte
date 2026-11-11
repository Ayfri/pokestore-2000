<script lang="ts">
	import { cart } from "../cart.svelte";
	import { price, spriteUrl } from "../data";

	function checkout() {
		alert("Thank you for your purchase! Your order has been processed.");
		cart.clear();
	}
</script>

{#if cart.count}
	<table class="w-full border-2 border-[#000080] text-center [&_td]:border [&_td]:border-[#000080] [&_td]:p-1 [&_tr:nth-child(even)]:bg-indigo-50">
		<thead class="bg-[#000080] text-white">
			<tr><th>Item</th><th>Name</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>
		</thead>
		<tbody>
			{#each cart.lines as line (line.id)}
				<tr>
					<td><img src={spriteUrl(line.sprite)} alt={line.name} class="inline h-10" /></td>
					<td>{line.name}</td>
					<td>{price(line.price)}</td>
					<td>{line.quantity}</td>
					<td class="font-bold">{price(line.price * line.quantity)}</td>
					<td><button class="btn" onclick={() => cart.remove(line.id)}>Remove</button></td>
				</tr>
			{/each}
		</tbody>
		<tfoot class="font-bold">
			<tr><td colspan="4" class="text-right">Total:</td><td>{price(cart.total)}</td><td></td></tr>
		</tfoot>
	</table>
	<p class="my-4 border border-yellow-400 bg-yellow-100 p-2 text-center text-sm">
		Free shipping on orders over $50! Use coupon code <b>POKEMANIA2000</b> for 10% off!
	</p>
	<div class="flex justify-between">
		<a href="/shop" class="btn">Continue Shopping</a>
		<button class="btn bg-green-300" onclick={checkout}><img src="/gifs/pikachu.gif" alt="" class="h-6" />Checkout</button>
	</div>
{:else}
	<div class="box text-center">
		<img src="/gifs/psyduck.gif" alt="Psyduck" class="mx-auto h-16" />
		<p class="my-2 text-lg">Your cart is empty!</p>
		<a href="/shop" class="btn">Go to Shop</a>
	</div>
{/if}
