import { IReadWriteWallet } from "../../../contracts";
import { IWalletGate } from "../../../contracts/wallets/wallet.gate";
export declare class WalletGate implements IWalletGate {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IWalletGate.allows} */
	allows(feature: string): boolean;
	/** {@inheritDoc IWalletGate.denies} */
	denies(feature: string): boolean;
	/** {@inheritDoc IWalletGate.any} */
	any(features: string[]): boolean;
	/** {@inheritDoc IWalletGate.all} */
	all(features: string[]): boolean;
}
