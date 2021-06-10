import { IReadWriteWallet } from "../../../contracts";
import { IWalletSynchroniser } from "../../../contracts/wallets/wallet.synchroniser";
export declare class WalletSynchroniser implements IWalletSynchroniser {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IWalletSynchroniser.coin} */
	coin(): Promise<void>;
	/** {@inheritDoc IWalletSynchroniser.identity} */
	identity(): Promise<void>;
	/** {@inheritDoc IWalletSynchroniser.multiSignature} */
	multiSignature(): Promise<void>;
	/** {@inheritDoc IWalletSynchroniser.votes} */
	votes(): Promise<void>;
}
