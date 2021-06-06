import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { bigNumber } from "../container";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	@IoC.inject(IoC.BindingType.BigNumberService)
	private readonly bigNumberService!: Services.BigNumberService;

	public sender(): string {
		return this.signedData.signature.signer;
	}

	public recipient(): string {
		return this.signedData.method.args.dest;
	}

	public amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.method.args.value);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
