import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";
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

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.sequence);
	}

	public sender(): string {
		return this.data.specification.source.address;
	}

	public recipient(): string {
		return this.data.specification.destination.address;
	}

	public amount(): Utils.BigNumber {
		const satoshi: string = new BN(this.data.outcome.deliveredAmount.value).times(1e8).toFixed();

		return Utils.BigNumber.make(satoshi);
	}

	public fee(): Utils.BigNumber {
		const satoshi: string = new BN(this.data.outcome.fee).times(1e8).toFixed();

		return Utils.BigNumber.make(satoshi);
	}

	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "memo");
	}

	public asset(): any {
		throw new Exceptions.NotImplemented(this.constructor.name, "asset");
	}
}
