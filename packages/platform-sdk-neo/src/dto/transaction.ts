import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txid;
	}

	public type(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "type");
	}

	public typeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "typeGroup");
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.time);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.address_from;
	}

	public recipient(): string {
		return this.data.address_to;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public blockId(): string {
		return this.data.block_height;
	}
}
