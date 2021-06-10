import { Contracts } from "@arkecosystem/platform-sdk-profiles";
export declare const finaliseTransaction: (
	wallet: Contracts.IReadWriteWallet,
	mnemonic: string,
	method: string,
	data?: {},
) => Promise<void>;
