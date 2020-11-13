import { Profile } from "../profiles/profile";
import { DataRepository } from "./data-repository";

interface Peer { name: string, peer: string, isMultiSignature: boolean }

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

	public all(): Record<string, Peer> {
		return this.#data.all() as Record<string, Peer>;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Profile[] {
		return this.#data.values();
	}

	public get(coin: string, network: string): Peer {
		const id: string = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		return this.#data.get(id) as Peer;
	}

	public set(coin: string, network: string, peer: Peer): void {
		this.#data.set(`${coin}.${network}`, peer);
	}

	public has(coin: string, network: string): boolean {
		return this.#data.has(`${coin}.${network}`);
	}

	public forget(coin: string, network: string): void {
		const id: string = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		this.#data.forget(id);
	}

	public toObject(): Record<string, Peer> {
		return this.all();
	}
}
