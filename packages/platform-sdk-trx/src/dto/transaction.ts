import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "id");
	}

	public type(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "type");
	}

	public typeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "typeGroup");
	}

	public timestamp(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "timestamp");
	}

	public confirmations(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "confirmations");
	}

	public nonce(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "nonce");
	}

	public sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "sender");
	}

	public recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "recipient");
	}

	public amount(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "amount");
	}

	public fee(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "fee");
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public blockId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "blockId");
	}
}
