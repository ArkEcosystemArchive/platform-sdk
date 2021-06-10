import { Contracts } from "@arkecosystem/platform-sdk";
import { IReadOnlyWallet, IReadWriteWallet } from "../../../../contracts";
import { IMultiSignature } from "../../../../contracts/wallets/services/multi-signature";
export declare class MultiSignature implements IMultiSignature {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IMultiSignature.all} */
	all(): Contracts.WalletMultiSignature;
	/** {@inheritDoc IMultiSignature.participants} */
	participants(): IReadOnlyWallet[];
}
