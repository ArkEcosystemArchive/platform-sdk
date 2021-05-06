import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../../helpers/queue";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { IDataRepository, IDelegateService, IProfile, IReadOnlyWallet, IReadWriteWallet } from "../../../contracts";
import { injectable } from "inversify";
import { DataRepository } from "../../../repositories";
import { IDelegateSyncer, ParallelDelegateSyncer, SerialDelegateSyncer } from "./helpers/delegate-syncer";

@injectable()
export class DelegateService implements IDelegateService {
	readonly #dataRepository: IDataRepository = new DataRepository();


	/** {@inheritDoc IDelegateService.all} */
	public all(coin: Coins.Coin): IReadOnlyWallet[] {
		const result: any[] | undefined = this.#dataRepository.get(coin.uuid());

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin.uuid()}] have not been synchronized yet. Please call [syncDelegates] before using this method.`
			);
		}

		return result.map((delegate) => this.mapDelegate(delegate));
	}

	/** {@inheritDoc IDelegateService.findByAddress} */
	public findByAddress(coin: Coins.Coin, address: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, "address", address);
	}

	/** {@inheritDoc IDelegateService.findByPublicKey} */
	public findByPublicKey(coin: Coins.Coin, publicKey: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, "publicKey", publicKey);
	}

	/** {@inheritDoc IDelegateService.findByUsername} */
	public findByUsername(coin: Coins.Coin, username: string): IReadOnlyWallet {
		return this.findDelegateByAttribute(coin, "username", username);
	}

	/** {@inheritDoc IDelegateService.sync} */
	public async sync(coin: Coins.Coin): Promise<void> {
		// TODO injection here based on coin config would be awesome
		const syncer: IDelegateSyncer = coin.network().allows(Coins.FeatureFlag.InternalFastDelegateSync)
			? new ParallelDelegateSyncer(coin.client())
			: new SerialDelegateSyncer(coin.client());

		let result: Contracts.WalletData[] = await syncer.sync();

		this.#dataRepository.set(
			coin.uuid(),
			result.map((delegate: Contracts.WalletData) => delegate.toObject())
		);
	}

	/** {@inheritDoc IDelegateService.syncAll} */
	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile.coins().get(coin, network)));
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
					const delegate = this.findByPublicKey(wallet.coin(), publicKey);

					return new ReadOnlyWallet({
						address: delegate.address(),
						publicKey: delegate.publicKey(),
						username: delegate.username(),
						rank: delegate.rank(),
						explorerLink: wallet.link().wallet(delegate.address()),
						isDelegate: delegate.isDelegate(),
						isResignedDelegate: delegate.isResignedDelegate()
					});
				} catch {
					return undefined;
				}
			})
			.filter(Boolean) as IReadOnlyWallet[];
	}

	private findDelegateByAttribute(coin: Coins.Coin, key: string, value: string): IReadOnlyWallet {
		const result: any = this.all(coin).find((delegate) => delegate[key]() === value);

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
			isResignedDelegate: delegate.isResignedDelegate
		});
	}
}
