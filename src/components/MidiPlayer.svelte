<script lang="ts">
	/**
	 * Fake "background MIDI" synthesized with WebAudio, so there is no audio file to download. The tune is an original composition.
	 * The song is written like a tracker module: chords per bar drive the generated bass, pad and arpeggios, the lead is written by hand,
	 * and drums are 16-step patterns. Everything compiles once into a flat event list that a lookahead scheduler plays in a loop.
	 */
	const step = 0.1;

	type Chord = "C" | "Dm" | "F" | "G" | "Am";
	type Voice = "lead" | "pad" | "arp" | "bass" | "kick" | "snare" | "hat" | "open";

	interface Section {
		name: string;
		/** One chord per bar, "Dm/G" splits the bar in two. */
		chords: string;
		/** One token per eighth note: a pitch starts a note, "." holds the previous one, "_" is silence. */
		lead?: string;
		/** 16 steps per bar: k kick, s snare, h hat, o open hat. The last bar of each section plays a snare fill instead. */
		drums: string;
		bass: "bounce" | "drive" | "hold";
		pad?: boolean;
		arp?: boolean;
	}

	interface Note {
		at: number;
		length: number;
		voice: Voice;
		midi: number;
	}

	const triads: Record<Chord, [number, number, number]> = { C: [0, 4, 7], Dm: [2, 5, 9], F: [5, 9, 0], G: [7, 11, 2], Am: [9, 0, 4] };
	const pitchClasses: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
	const themeA = `
		C5 E5 G5 C6 B5 G5 E5 .   F5 A5 C6 A5 G5 . _ _   E5 G5 C6 E6 D6 C6 A5 .   B5 G5 D5 G5 B5 . _ _
		A5 C6 E6 C6 B5 A5 G5 .   F5 A5 D6 C6 B5 . G5 .  C6 B5 A5 G5 F5 E5 D5 .   C5 . . G4 C5 . _ _`;
	const themeA2 = `
		C6 . G5 E5 C6 . E6 .   F6 E6 C6 A5 G5 . A5 B5   C6 . E6 . D6 C6 A5 .   B5 . D6 . G6 . _ _
		A5 C6 E6 A6 G6 E6 C6 .   D6 F6 A6 F6 G6 . D6 .   E6 D6 C6 B5 A5 G5 F5 D5   C6 . . . G5 . C6 .`;
	const themeB = `
		A5 . . E5 A5 B5 C6 .   C6 . A5 . F5 . A5 .   G5 . E5 . C5 . E5 G5   G5 . . . B5 . D6 .
		E6 . . C6 A5 . E6 .   F6 . E6 . C6 . A5 .   B5 . G5 . D6 . B5 .   D6 . . . . . _ _`;
	const progressionA = "C F Am G Am Dm/G F/G C";
	const song: Section[] = [
		{ name: "Intro", chords: "C F G C", drums: "k.......k.......", bass: "hold", arp: true },
		{ name: "Theme", chords: progressionA, lead: themeA, drums: "k.h.s.h.k.h.s.h.", bass: "bounce" },
		{ name: "Theme II", chords: progressionA, lead: themeA2, drums: "k.hhs.h.k.khs.ho", bass: "bounce", pad: true },
		{ name: "Bridge", chords: "Am F C G Am F G G", lead: themeB, drums: "k.h.s.hkk.h.s.hs", bass: "drive", pad: true, arp: true },
		{ name: "Breakdown", chords: "Am F G G", drums: "k...s...k.k.s...", bass: "hold", arp: true },
		{ name: "Finale", chords: progressionA, lead: themeA2, drums: "k.hhs.h.k.khs.ho", bass: "bounce", pad: true, arp: true },
	];
	const fill = "k.s.s.sss.ssssss";

	function compose(): { notes: Note[]; length: number; starts: number[] } {
		const notes: Note[] = [];
		const starts: number[] = [];
		let start = 0;
		const add = (at: number, length: number, voice: Voice, midi = 0) => notes.push({ at, length, voice, midi });
		for (const section of song) {
			starts.push(start);
			const bars = section.chords.split(" ");
			bars.forEach((bar, index) => {
				const barStart = start + index * 16 * step;
				const halves = bar.split("/") as Chord[];
				for (let half = 0; half < 2; half++) {
					const [root, third, fifth] = triads[halves[half] ?? halves[0]!];
					const at = barStart + half * 8 * step;
					if (section.bass === "hold") add(at, 8 * step, "bass", 36 + root);
					else {
						const line = section.bass === "bounce" ? [36 + root, 48 + root, 36 + root, 48 + root] : [36 + root, 36 + root, 48 + root, 36 + fifth];
						line.forEach((midi, i) => add(at + i * 2 * step, 2 * step, "bass", midi));
					}
					if (section.pad) for (const tone of [third, fifth]) add(at, 8 * step, "pad", 60 + tone);
					if (section.arp) [root, third, fifth, root + 12].concat([root, third, fifth, root + 12]).forEach((tone, i) => add(at + i * step, step, "arp", 72 + tone));
				}
				const drums = index === bars.length - 1 ? fill : section.drums;
				const kit: Record<string, Voice> = { k: "kick", s: "snare", h: "hat", o: "open" };
				[...drums].forEach((hit, i) => kit[hit] && add(barStart + i * step, step, kit[hit]));
			});
			section.lead?.trim().split(/\s+/).forEach((token, i) => {
				const last = notes.findLast(note => note.voice === "lead");
				if (token === ".") {
					if (last) last.length += 2 * step;
				} else if (token !== "_") add(start + i * 2 * step, 2 * step, "lead", pitchClasses[token[0]!]! + (Number(token[1]) + 1) * 12);
			});
			start += bars.length * 16 * step;
		}
		return { notes: notes.sort((a, b) => a.at - b.at), length: start, starts };
	}

	const { notes, length, starts } = compose();
	const duration = `${Math.floor(length / 60)}:${String(Math.round(length % 60)).padStart(2, "0")}`;

	function instruments(audio: AudioContext): Record<Voice, (at: number, length: number, midi: number) => void> {
		const master = new GainNode(audio, { gain: 0.7 });
		master.connect(audio.destination);
		/** A cheap feedback delay on the lead, the "reverb" every General MIDI synth slapped on by default. */
		const echo = new DelayNode(audio, { delayTime: 0.3 });
		const feedback = new GainNode(audio, { gain: 0.3 });
		echo.connect(feedback).connect(echo);
		echo.connect(master);
		const noise = new AudioBuffer({ length: audio.sampleRate, sampleRate: audio.sampleRate });
		noise.getChannelData(0).forEach((_, i, data) => (data[i] = Math.random() * 2 - 1));

		const envelope = (volume: number, at: number, decay: number) => {
			const gain = new GainNode(audio, { gain: 0 });
			gain.gain.setValueAtTime(volume, at);
			gain.gain.exponentialRampToValueAtTime(0.001, at + decay);
			gain.connect(master);
			return gain;
		};
		const tone = (type: OscillatorType, volume: number, at: number, length: number, frequency: number, decay = length) => {
			const gain = envelope(volume, at, decay);
			const oscillator = new OscillatorNode(audio, { type, frequency });
			oscillator.connect(gain);
			oscillator.start(at);
			oscillator.stop(at + length);
			return { gain, oscillator };
		};
		const hiss = (volume: number, at: number, decay: number, frequency: number) => {
			const source = new AudioBufferSourceNode(audio, { buffer: noise });
			source.connect(new BiquadFilterNode(audio, { type: "highpass", frequency })).connect(envelope(volume, at, decay));
			source.start(at, Math.random() * 0.5, decay);
		};
		const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

		return {
			lead: (at, length, midi) => void tone("square", 0.05, at, length, hz(midi), length * 0.95).gain.connect(echo),
			pad: (at, length, midi) => void tone("triangle", 0.06, at, length, hz(midi)),
			arp: (at, length, midi) => void tone("square", 0.015, at, length, hz(midi), 0.09),
			bass: (at, length, midi) => void tone("triangle", 0.22, at, length, hz(midi), length * 0.9),
			kick: at => tone("sine", 0.6, at, 0.15, 150).oscillator.frequency.exponentialRampToValueAtTime(40, at + 0.12),
			snare: at => {
				hiss(0.22, at, 0.13, 1200);
				tone("triangle", 0.12, at, 0.07, 190);
			},
			hat: at => hiss(0.06, at, 0.04, 7000),
			open: at => hiss(0.06, at, 0.18, 6000),
		};
	}

	let context: AudioContext | undefined;
	let timer: ReturnType<typeof setInterval> | undefined;
	let playing = $state(false);
	let section = $state(song[0]!.name);

	/** Browsers only allow audio after a user gesture, so the context is created inside the click handler. */
	function toggle() {
		clearInterval(timer);
		void context?.close();
		context = undefined;
		playing = !playing;
		if (!playing) return;
		const audio = (context = new AudioContext());
		const play = instruments(audio);
		let next = 0;
		let loopStart = audio.currentTime + 0.05;
		/** Notes are queued 1.2 s ahead, enough to survive the 1 s timer throttling of background tabs. */
		const pump = () => {
			const horizon = audio.currentTime + 1.2;
			for (;;) {
				if (next === notes.length) {
					next = 0;
					loopStart += length;
				}
				const note = notes[next]!;
				if (loopStart + note.at > horizon) break;
				play[note.voice](loopStart + note.at, note.length, note.midi);
				next++;
			}
			const position = (audio.currentTime - loopStart + length) % length;
			section = song[starts.findLastIndex(start => start <= position)]?.name ?? section;
		};
		pump();
		timer = setInterval(pump, 200);
	}
