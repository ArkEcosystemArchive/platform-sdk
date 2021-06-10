import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class IpfsData extends TransactionData implements Contracts.IpfsData {
	hash(): string;
}
