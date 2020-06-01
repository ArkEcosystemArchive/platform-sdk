import { createHash } from "crypto";
import MersenneTwister from "mersenne-twister";

export class Avatar {
	readonly #seed: string;
	readonly #colors: string[] = [
		"#742A2A",
		"#9B2C2C",
		"#E53E3E",
		"#F56565",
		"#FC8181",
		"#FEB2B2",
		"#C05621",
		"#DD6B20",
		"#ED8936",
		"#F6AD55",
		"#FBD38D",
		"#2C7A7B",
		"#319795",
		"#38B2AC",
		"#4FD1C5",
		"#4C51BF",
		"#5A67D8",
		"#667EEA",
		"#7F9CF5",
	];

	private constructor(seed: string) {
		this.#seed = seed;
	}

	public static make(seed: string): string {
		return new Avatar(seed).generate();
	}

	public generate(): string {
		const gradients: string[] = [];
		const shapesLength = 5;

		const seed = this.valueToSeed();
		const generator = new MersenneTwister(seed);

		for (let index = 0; index < shapesLength; index++) {
			const { angle, x, y } = this.calculateRandomPoints(generator);
			const color = this.getRandomColor(generator);
			gradients.push(
				`conic-gradient(
						from ${angle * 100}deg at ${x * 100}% ${y * 100}%,
						${color},
						calc(${index} * 100% / ${shapesLength}),
						transparent 0
					)`,
			);
		}

		return gradients.join(",");
	}

	private getRandomColor(generator: any): string {
		return this.#colors[Math.floor(this.#colors.length * generator.random())];
	}

	private calculateRandomPoints(generator: any) {
		const random = generator.random();
		const random2 = generator.random();

		const angle = Math.PI * 2 * random;
		const x = Math.abs(Math.sqrt(random2) * Math.cos(angle));
		const y = Math.abs(Math.sqrt(random2) * Math.sin(angle));

		return { angle, x, y };
	}

	private valueToSeed(): number {
		const hash = createHash("sha1")
			.update(Buffer.from(this.#seed, "utf-8"))
			.digest("latin1");

		// Change hash into a 32 bit int for our seed
		return (hash.charCodeAt(0) << 24) | (hash.charCodeAt(1) << 16) | (hash.charCodeAt(2) << 8) | hash.charCodeAt(3);
	}
}
