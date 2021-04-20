import { IReadWriteWallet } from "./wallet";

/**
 * Defines the options for an import with a mnemonic.
 *
 * @interface IMnemonicOptions
 */
interface IMnemonicOptions {
	coin: string;
	network: string;
	mnemonic: string;
	useBIP39?: boolean;
	useBIP44?: boolean;
}

/**
 * Defines the options for an import with an address.
 *
 * @interface IAddressOptions
 */
interface IAddressOptions { coin: string; network: string; address: string }

/**
 * Defines the options for an import with a public key.
 *
 * @interface IPublicKeyOptions
 */
interface IPublicKeyOptions { coin: string; network: string; publicKey: string }

/**
 * Defines the options for an import with a private key.
 *
 * @interface IPrivateKeyOptions
 */
interface IPrivateKeyOptions { coin: string; network: string; privateKey: string }

/**
 * Defines the options for an import with a BIP44 path.
 *
 * @interface IAddressWithLedgerPathOptions
 */
interface IAddressWithLedgerPathOptions {
	coin: string;
	network: string;
	address: string;
	path: string;
}

/**
 * Defines the options for an import with a mnemonic and password.
 *
 * @interface IMnemonicWithEncryptionOptions
 */
interface IMnemonicWithEncryptionOptions {
	coin: string;
	network: string;
	mnemonic: string;
	password: string;
}

/**
 * Defines the options for an import with a WIF.
 *
 * @interface IWifOptions
 */
interface IWifOptions { coin: string; network: string; wif: string }

/**
 * Defines the options for an import with a WIF and password.
 *
 * @interface IWifWithEncryptionOptions
 */
interface IWifWithEncryptionOptions {
	coin: string;
	network: string;
	wif: string;
	password: string;
}


/**
 * Defines the implementation contract for the wallet factory.
 *
 * @export
 * @interface IWalletFactory
 */
export interface IWalletFactory {
	/**
	 * Imports a wallet from a mnemonic.
	 *
	 * @param {IMnemonicOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromMnemonic(options: IMnemonicOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from an address.
	 *
	 * @param {IAddressOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromAddress(options: IAddressOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a public key.
	 *
	 * @param {IPublicKeyOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromPublicKey(options: IPublicKeyOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a private key.
	 *
	 * @param {IPrivateKeyOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromPrivateKey(options: IPrivateKeyOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a BIP44 path.
	 *
	 * @param {IAddressWithLedgerPathOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromAddressWithLedgerPath(options: IAddressWithLedgerPathOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a mnemonic with a password.
	 *
	 * @param {IMnemonicWithEncryptionOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromMnemonicWithEncryption(options: IMnemonicWithEncryptionOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a WIF.
	 *
	 * @param {IWifOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromWIF(options: IWifOptions): Promise<IReadWriteWallet>;

	/**
	 * Imports a wallet from a WIF with a password.
	 *
	 * @param {IWifWithEncryptionOptions} options
	 * @return {*}  {Promise<IReadWriteWallet>}
	 * @memberof IWalletFactory
	 */
	fromWIFWithEncryption(options: IWifWithEncryptionOptions): Promise<IReadWriteWallet>;
}
