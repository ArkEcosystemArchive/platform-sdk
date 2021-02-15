import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class ValidatorData extends DTO.AbstractValidatorData implements Contracts.ValidatorData {
	public id(): string {
		return this.data.publicKey || this.data.account?.publicKey;
	}

	public rank(): number {
		return this.data.rank || this.data.delegate?.rank;
	}

	public stake(): BigNumber {
		return BigNumber.make(this.data.vote || this.data.delegate?.vote);
	}

	public startTime(): DateTime | undefined {
		return undefined;
	}

	public endTime(): DateTime | undefined {
		return undefined;
	}
}
