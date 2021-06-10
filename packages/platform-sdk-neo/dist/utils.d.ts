export declare const createWallet: (input: string) => any;
export declare const deriveWallet: (
	mnemonic: string,
	coinType: number,
	account: number,
	change: number,
	index: number,
) => any;
export declare const deriveKeyPair: (
	input: string,
) => {
	publicKey: any;
	privateKey: any;
};
