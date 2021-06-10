import { Interfaces } from "@arkecosystem/crypto";
declare class TransactionSchemaVerifier {
	#private;
	constructor();
	verifySchema(data: Interfaces.ITransactionData): void;
}
export declare const transactionSchemaVerifier: TransactionSchemaVerifier;
export {};
