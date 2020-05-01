import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public type(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "type");
	}

	public typeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "typeGroup");
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.outcome.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public nonce(): string | undefined {
		return this.data.sequence;
	}

	public sender(): string {
		return this.data.specification.source.address;
	}

	public recipient(): string {
		return this.data.specification.destination.address;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.outcome.deliveredAmount.value * 1e8);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.outcome.fee * 1e8);
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public blockId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "blockId");
	}
}
