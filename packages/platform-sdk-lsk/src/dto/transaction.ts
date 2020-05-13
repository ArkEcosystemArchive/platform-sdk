import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

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

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.confirmations);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public amount(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.amount);
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
	}

	public asset(): object | undefined {
		return {};
	}
}
