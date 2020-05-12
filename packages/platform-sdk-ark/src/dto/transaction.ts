import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public type(): number | undefined {
		return this.data.type;
	}

	public typeGroup(): number | undefined {
		return this.data.typeGroup;
	}

	public timestamp(): number | undefined {
		return this.data.timestamp.epoch;
	}

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.confirmations);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.nonce);
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipient;
	}

	public amount(): Utils.BigNumber {
		if (this.data.typeGroup === 0 && this.data.type === 6) {
			return this.data.asset.payments.reduce(
				(sum: Utils.BigNumber, { amount }: { amount: string }) => sum.plus(amount),
				Utils.BigNumber.ZERO,
			);
		}

		return Utils.BigNumber.make(this.data.amount);
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.vendorField;
	}

	public blockId(): string {
		return this.data.blockId;
	}
}
