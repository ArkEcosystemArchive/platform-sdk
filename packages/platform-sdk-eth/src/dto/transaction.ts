import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.hash;
	}

	public type(): number | undefined {
		return undefined;
	}

	public typeGroup(): number | undefined {
		return undefined;
	}

	public timestamp(): number | undefined {
		return undefined;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(0);
	}

	public nonce(): BigNumber {
		return BigNumber.make(parseInt(this.data.nonce, 16));
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

	public blockId(): string {
		return this.data.blockNumber;
	}
}
