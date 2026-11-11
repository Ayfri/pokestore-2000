<script lang="ts">
	import { cart } from "../cart.svelte";
	import { price, spriteUrl } from "../data";

	function checkout() {
		alert("Thank you for your order!!!\n\nNow PRINT this page (File > Print) and mail it with a check or money order. See the How to Order page for the address.");
		print();
	}
</script>

{#if cart.count}
	<table class="panel w-full text-center [&_td]:p-1 [&_tbody_tr:nth-child(even)]:bg-row2 [&_tbody_tr:nth-child(odd)]:bg-row1">
		<thead>
			<tr><th class="cathead">Item</th><th class="cathead">Name</th><th class="cathead">Price</th><th class="cathead">Qty</th><th class="cathead">Total</th><th class="cathead"></th></tr>
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
	<p class="my-3 notice text-center">
		Shipping is not included, see <a href="/order-info">How to Order</a> for the rates.
	</p>
	<div class="flex items-center justify-between">
		<a href="/shop">Continue Shopping</a>
		<button class="btn bg-green-300" onclick={checkout}><img src="/gifs/pikachu.gif" alt="" class="h-6" />Checkout</button>
	</div>
{:else}
	<section class="panel text-center">
		<h3 class="cathead">Shopping Cart</h3>
		<div class="p-3">
			<img src="/gifs/psyduck.gif" alt="Psyduck" class="mx-auto h-16" />
			<p class="my-2">Your cart is empty! <a href="/shop">Go to the shop</a></p>
		</div>
	</section>
{/if}
