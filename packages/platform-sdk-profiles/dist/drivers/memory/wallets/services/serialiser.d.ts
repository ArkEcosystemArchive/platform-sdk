import { IReadWriteWallet, IWalletData } from "../../../../contracts";
export declare class WalletSerialiser {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IWalletSerialiser.toJSON} */
	toJSON(): IWalletData;
}
