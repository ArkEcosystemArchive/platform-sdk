import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";
import BN from "bignumber.js";

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

	public nonce(): BigNumber {
		return BigNumber.make(this.data.sequence);
	}

	public sender(): string {
		return this.data.specification.source.address;
	}

	public recipient(): string {
		return this.data.specification.destination.address;
	}

	public amount(): BigNumber {
		const satoshi: string = new BN(this.data.outcome.deliveredAmount.value).times(1e8).toFixed();

		return BigNumber.make(satoshi);
	}

	public fee(): BigNumber {
		const satoshi: string = new BN(this.data.outcome.fee).times(1e8).toFixed();

		return BigNumber.make(satoshi);
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public blockId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "blockId");
	}
}
