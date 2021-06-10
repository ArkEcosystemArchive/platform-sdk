import { IReadWriteWallet } from "../../../../contracts";
import { IWalletImportFormat } from "../../../../contracts/wallets/services/wif";
export declare class WalletImportFormat implements IWalletImportFormat {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IWalletImportFormat.get} */
	get(password: string): Promise<string>;
	/** {@inheritDoc IWalletImportFormat.set} */
	set(mnemonic: string, password: string): Promise<void>;
	/** {@inheritDoc IWalletImportFormat.exists} */
	exists(): boolean;
}
