import { get } from "dot-prop";

export class Guard {
	readonly #abilities: object;

	public constructor(abilities: object) {
		this.#abilities = abilities;
	}

	public allows(ability: string): boolean {
		return get(this.#abilities, ability) === true;
	}

	public denies(ability: string): boolean {
		return !this.allows(ability);
	}

	public check(ability: string): void {
		if (this.denies(ability)) {
			throw new Error(`The [${ability}] ability is not supported.`);
		}
	}
}
