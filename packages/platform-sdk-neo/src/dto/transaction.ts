import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

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

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.address_from;
	}

	public recipient(): string {
		return this.data.address_to;
	}

	public amount(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.amount);
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public blockId(): string {
		return this.data.block_height;
	}
}
