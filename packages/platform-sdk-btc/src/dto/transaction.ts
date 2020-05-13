import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txid;
	}

	public type(): string {
		return "transfer";
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.blockTime);
	}

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "sender");
	}

	public recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "recipient");
	}

	public amount(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.value);
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return undefined;
	}

	public asset(): object | undefined {
		return {};
	}
}
