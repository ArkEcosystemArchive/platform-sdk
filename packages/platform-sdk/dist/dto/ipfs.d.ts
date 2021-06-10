import { IpfsData as Contract } from "./ipfs.contract";
import { AbstractTransactionData } from "./transaction";
export declare class IpfsData extends AbstractTransactionData implements Contract {
	hash(): string;
}
