/** Site-wide gimmicks bundled in one script: Svelte islands are kept for stateful widgets only. */
import { cart } from "./cart.svelte";
import { y2k } from "./data";

const motion = matchMedia("(prefers-reduced-motion: no-preference)").matches;

const clock = document.querySelector("#clock");
if (clock) {
	const tick = () => (clock.textContent = y2k().toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }));
	tick();
	setInterval(tick, 1000);
}

const screenSize = document.querySelector("#screen");
if (screenSize) {
	const { width, height } = screen;
	screenSize.textContent = `${width}x${height}`;
}

if (motion) {
	/** The classic DHTML scrolling title bar, one character every 300 ms. */
	let title = `${document.title}    `;
	setInterval(() => {
		title = title.slice(1) + title[0];
		document.title = title;
	}, 300);

	/** Like the snowfall scripts everyone copy-pasted from Dynamic Drive, with Poké Balls. */
	for (const [i, ball] of ["pokeball", "greatball", "ultraball", "pokeball", "masterball", "pokeball"].entries()) {
		const image = document.createElement("img");
		image.src = `/gifs/${ball}.gif`;
		image.alt = "";
		image.className = "pointer-events-none fixed top-0 z-40 h-5 animate-fall opacity-70";
		image.style.left = `${8 + i * 16 + Math.random() * 8}%`;
		image.style.animationDuration = `${9 + Math.random() * 8}s`;
		image.style.animationDelay = `${-Math.random() * 15}s`;
		document.body.append(image);
	}
}

/** Storage throws in some private modes, and none of these gimmicks is worth crashing for. */
function remember(storage: Storage, key: string): boolean {
	try {
		if (storage.getItem(key)) return true;
		storage.setItem(key, "1");
	} catch {}
	return false;
}

if (motion && matchMedia("(pointer: fine)").matches) {
	const colors = ["#ff0", "#f0f", "#0ff", "#fff", "#f80"];
	const sparkles = Array.from({ length: 12 }, (_, i) => {
		const sparkle = document.createElement("span");
		sparkle.className = "sparkle";
		sparkle.style.backgroundColor = colors[i % colors.length]!;
		document.body.append(sparkle);
		return sparkle;
	});
	let next = 0;
	let queued = false;
	let x = 0;
	let y = 0;
	window.addEventListener("pointermove", event => {
		x = event.clientX;
		y = event.clientY;
		if (queued) return;
		queued = true;
		requestAnimationFrame(() => {
			queued = false;
			const sparkle = sparkles[next++ % sparkles.length]!;
			const from = `translate(${x + 8}px, ${y + 8}px)`;
			sparkle.animate([{ transform: `${from} scale(1)`, opacity: 1 }, { transform: `${from} translateY(24px) scale(0)`, opacity: 0 }], 700);
		});
	});
}

window.addEventListener("contextmenu", event => {
	if (!(event.target instanceof HTMLImageElement)) return;
	event.preventDefault();
	alert("Right-click is DISABLED!!! Don't steal my GIFs >:(\n\n(c) Pokéstore 2000 - All GIFs are property of the webmaster");
});

const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
let progress = 0;
window.addEventListener("keydown", event => {
	const key = event.key.toLowerCase();
	progress = key === konami[progress] ? progress + 1 : Number(key === konami[0]);
	if (progress < konami.length) return;
	progress = 0;
	if (document.documentElement.classList.toggle("missingno")) {
		const card = cart.glitch();
		alert(`A wild MISSINGNO. appeared!${card ? `\n\nYour ${card} card was multiplied x128!` : ""}\n\n(Enter the code again to escape)`);
	}
});

const winner = document.querySelector<HTMLDialogElement>("#winner");
if (winner && !remember(sessionStorage, "winner")) {
	setTimeout(() => winner.showModal(), 4000);
	winner.addEventListener("close", () => {
		if (winner.returnValue === "claim") alert("To receive your FREE Master Ball, please mail $9.99 shipping & handling to:\n\nPokéstore 2000\nP.O. Box 151\nColumbus, OH 43215\n\nAllow 6-8 weeks for delivery.");
	});
}
