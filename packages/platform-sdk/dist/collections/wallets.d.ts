import { WalletData } from "../contracts";
import { Paginator } from "./paginator";
export declare class WalletDataCollection extends Paginator<WalletData> {
	#private;
	findByAddress(address: string): WalletData | undefined;
	findByPublicKey(publicKey: string): WalletData | undefined;
	findByUsername(username: string): WalletData | undefined;
}
