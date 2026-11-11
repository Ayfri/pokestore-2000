import { catalog } from "./data";

/** Pages are separate documents, so the cart lives in localStorage to survive navigation; islands on one page share this instance. */
class Cart {
	quantities = $state<Record<string, number>>(import.meta.env.SSR ? {} : JSON.parse(localStorage.getItem("cart") ?? "{}"));
	lines = $derived(catalog.flatMap(item => {
		const quantity = this.quantities[item.id];
		return quantity ? [{ ...item, quantity }] : [];
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

	/** MissingNo.'s famous item duplication glitch: the first item in the cart jumps to x128. Returns the duplicated item's name. */
	glitch(): string | undefined {
		const line = this.lines[0];
		if (!line) return undefined;
		this.quantities[line.id] = 128;
		this.save();
		return line.name;
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
