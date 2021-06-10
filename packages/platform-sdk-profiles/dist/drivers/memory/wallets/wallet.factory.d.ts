import {
	IAddressOptions,
	IAddressWithDerivationPathOptions,
	IGenerateOptions,
	IMnemonicOptions,
	IPrivateKeyOptions,
	IProfile,
	IPublicKeyOptions,
	IReadWriteWallet,
	IWalletFactory,
	IWifOptions,
} from "../../../contracts";
export declare class WalletFactory implements IWalletFactory {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IWalletFactory.generate} */
	generate({
		coin,
		network,
		locale,
	}: IGenerateOptions): Promise<{
		mnemonic: string;
		wallet: IReadWriteWallet;
	}>;
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP39} */
	fromMnemonicWithBIP39({ coin, network, mnemonic, password }: IMnemonicOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP44} */
	fromMnemonicWithBIP44({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP49} */
	fromMnemonicWithBIP49({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP84} */
	fromMnemonicWithBIP84({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromAddress} */
	fromAddress({ coin, network, address }: IAddressOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	fromPublicKey({ coin, network, publicKey }: IPublicKeyOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromPrivateKey} */
	fromPrivateKey({ coin, network, privateKey }: IPrivateKeyOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromAddressWithDerivationPath} */
	fromAddressWithDerivationPath({
		coin,
		network,
		address,
		path,
	}: IAddressWithDerivationPathOptions): Promise<IReadWriteWallet>;
	/** {@inheritDoc IWalletFactory.fromWIF} */
	fromWIF({ coin, network, wif, password }: IWifOptions): Promise<IReadWriteWallet>;
}
