import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.hash;
	}

	public type(): string {
		return "transfer";
	}

	public timestamp(): number | undefined {
		return undefined;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(0);
	}

	public sender(): string {
		return this.data.from;
	}

	public recipient(): string {
		return this.data.to;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.value);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.gas);
	}

	public memo(): string | undefined {
		return this.data.data;
	}

	public asset(): object | undefined {
		return {};
	}
}
