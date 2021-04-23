import { injectable } from "inversify";

import { IPeer, IPeerRepository, IProfile } from "../../../contracts";
import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class PeerRepository implements IPeerRepository {
	readonly #data: DataRepository = new DataRepository();

	/** {@inheritDoc IWalletFactory.generate} */
	public fill(peers: object): void {
		for (const [id, peer] of Object.entries(peers)) {
			this.#data.set(id, peer);
		}
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): Record<string, IPeer> {
		return this.#data.all() as Record<string, IPeer>;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public values(): IProfile[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public get(coin: string, network: string): IPeer[] {
		const id = `${coin}.${network}`;

		if (this.#data.missing(id)) {
			throw new Error(`No peers found for [${id}].`);
		}

		return this.#data.get(id) as IPeer[];
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public create(coin: string, network: string, peer: IPeer): void {
		const key = `${coin}.${network}`;
		const value: IPeer[] = this.#data.get<IPeer[]>(key) || [];

		value.push(peer);

		this.#data.set(key, value);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public has(coin: string, network: string): boolean {
		return this.#data.has(`${coin}.${network}`);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public update(coin: string, network: string, host: string, peer: IPeer): void {
		const index: number = this.get(coin, network).findIndex((item: IPeer) => item.host === host);

		if (index === -1) {
			throw new Error(`Failed to find a peer with [${host}] as host.`);
		}

		this.#data.set(`${coin}.${network}.${index}`, peer);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
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

	/** {@inheritDoc IWalletFactory.generate} */
	public toObject(): Record<string, IPeer> {
		return this.all();
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IWalletFactory.generate} */
	public getRelay(coin: string, network: string): IPeer | undefined {
		return this.get(coin, network).find((peer: IPeer) => peer.isMultiSignature === false);
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IWalletFactory.generate} */
	public getRelays(coin: string, network: string): IPeer[] {
		return this.get(coin, network).filter((peer: IPeer) => peer.isMultiSignature === false);
	}

	// @TODO: organise order of method in this class
	/** {@inheritDoc IWalletFactory.generate} */
	public getMultiSignature(coin: string, network: string): IPeer | undefined {
		return this.get(coin, network).find((peer: IPeer) => peer.isMultiSignature === true);
	}
}
