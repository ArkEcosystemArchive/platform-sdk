import { Avatar } from "../../../helpers/avatar";
import { IReadWriteWallet, WalletSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";

export class WalletMutator implements IWalletMutator {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	public async coin(
		coin: string,
		network: string,
		options: { sync: boolean } = { sync: true },
	): Promise<void> {
		if (this.usesCustomPeer() && this.peers().has(coin, network)) {
			this.#coin = State.profile().coins().push(
				coin,
				network,
				{
					peer: this.peers().getRelay(coin, network)?.host,
					peerMultiSignature: this.peers().getMultiSignature(coin, network)?.host,
				},
				true,
			);
		} else {
			this.#coin = State.profile().coins().push(coin, network);
		}

		/**
		 * If we fail to construct the coin it means we are having networking
		 * issues or there is a bug in the coin package. This could also mean
		 * bad error handling inside the coin package which needs fixing asap.
		 */
		try {
			if (!this.#coin.hasBeenSynchronized()) {
				if (options.sync) {
					await this.#coin.__construct();

					this.markAsFullyRestored();
				} else {
					this.markAsPartiallyRestored();
				}
			} else {
				this.markAsFullyRestored();
			}
		} catch {
			this.markAsPartiallyRestored();
		}
	}

	public async identity(mnemonic: string): Promise<void> {
		this.#address = await this.#coin.identity().address().fromMnemonic(mnemonic);
		this.#publicKey = await this.#coin.identity().publicKey().fromMnemonic(mnemonic);

		return this.setAddress(this.#address);
	}

	public async address(
		address: string,
		options: { syncIdentity: boolean; validate: boolean } = { syncIdentity: true, validate: true },
	): Promise<void> {
		if (options.validate) {
			const isValidAddress: boolean = await this.coin().identity().address().validate(address);

			if (!isValidAddress) {
				throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
			}
		}

		this.#address = address;

		if (options.syncIdentity) {
			await this.syncIdentity();
		}

		this.setAvatar(Avatar.make(this.address()));
	}

	public avatar(value: string): void {
		this.#avatar = value;

		this.settings().set(WalletSetting.Avatar, value);
	}

	public alias(alias: string): void {
		this.settings().set(WalletSetting.Alias, alias);
	}
}
