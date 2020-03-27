import { KeyValuePair } from "../../../types";
import { Peer as Contract } from "../../contracts/client";

export class Peer implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		return this.#data.ip;
	}

	public getPort(): number {
		return this.#data.port;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
