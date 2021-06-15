import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "./helpers/queue";
import { ReadOnlyWallet } from "./read-only-wallet";
import { IDataRepository, IDelegateService, IProfile, IReadOnlyWallet, IReadWriteWallet } from "./contracts";
import { injectable } from "inversify";
import { DataRepository } from "./data.repository";
import { IDelegateSyncer, ParallelDelegateSyncer, SerialDelegateSyncer } from "./delegate-syncer.service";

@injectable()
export class DelegateService implements IDelegateService {
	readonly #dataRepository: IDataRepository = new DataRepository();

	/** {@inheritDoc IDelegateService.all} */
	public all(coin: string, network: string): IReadOnlyWallet[] {
		const result: any[] | undefined = this.#dataRepository.get(`${coin}.${network}.delegates`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}] have not been synchronized yet. Please call [syncDelegates] before using this method.`,
			);
		}

		return result.map((delegate) => this.#mapDelegate(delegate));
	}

	/** {@inheritDoc IDelegateService.findByAddress} */
	public findByAddress(coin: string, network: string, address: string): IReadOnlyWallet {
		return this.#findDelegateByAttribute(coin, network, "address", address);
	}

	/** {@inheritDoc IDelegateService.findByPublicKey} */
	public findByPublicKey(coin: string, network: string, publicKey: string): IReadOnlyWallet {
		return this.#findDelegateByAttribute(coin, network, "publicKey", publicKey);
	}

	/** {@inheritDoc IDelegateService.findByUsername} */
	public findByUsername(coin: string, network: string, username: string): IReadOnlyWallet {
		return this.#findDelegateByAttribute(coin, network, "username", username);
	}

	/** {@inheritDoc IDelegateService.sync} */
	public async sync(profile: IProfile, coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = profile.coins().set(coin, network);

		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		// TODO injection here based on coin config would be awesome
		const syncer: IDelegateSyncer = instance.network().meta().fastDelegateSync
			? new ParallelDelegateSyncer(instance.client())
			: new SerialDelegateSyncer(instance.client());

		let result: Contracts.WalletData[] = await syncer.sync();

		this.#dataRepository.set(
			`${coin}.${network}.delegates`,
			result.map((delegate: Contracts.WalletData) => ({
				...delegate.toObject(),
				explorerLink: instance.link().wallet(delegate.address()),
			})),
		);
	}

	/** {@inheritDoc IDelegateService.syncAll} */
	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile, coin, network));
			}
		}

		await pqueueSettled(promises);
	}

	/** {@inheritDoc IDelegateService.map} */
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

	#findDelegateByAttribute(coin: string, network: string, key: string, value: string): IReadOnlyWallet {
		const result = this.all(coin, network).find((delegate) => delegate[key]() === value);

		if (result === undefined) {
			throw new Error(`No delegate for ${key} with ${value} could be found.`);
		}

		return result;
	}

	#mapDelegate(delegate: Record<string, any>): IReadOnlyWallet {
		return new ReadOnlyWallet({
			address: delegate.address,
			publicKey: delegate.publicKey,
			username: delegate.username,
			rank: delegate.rank as unknown as number,
			explorerLink: delegate.explorerLink,
			isDelegate: delegate.isDelegate,
			isResignedDelegate: delegate.isResignedDelegate,
		});
	}
}
