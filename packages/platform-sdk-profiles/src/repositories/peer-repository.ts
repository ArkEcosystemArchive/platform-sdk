import { Profile } from "../profiles/profile";
import { DataRepository } from "./data-repository";

interface Peer {
	name: string;
	host: string;
	isMultiSignature: boolean;
}

export class PeerRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	public fill(peers: object): void {
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

	public get(coin: string, network: string): Peer[] {
		const id = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		return this.#data.get(id) as Peer[];
	}

	public create(coin: string, network: string, peer: Peer): void {
		const key = `${coin}.${network}`;
		const value: Peer[] = this.#data.get<Peer[]>(key) || [];

		value.push(peer);

		this.#data.set(key, value);
	}

	public has(coin: string, network: string): boolean {
		return this.#data.has(`${coin}.${network}`);
	}

	public forget(coin: string, network: string, peer: Peer): void {
		const index: number = this.get(coin, network).findIndex((item: Peer) => item.host === peer.host);
		const id = `${coin}.${network}.${index}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peer found for [${id}].`);
		}

		this.#data.forget(id);

		// If the list is empty we want to completely remove it.
		if ((this.#data.get<Peer[]>(`${coin}.${network}`) || []).filter(Boolean).length <= 0) {
			this.#data.forget(`${coin}.${network}`);
		}
	}

	public toObject(): Record<string, Peer> {
		return this.all();
	}

	// Helpers to get peers of specific types for a coin and network.

	public getRelay(coin: string, network: string): Peer | undefined {
		return this.get(coin, network).find((peer: Peer) => peer.isMultiSignature === false);
	}

	public getMultiSignature(coin: string, network: string): Peer | undefined {
		return this.get(coin, network).find((peer: Peer) => peer.isMultiSignature === true);
	}
}
