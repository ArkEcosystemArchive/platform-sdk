import { IReadWriteWallet } from "./wallet";

export interface IWalletFactory {
	fromMnemonic(options: {
		coin: string;
		network: string;
		mnemonic: string;
		useBIP39?: boolean;
		useBIP44?: boolean;
	}): Promise<IReadWriteWallet>;

	fromAddress(options: { coin: string; network: string; address: string }): Promise<IReadWriteWallet>;

	fromPublicKey(options: { coin: string; network: string; publicKey: string }): Promise<IReadWriteWallet>;

	fromPrivateKey(options: { coin: string; network: string; privateKey: string }): Promise<IReadWriteWallet>;

	fromAddressWithLedgerPath(options: {
		coin: string;
		network: string;
		address: string;
		path: string;
	}): Promise<IReadWriteWallet>;

	fromMnemonicWithEncryption(options: {
		coin: string;
		network: string;
		mnemonic: string;
		password: string;
	}): Promise<IReadWriteWallet>;

	fromWIF(options: { coin: string; network: string; wif: string }): Promise<IReadWriteWallet>;

	fromWIFWithEncryption(options: {
		coin: string;
		network: string;
		wif: string;
		password: string;
	}): Promise<IReadWriteWallet>;
}
