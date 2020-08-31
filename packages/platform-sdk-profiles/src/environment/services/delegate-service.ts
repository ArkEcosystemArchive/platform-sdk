import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../../repositories/data-repository";
import { ReadOnlyWallet } from "../../wallets/read-only-wallet";
import { makeCoin } from "../container.helpers";

export class DelegateService {
	readonly #dataRepository: DataRepository = new DataRepository();

	public all(coin: string, network: string): ReadOnlyWallet[] {
		const result: any[] | undefined = this.#dataRepository.get(`${coin}.${network}.delegates`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}] have not been synchronized yet. Please call [syncDelegates] before using this method.`,
			);
		}

		return result.map((delegate) => this.mapDelegate(delegate));
	}

	public findByAddress(coin: string, network: string, address: string): ReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "address", address);
	}

	public findByPublicKey(coin: string, network: string, publicKey: string): ReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "publicKey", publicKey);
	}

	public findByUsername(coin: string, network: string, username: string): ReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "username", username);
	}

	public async sync(coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = await makeCoin(coin, network);
		const instanceKey = `${coin}.${network}.delegates`;

		let result: Contracts.WalletData[] = [];
		let hasMore = true;
		// TODO: use the nextPage() method as cursor like aggregates
		let cursor = 1;

		while (hasMore) {
			const response = await instance.client().delegates({ cursor });

			result = result.concat(response.items());

			hasMore = response.hasMorePages();

			cursor++;
		}

		this.#dataRepository.set(
			instanceKey,
			result.map((delegate: Contracts.WalletData) => delegate.toObject()),
		);
	}

	public async syncAll(coins: Record<string, string[]>): Promise<void> {
		const promises: Promise<void>[] = [];

		for (const [coin, networks] of Object.entries(coins)) {
			for (const network of networks) {
				promises.push(this.sync(coin, network));
			}
		}

		await Promise.allSettled(promises);
	}

	private findDelegateByAttribute(coin: string, network: string, key: string, value: string): ReadOnlyWallet {
		const result: any = this.all(coin, network).find((delegate) => (delegate[key] = value));

		if (result === undefined) {
			throw new Error(`No delegate for ${key} with ${value} could be found.`);
		}

		return this.mapDelegate(result);
	}

	private mapDelegate(delegate: Record<string, string>): ReadOnlyWallet {
		return new ReadOnlyWallet({
			address: delegate.address,
			publicKey: delegate.publicKey,
			username: delegate.username,
			rank: (delegate.rank as unknown) as number,
			explorerLink: "",
		});
	}
}
