import { Avatar } from "../../../helpers/avatar";
import { IReadWriteWallet, WalletSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
import { Coins } from "@arkecosystem/platform-sdk";
import { emitProfileChanged } from "../helpers";

export class WalletMutator implements IWalletMutator {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async coin(
		coin: string,
		network: string,
		options: { sync: boolean } = { sync: true },
	): Promise<void> {
		if (State.profile().usesCustomPeer() && State.profile().peers().has(coin, network)) {
			this.#wallet.getAttributes().set('coin', State.profile().coins().push(
				coin,
				network,
				{
					peer: State.profile().peers().getRelay(coin, network)?.host,
					peerMultiSignature: State.profile().peers().getMultiSignature(coin, network)?.host,
				},
				true,
			));
		} else {
			this.#wallet.getAttributes().set('coin', State.profile().coins().push(coin, network));
		}

		/**
		 * If we fail to construct the coin it means we are having networking
		 * issues or there is a bug in the coin package. This could also mean
		 * bad error handling inside the coin package which needs fixing asap.
		 */
		try {
			if (!this.#wallet.getAttributes().get<Coins.Coin>('coin').hasBeenSynchronized()) {
				if (options.sync) {
					await this.#wallet.getAttributes().get<Coins.Coin>('coin').__construct();

					this.#wallet.markAsFullyRestored();
				} else {
					this.#wallet.markAsPartiallyRestored();
				}
			} else {
				this.#wallet.markAsFullyRestored();
			}
		} catch {
			this.#wallet.markAsPartiallyRestored();
		}

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async identity(mnemonic: string): Promise<void> {
		this.#wallet.getAttributes().set('address', await this.#wallet.getAttributes().get<Coins.Coin>('coin').identity().address().fromMnemonic(mnemonic));
		this.#wallet.getAttributes().set('publicKey', await this.#wallet.getAttributes().get<Coins.Coin>('coin').identity().publicKey().fromMnemonic(mnemonic));

		return this.address(this.#wallet.getAttributes().get<string>('address'));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async address(
		address: string,
		options: { syncIdentity: boolean; validate: boolean } = { syncIdentity: true, validate: true },
	): Promise<void> {
		if (options.validate) {
			const isValidAddress: boolean = await this.#wallet.coin().identity().address().validate(address);

			if (!isValidAddress) {
				throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
			}
		}

		this.#wallet.getAttributes().set('address', address);

		if (options.syncIdentity) {
			await this.#wallet.synchroniser().identity();
		}

		this.avatar(Avatar.make(this.#wallet.address()));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public avatar(value: string): void {
		this.#wallet.getAttributes().set('avatar', value);

		this.#wallet.settings().set(WalletSetting.Avatar, value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public alias(alias: string): void {
		this.#wallet.settings().set(WalletSetting.Alias, alias);
	}
}
