import { TransactionDataType } from "../contracts";
import { Paginator } from "./paginator";
export declare class TransactionDataCollection extends Paginator<TransactionDataType> {
	#private;
	findById(id: string): TransactionDataType | undefined;
	findByType(type: string): TransactionDataType | undefined;
	findByTimestamp(timestamp: string): TransactionDataType | undefined;
	findBySender(sender: string): TransactionDataType | undefined;
	findByRecipient(recipient: string): TransactionDataType | undefined;
}
