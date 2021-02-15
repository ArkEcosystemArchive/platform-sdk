import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class ValidatorData extends DTO.AbstractValidatorData implements Contracts.ValidatorData {
	public id(): string {
		return this.data.publicKey || this.data.account?.publicKey;
	}

	public alias(): string {
		return this.data.username || this.data.delegate?.username;
	}

	public rank(): number {
		return this.data.rank || this.data.delegate?.rank;
	}

	public stake(): BigNumber {
		return BigNumber.make(this.data.vote || this.data.delegate?.vote);
	}

	public delegationFee(): BigNumber | undefined {
		return BigNumber.ZERO;
	}
}
