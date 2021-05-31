import { Avatar } from "../../../helpers/avatar";
import { IProfile, IReadWriteWallet, WalletData, WalletSetting } from "../../../contracts";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class WalletMutator implements IWalletMutator {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletMutator.coin} */
	public async coin(coin: string, network: string, options: { sync: boolean } = { sync: true }): Promise<void> {
		try {
			const instance = this.#wallet.profile().coins().set(coin, network);

			this.#wallet.getAttributes().set("coin", instance);

			/**
			 * If we fail to construct the coin it means we are having networking
			 * issues or there is a bug in the coin package. This could also mean
			 * bad error handling inside the coin package which needs fixing asap.
			 */
			if (instance.hasBeenSynchronized()) {
				this.#wallet.markAsFullyRestored();
			} else {
				if (options.sync) {
					await instance.__construct();

					this.#wallet.markAsFullyRestored();
				} else {
					this.#wallet.markAsPartiallyRestored();
				}
			}

			this.#wallet.profile().status().markAsDirty();
		} catch {
			this.#wallet.markAsPartiallyRestored();
		}
	}

	/** {@inheritDoc IWalletMutator.identity} */
	public async identity(mnemonic: string, options?: Contracts.IdentityOptions): Promise<void> {
		const { type, address, path } = await this.#wallet.coin().identity().address().fromMnemonic(mnemonic, options);

		if (type) {
			this.#wallet.data().set(WalletData.DerivationType, type);
		}

		if (path) {
			this.#wallet.data().set(WalletData.DerivationPath, path);
		}

		this.#wallet.getAttributes().set("address", address);

		this.#wallet
			.getAttributes()
			.set(
				"publicKey",
				(await this.#wallet.coin().identity().publicKey().fromMnemonic(mnemonic, options)).publicKey,
			);

		return this.address({ type, address, path });
	}

	/** {@inheritDoc IWalletMutator.address} */
	public async address(
		{ address, path, type }: Contracts.AddressDataTransferObject,
		options: { syncIdentity: boolean; validate: boolean } = { syncIdentity: true, validate: true },
	): Promise<void> {
		if (options.validate) {
			const isValidAddress: boolean = await this.#wallet.coin().identity().address().validate(address);

			if (!isValidAddress) {
				throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
			}
		}

		if (type) {
			this.#wallet.data().set(WalletData.DerivationType, type);
		}

		if (path) {
			this.#wallet.data().set(WalletData.DerivationPath, path);
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
