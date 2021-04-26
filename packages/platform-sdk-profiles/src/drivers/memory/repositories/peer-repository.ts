import { injectable } from "inversify";

import { IPeer, IPeerRepository, IProfile } from "../../../contracts";
import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class PeerRepository implements IPeerRepository {
	readonly #data: DataRepository = new DataRepository();

	/** {@inheritDoc IPeerRepository.fill} */
	public fill(peers: object): void {
		for (const [id, peer] of Object.entries(peers)) {
			this.#data.set(id, peer);
		}
	}

	/** {@inheritDoc IPeerRepository.all} */
	public all(): Record<string, IPeer> {
		return this.#data.all() as Record<string, IPeer>;
	}

	/** {@inheritDoc IPeerRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IPeerRepository.values} */
	public values(): IProfile[] {
		return this.#data.values();
	}

	/** {@inheritDoc IPeerRepository.get} */
	public get(coin: string, network: string): IPeer[] {
		const id = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peers found for [${id}].`);
		}

		return this.#data.get(id) as IPeer[];
	}

	/** {@inheritDoc IPeerRepository.create} */
	public create(coin: string, network: string, peer: IPeer): void {
		const key = `${coin}.${network}`;
		const value: IPeer[] = this.#data.get<IPeer[]>(key) || [];

		value.push(peer);

		this.#data.set(key, value);

		emitProfileChanged();
	}

	/** {@inheritDoc IPeerRepository.has} */
	public has(coin: string, network: string): boolean {
		return this.#data.has(`${coin}.${network}`);
	}

	/** {@inheritDoc IPeerRepository.update} */
	public update(coin: string, network: string, host: string, peer: IPeer): void {
		const index: number = this.get(coin, network).findIndex((item: IPeer) => item.host === host);

		if (index === -1) {
			throw new Error(`Failed to find a peer with [${host}] as host.`);
		}

		this.#data.set(`${coin}.${network}.${index}`, peer);

		emitProfileChanged();
	}

	/** {@inheritDoc IPeerRepository.forget} */
	public forget(coin: string, network: string, peer: IPeer): void {
		const index: number = this.get(coin, network).findIndex((item: IPeer) => item.host === peer.host);

		if (index === -1) {
			throw new Error(`Failed to find a peer with [${peer.host}] as host.`);
		}

		this.#data.forgetIndex(`${coin}.${network}`, index);

		// If the list is empty we want to completely remove it.
		/* istanbul ignore next */
		if ((this.#data.get<IPeer[]>(`${coin}.${network}`) || []).filter(Boolean).length <= 0) {
			this.#data.forget(`${coin}.${network}`);
		}

		emitProfileChanged();
	}

	/** {@inheritDoc IPeerRepository.toObject} */
	public toObject(): Record<string, IPeer> {
		return this.all();
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getRelay} */
	public getRelay(coin: string, network: string): IPeer | undefined {
		return this.get(coin, network).find((peer: IPeer) => peer.isMultiSignature === false);
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getRelays} */
	public getRelays(coin: string, network: string): IPeer[] {
		return this.get(coin, network).filter((peer: IPeer) => peer.isMultiSignature === false);
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getMultiSignature} */
	public getMultiSignature(coin: string, network: string): IPeer | undefined {
		return this.get(coin, network).find((peer: IPeer) => peer.isMultiSignature === true);
	}
}
