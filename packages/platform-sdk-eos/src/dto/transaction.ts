import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

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

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.make(0);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.nonce);
	}

	public sender(): string {
		return this.data.from;
	}

	public recipient(): string {
		return this.data.to;
	}

	public amount(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.value);
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.gas);
	}

	public memo(): string | undefined {
		return this.data.data;
	}

	public blockId(): string {
		return this.data.blockNumber;
	}
}
