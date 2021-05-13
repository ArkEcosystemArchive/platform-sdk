import { Avatar } from "../../../helpers/avatar";
import { IProfile, IReadWriteWallet, WalletSetting } from "../../../contracts";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { emitProfileChanged } from "../helpers";

export class WalletMutator implements IWalletMutator {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletMutator.coin} */
	public async coin(coin: string, network: string, options: { sync: boolean } = { sync: true }): Promise<void> {
		this.#wallet.getAttributes().set("coin", this.#wallet.profile().coins().set(coin, network));

		/**
		 * If we fail to construct the coin it means we are having networking
		 * issues or there is a bug in the coin package. This could also mean
		 * bad error handling inside the coin package which needs fixing asap.
		 */
		try {
			if (this.#wallet.getAttributes().get<Coins.Coin>("coin").hasBeenSynchronized()) {
				this.#wallet.markAsFullyRestored();
			} else {
				if (options.sync) {
					await this.#wallet.getAttributes().get<Coins.Coin>("coin").__construct();

					this.#wallet.markAsFullyRestored();
				} else {
					this.#wallet.markAsPartiallyRestored();
				}
			}
		} catch {
			this.#wallet.markAsPartiallyRestored();
		}

		emitProfileChanged(this.#wallet.profile());
	}

	/** {@inheritDoc IWalletMutator.identity} */
	public async identity(mnemonic: string, options?: Contracts.IdentityOptions): Promise<void> {
		this.#wallet
			.getAttributes()
			.set(
				"address",
				await this.#wallet.coin().identity().address().fromMnemonic(mnemonic, options),
			);

		this.#wallet
			.getAttributes()
			.set(
				"publicKey",
				await this.#wallet
					.coin()
					.identity()
					.publicKey()
					.fromMnemonic(mnemonic, options),
			);

		return this.address(this.#wallet.getAttributes().get<string>("address"));
	}

	/** {@inheritDoc IWalletMutator.address} */
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

		this.#wallet.getAttributes().set("address", address);

		if (options.syncIdentity) {
			await this.#wallet.synchroniser().identity();
		}

		this.avatar(Avatar.make(this.#wallet.address()));
	}

	/** {@inheritDoc IWalletMutator.extendedPublicKey} */
	public async extendedPublicKey(
		publicKey: string,
		options: { syncIdentity: boolean; validate: boolean } = { syncIdentity: true, validate: true },
	): Promise<void> {
		this.#wallet.getAttributes().setMany({ address: publicKey, publicKey });

		if (options.syncIdentity) {
			await this.#wallet.synchroniser().identity();
		}

		this.avatar(Avatar.make(this.#wallet.address()));
	}

	/** {@inheritDoc IWalletMutator.avatar} */
	public avatar(value: string): void {
		this.#wallet.getAttributes().set("avatar", value);

		this.#wallet.settings().set(WalletSetting.Avatar, value);
	}

	/** {@inheritDoc IWalletMutator.alias} */
	public alias(alias: string): void {
		this.#wallet.settings().set(WalletSetting.Alias, alias);
	}
}
