import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerData implements Contracts.PeerData {
	readonly #data: Contracts.KeyValuePair;

	public constructor (data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getIp(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getIp");
	}

	public getPort(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPort");
	}

	public getVersion(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVersion");
	}

	public getHeight(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getHeight");
	}

	public getLatency(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getLatency");
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
