import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public getId(): string {
		return this.data.id;
	}

	public getType(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getType");
	}

	public getTypeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTypeGroup");
	}

	public getTimestamp(): number | undefined {
		return +new Date(this.data.outcome.timestamp);
	}

	public getConfirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public getNonce(): string | undefined {
		return this.data.sequence;
	}

	public getSender(): string {
		return this.data.specification.source.address;
	}

	public getRecipient(): string {
		return this.data.specification.destination.address;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.data.outcome.deliveredAmount.value * 1e8);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.data.outcome.fee * 1e8);
	}

	public getVendorField(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVendorField");
	}

	public getBlockId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getBlockId");
	}
}
