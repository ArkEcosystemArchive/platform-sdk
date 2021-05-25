import { Identities } from "@arkecosystem/crypto";
import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return Identities.Address.fromPublicKey(this.signedData.senderPublicKey);
	}

	public recipient(): string {
		return this.signedData.recipientId;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.signedData.fee);
	}

	public timestamp(): DateTime {
		if (this.signedData.timestamp) {
			return DateTime.make(this.signedData.timestamp);
		}
			
		return DateTime.make();
	}

	public isMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}

	public isMultiSignatureRegistration(): boolean {
		return this.signedData.type === 4;
	}
}
