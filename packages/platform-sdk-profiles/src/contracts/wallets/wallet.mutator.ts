import { Contracts } from "@arkecosystem/platform-sdk";

/**
 * Defines the implementation contract for the wallet mutator.
 *
 * @export
 * @interface IWalletMutator
 */
export interface IWalletMutator {
	/**
	 * Set the coin and network that should be communicated with.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {{ sync: boolean }} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	coin(coin: string, network: string, options?: { sync: boolean }): Promise<void>;

	/**
	 * Set the identity based on a mnemonic.
	 *
	 * @param {string} mnemonic
	 * @param {Services.IdentityOptions} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	identity(mnemonic: string, options?: Services.IdentityOptions): Promise<void>;

	/**
	 * Set the address and optionally synchronise the wallet.
	 *
	 * @param {string} address
	 * @param {{ syncIdentity: boolean; validate: boolean }} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	address(
		address: Partial<Services.AddressDataTransferObject>,
		options?: { syncIdentity: boolean; validate: boolean },
	): Promise<void>;

	/**
	 * Set the extended public key and optionally synchronise the wallet.
	 *
	 * @param {string} publicKey
	 * @param {{ syncIdentity: boolean; validate: boolean }} [options]
	 * @return {Promise<void>}
	 * @memberof void
	 */
	extendedPublicKey(publicKey: string, options?: { syncIdentity: boolean; validate: boolean }): Promise<void>;

	/**
	 * Set the avatar.
	 *
	 * @param {string} value
	 * @return {void}
	 * @memberof void
	 */
	avatar(value: string): void;

	/**
	 * Set the alias.
	 *
	 * @param {string} alias
	 * @return {void}
	 * @memberof void
	 */
	alias(alias: string): void;
}
