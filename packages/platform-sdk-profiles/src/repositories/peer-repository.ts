import { Profile } from "../profiles/profile";
import { DataRepository } from "./data-repository";

export class PeerRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	public async fill(peers: object): Promise<void> {
		for (const [id, peer] of Object.entries(peers)) {
			this.#data.set(id, peer);
		}
	}

	public all(): Record<string, any> {
		return this.#data.all() as Record<string, any>;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Profile[] {
		return this.#data.values();
	}

	public get(coin: string, network: string): Profile {
		const id = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		return this.#data.get(id) as Profile;
	}

	public set(coin: string, network: string, peer: string): void {
		this.#data.set(`${coin}.${network}`, peer);
	}

	public has(coin: string, network: string): boolean {
		return this.#data.has(`${coin}.${network}`);
	}

	public forget(coin: string, network: string): void {
		const id = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		this.#data.forget(id);
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, peer] of Object.entries(this.#data.all())) {
			result[id] = peer.toObject();
		}

		return result;
	}
}
