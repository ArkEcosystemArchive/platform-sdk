import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../helpers/queue";
import { DataRepository } from "../../repositories/data-repository";
import { ReadOnlyWallet } from "../../wallets/read-only-wallet";
import { container } from "../container";
import { makeCoin } from "../container.helpers";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";

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

		const result: Contracts.WalletData[] = [];
		let hasMore = true;
		let lastResponse: Coins.WalletDataCollection | undefined = undefined;

		while (hasMore) {
			if (lastResponse && lastResponse.hasMorePages()) {
				lastResponse = await instance.client().delegates({ cursor: lastResponse.nextPage() });
			} else {
				lastResponse = await instance.client().delegates();
			}

			hasMore = lastResponse.hasMorePages();

			for (const item of lastResponse.items()) {
				result.push(item);
			}
		}

		this.#dataRepository.set(
			instanceKey,
			result.map((delegate: Contracts.WalletData) => delegate.toObject()),
		);
	}

	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of container.get<CoinService>(Identifiers.CoinService).entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(coin, network));
			}
		}

		await pqueueSettled(promises);
	}

	private findDelegateByAttribute(coin: string, network: string, key: string, value: string): ReadOnlyWallet {
		const result: any = this.all(coin, network).find((delegate) => delegate[key]() === value);

		if (result === undefined) {
			throw new Error(`No delegate for ${key} with ${value} could be found.`);
		}

		return result;
	}

	private mapDelegate(delegate: Record<string, string>): ReadOnlyWallet {
		return new ReadOnlyWallet({
			address: delegate["address"]!,
			publicKey: delegate["publicKey"],
			username: delegate["username"],
			rank: (delegate["rank"] as unknown) as number,
			explorerLink: "",
		});
	}
}
