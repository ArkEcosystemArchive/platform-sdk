import { Contracts, IoC } from "@arkecosystem/platform-sdk";
import { Base64 } from "@arkecosystem/platform-sdk-crypto";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class TransferData extends TransactionData implements Contracts.TransferData {
	public memo(): string | undefined {
		try {
			return Base64.decode(this.data.memo);
		} catch {
			return undefined;
		}
	}
}
