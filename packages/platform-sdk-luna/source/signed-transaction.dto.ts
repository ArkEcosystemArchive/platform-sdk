import { Contracts, DTO, Exceptions, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return "TODO";
	}

	public recipient(): string {
		return "TODO";
	}

	public amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}
}
