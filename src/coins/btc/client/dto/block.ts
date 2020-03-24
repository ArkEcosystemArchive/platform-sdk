import { Block as Contract, Dictionary } from "../../../contracts/client";

export class Block implements Contract {
	readonly #data: Dictionary;

	public constructor(data: Dictionary) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.id;
	}

	public getHeight(): string {
		return this.#data.height;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Dictionary {
		return this.#data;
	}
}
