import { Contracts } from "@arkecosystem/platform-sdk";

export class PeerData implements Contracts.PeerData {
	readonly #data: Contracts.KeyValuePair;

	public constructor (data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getIp(): string {
		return this.#data.ip;
	}

	public getPort(): number {
		return this.#data.wsPort;
	}

	public getVersion(): string {
		return this.#data.version;
	}

	public getHeight(): number {
		return this.#data.height;
	}

	public getLatency(): number {
		return -1;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
