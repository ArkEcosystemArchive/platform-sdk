import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class ValidatorData extends DTO.AbstractValidatorData implements Contracts.ValidatorData {
	public id(): string {
		return this.data.nodeID;
	}

	public alias(): string {
		return this.id();
	}

	public rank(): number {
		return 0;
	}

	public stake(): BigNumber {
		return BigNumber.make(this.data.stakeAmount);
	}

	public delegationFee(): BigNumber | undefined {
		return BigNumber.make(this.data.delegationFee);
	}
}
