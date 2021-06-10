import { Collections } from "@arkecosystem/platform-sdk";
import { ExtendedTransactionData } from "./transaction";
export declare class ExtendedTransactionDataCollection extends Collections.Paginator<ExtendedTransactionData> {
	#private;
	findById(id: string): ExtendedTransactionData | undefined;
	findByType(type: string): ExtendedTransactionData | undefined;
	findByTimestamp(timestamp: string): ExtendedTransactionData | undefined;
	findBySender(sender: string): ExtendedTransactionData | undefined;
	findByRecipient(recipient: string): ExtendedTransactionData | undefined;
}
