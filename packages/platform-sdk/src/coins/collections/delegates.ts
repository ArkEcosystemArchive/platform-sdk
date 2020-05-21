import { DelegateData } from "../../contracts";

export class DelegateDataCollection {
	readonly #delegates: DelegateData[];

	public constructor(delegates: DelegateData[]) {
		this.#delegates = delegates;
	}

	public all(): DelegateData[] {
		return this.#delegates;
	}

	public findByAddress(address: string): DelegateData | undefined {
		return this.find("address", address);
	}

	public findByPublicKey(publicKey: string): DelegateData | undefined {
		return this.find("publicKey", publicKey);
	}

	public findByUsername(username: string): DelegateData | undefined {
		return this.find("username", username);
	}

	private find(key: string, value: string): DelegateData | undefined {
		return this.#delegates.find((delegate: DelegateData) => delegate[key]() === value);
	}
}
