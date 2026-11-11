import { cards } from "./data";

/** Pages are separate documents, so the cart lives in localStorage to survive navigation; islands on one page share this instance. */
class Cart {
	quantities = $state<Record<string, number>>(import.meta.env.SSR ? {} : JSON.parse(localStorage.getItem("cart") ?? "{}"));
	lines = $derived(cards.flatMap(card => {
		const quantity = this.quantities[card.id];
		return quantity ? [{ ...card, quantity }] : [];
	}));
	count = $derived(this.lines.reduce((sum, line) => sum + line.quantity, 0));
	total = $derived(this.lines.reduce((sum, line) => sum + line.price * line.quantity, 0));

	add(id: string) {
		this.quantities[id] = (this.quantities[id] ?? 0) + 1;
		this.save();
	}

	remove(id: string) {
		const quantity = (this.quantities[id] ?? 0) - 1;
		if (quantity > 0) this.quantities[id] = quantity;
		else delete this.quantities[id];
		this.save();
	}

	clear() {
		this.quantities = {};
		this.save();
	}

	private save() {
		localStorage.setItem("cart", JSON.stringify(this.quantities));
	}
}

export const cart = new Cart();
