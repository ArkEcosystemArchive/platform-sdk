import { DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.TransactionData {
	public getId(): string {
		return this.data.id;
	}

	public getType(): number | undefined {
		return this.data.type;
	}

	public getTypeGroup(): number | undefined {
		return this.data.typeGroup;
	}

	public getTimestamp(): number | undefined {
		return this.data.timestamp.epoch;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public getNonce(): string | undefined {
		return this.data.nonce;
	}

	public getSender(): string {
		return this.data.senderPublicKey;
	}

	public getRecipient(): string {
		return this.data.recipient;
	}

	public getAmount(): BigNumber {
		if (this.data.typeGroup === 0 && this.data.type === 6) {
			return this.data.asset.payments.reduce(
				(sum: BigNumber, { amount }: { amount: string }) => sum.plus(amount),
				BigNumber.ZERO,
			);
		}

		return BigNumber.make(this.data.amount);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public getVendorField(): string | undefined {
		return this.data.vendorField;
	}

	public getBlockId(): string {
		return this.data.blockId;
	}
}
