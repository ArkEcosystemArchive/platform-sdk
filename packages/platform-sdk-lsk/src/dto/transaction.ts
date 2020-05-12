import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public type(): number | undefined {
		return this.data.type;
	}

	public typeGroup(): number | undefined {
		return undefined;
	}

	public timestamp(): number | undefined {
		return this.data.timestamp;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
	}

	public blockId(): string {
		return this.data.blockId;
	}
}