</script>

<div class="win mx-auto w-72 text-left">
	<div class="titlebar"><span>Media Player</span><span>_ x</span></div>
	<div class="m-1 overflow-hidden bg-black px-1 font-mono text-xs text-green-400">
		{#if playing}<marquee scrollamount="3">Now playing: pokestore_theme_FINAL_v3.mid ({duration}) - [{section}] - 22 kHz MIDI SOUND!!</marquee>{:else}Stopped - pokestore_theme_FINAL_v3.mid ({duration}){/if}
	</div>
	<div class="flex items-end gap-1 px-1">
		<button class="btn px-2 py-0 text-xs" onclick={toggle}>{playing ? "Stop" : "Play"}</button>
		<div class="flex h-5 flex-1 items-end gap-px bg-black p-px" aria-hidden="true">
			{#each [0.45, 0.3, 0.6, 0.35, 0.5, 0.25, 0.55, 0.4] as speed}
				<span class={["eq w-full bg-linear-to-t from-green-500 to-yellow-300", playing && "playing"]} style:animation-duration="{speed}s"></span>
			{/each}
		</div>
	</div>
</div>

<style>
	.eq {
		height: 15%;
	}

	.eq.playing {
		animation: bounce ease-in-out infinite alternate;
	}

	@keyframes bounce {
		from { height: 15%; }
		to { height: 100%; }
	}
</style>
