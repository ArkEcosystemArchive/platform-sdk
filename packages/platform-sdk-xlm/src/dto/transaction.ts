import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.transaction_hash || this.data.id;
	}

	public type(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "type");
	}

	public typeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "typeGroup");
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.created_at);
	}

	public confirmations(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "confirmations");
	}

	// todo: with the "transaction" method we get a nonce but with "transactions" it isn't available
	public nonce(): Utils.BigNumber {
		if (this.data.source_account_sequence) {
			return Utils.BigNumber.make(this.data.source_account_sequence);
		}

		return Utils.BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.from || this.data.operation.from;
	}

	public recipient(): string {
		return this.data.to || this.data.operation.to;
	}

	public amount(): Utils.BigNumber {
		return Utils.BigNumber.make((this.data.amount || this.data.operation.amount) * 1e8);
	}

	// todo: with the "transaction" method we get a nonce but with "transactions" it isn't available
	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make((this.data.fee_charged || 0) * 1e8);
	}

	public memo(): string | undefined {
		return undefined;
	}

	public asset(): object | undefined {
		return {};
	}
}
