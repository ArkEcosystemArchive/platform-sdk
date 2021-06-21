import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { TransactionData } from "./transaction.contract";

export interface MultiPaymentData extends TransactionData {
	memo(): string | undefined;
	payments(): { recipientId: string; amount: BigNumber }[];
}
