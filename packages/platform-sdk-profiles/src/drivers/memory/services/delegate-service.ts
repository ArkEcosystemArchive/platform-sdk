import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { container } from "../../../environment/container";
import { makeCoin } from "../../../environment/container.helpers";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";
import { IDelegateService, IReadOnlyWallet, IReadWriteWallet } from "../../../contracts";
import { injectable } from "inversify";

@injectable()
export class DelegateService implements IDelegateService {
	readonly #dataRepository: DataRepository = new DataRepository();

	public all(coin: string, network: string): IReadOnlyWallet[] {
		const result: any[] | undefined = this.#dataRepository.get(`${coin}.${network}.delegates`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}] have not been synchronized yet. Please call [syncDelegates] before using this method.`,
			);
		}

		return result.map((delegate) => this.mapDelegate(delegate));
	}

	public findByAddress(coin: string, network: string, address: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "address", address);
	}

	public findByPublicKey(coin: string, network: string, publicKey: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "publicKey", publicKey);
	}

	public findByUsername(coin: string, network: string, username: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, network, "username", username);
	}

	public async sync(coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = makeCoin(coin, network);

		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		const instanceCanFastSync: boolean = instance.network().can(Coins.FeatureFlag.InternalFastDelegateSync);

		const result: Contracts.WalletData[] = [];
		let hasMore = true;
		let lastResponse: Coins.WalletDataCollection | undefined = undefined;

		while (hasMore) {
			if (lastResponse) {
				lastResponse = await instance.client().delegates({ cursor: lastResponse.nextPage() });
			} else {
				lastResponse = await instance.client().delegates();
			}

			hasMore = lastResponse.hasMorePages();

			for (const item of lastResponse.items()) {
				result.push(item);
			}

			/**
			 * If we know the specific last page we can execute requests with
			 * `Promise.all` to speed up the process. We'll need to send many
			 * sequential requests for API's where we don't get back any last
			 * page so we won't know when to stop except for not getting data.
			 */
			if (instanceCanFastSync) {
				break;
			}
		}

		/**
		 * If a coin supports fasy sync for delegates we can assume that the
		 * page is numerical which means that we can simply keep incrementing
		 * the page count and send many requests concurrently because we are
		 * not relying on timestamps or hashes for pagination of the data.
		 */
		if (instanceCanFastSync) {
			const currentPage: number = parseInt(lastResponse?.currentPage()! as string);
			const lastPage: number = parseInt(lastResponse?.lastPage()! as string);

			if (lastPage > currentPage) {
				const sendRequest = async (i: number) => {
					const response = await instance.client().delegates({ cursor: i });

					for (const item of response.items()) {
						result.push(item);
					}
				};

				const promises: (() => Promise<void>)[] = [];

				// Skip the first page and start from page 2 up to the last page.
				for (let i = currentPage + 1; i <= lastPage; i++) {
					promises.push(() => sendRequest(i));
				}

				await pqueueSettled(promises);
			}
		}

		this.#dataRepository.set(
			`${coin}.${network}.delegates`,
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

	public map(wallet: IReadWriteWallet, publicKeys: string[]): IReadOnlyWallet[] {
		if (publicKeys.length === 0) {
			return [];
		}

		return publicKeys
			.map((publicKey: string) => {
				try {
					const delegate = this.findByPublicKey(wallet.coinId(), wallet.networkId(), publicKey);

					return new ReadOnlyWallet({
						address: delegate.address(),
						publicKey: delegate.publicKey(),
						username: delegate.username(),
						rank: delegate.rank(),
						explorerLink: wallet.link().wallet(delegate.address()),
						isDelegate: delegate.isDelegate(),
						isResignedDelegate: delegate.isResignedDelegate(),
					});
				} catch {
					return undefined;
				}
			})
			.filter(Boolean) as IReadOnlyWallet[];
	}

	private findDelegateByAttribute(coin: string, network: string, key: string, value: string): IReadOnlyWallet {
		const result: any = this.all(coin, network).find((delegate) => delegate[key]() === value);

		if (result === undefined) {
			throw new Error(`No delegate for ${key} with ${value} could be found.`);
		}

		return result;
	}

	private mapDelegate(delegate: Record<string, any>): IReadOnlyWallet {
		return new ReadOnlyWallet({
			address: delegate.address,
			publicKey: delegate.publicKey,
			username: delegate.username,
			rank: (delegate.rank as unknown) as number,
			explorerLink: "",
			isDelegate: delegate.isDelegate,
			isResignedDelegate: delegate.isResignedDelegate,
		});
	}
}
