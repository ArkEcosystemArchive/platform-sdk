import { AbstractTransactionData } from "./transaction";
import { TransferData as Contract } from "./transfer.contract";
export declare class TransferData extends AbstractTransactionData implements Contract {
	memo(): string | undefined;
}
