import Wallet from "ethereumjs-wallet";
export declare const createWallet: (
	mnemonic: string,
	coinType: number,
	account: number,
	change: number,
	addressIndex: number,
) => Wallet;
export declare const getAddress: (wallet: Wallet) => string;
