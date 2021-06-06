import { Identities } from "@arkecosystem/crypto";
import { Contracts, DTO, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	@IoC.inject(IoC.BindingType.BigNumberService)
	private readonly bigNumberService!: Services.BigNumberService;

	public sender(): string {
		return Identities.Address.fromPublicKey(this.signedData.senderPublicKey);
	}

	public recipient(): string {
		return this.signedData.recipientId;
	}

	public amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.amount);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.signedData.fee);
	}

	public timestamp(): DateTime {
		if (this.signedData.timestamp) {
			return DateTime.make(this.signedData.timestamp);
		}

		// defaulting to now because timestamps missing in V2
		return DateTime.make();
	}

	public isMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}

	public isMultiSignatureRegistration(): boolean {
		return this.signedData.type === 4;
	}
}
