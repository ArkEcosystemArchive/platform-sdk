import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class DelegateResignationData extends TransactionData implements Contracts.DelegateResignationData {
	//
}
