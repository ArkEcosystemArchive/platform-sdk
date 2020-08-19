import { Identities } from "@arkecosystem/crypto";
import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData.sender;
	}

	public recipient(): string {
		return this.signedData.recipient;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.signedData.fee);
	}
}
