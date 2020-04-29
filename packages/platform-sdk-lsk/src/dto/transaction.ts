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
		return undefined;
	}

	public getTimestamp(): number | undefined {
		return this.data.timestamp;
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
		return this.data.recipientId;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.data.amount);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public getVendorField(): string | undefined {
		return this.data.asset.data;
	}

	public getBlockId(): string {
		return this.data.blockId;
	}
}
