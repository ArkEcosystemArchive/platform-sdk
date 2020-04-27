import { KeyValuePair } from "../../../types";
import { Peer as Contract } from "../../contracts/client";

export class Peer implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getIp(): string {
		return this.#data.ip;
	}

	public getPort(): number {
		return this.#data.port;
	}

	public getVersion(): string {
		return this.#data.version;
	}

	public getHeight(): number {
		return this.#data.height;
	}

	public getLatency(): number {
		return this.#data.latency;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
