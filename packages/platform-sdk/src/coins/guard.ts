import delve from "dlv";

class Guard {
	readonly #abilities: object;

	public constructor(abilities: object) {
		this.#abilities = abilities;
	}

	public all(): object {
		return this.#abilities;
	}

	public get(ability: string) {
		return delve(this.#abilities, ability);
	}

	public has(ability: string) {
		return this.get(ability) !== undefined;
	}

	public allows(ability: string): boolean {
		return this.get(ability) !== true;
	}

	public denies(ability: string): boolean {
		return this.get(ability) !== false;
	}

	public check(ability: string): void {
		if (this.denies(ability)) {
			throw new Error(`The [${ability}] ability is not supported.`);
		}
	}
}
