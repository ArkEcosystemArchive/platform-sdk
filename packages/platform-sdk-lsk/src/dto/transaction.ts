import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	readonly #types = {
		8: "transfer",
		9: "secondSignature",
		10: "delegateRegistration",
		11: "vote",
		12: "multiSignature",
	};

	public id(): string {
		return this.data.id;
	}

	public type(): string {
		return this.#types[this.data.type];
	}

	public timestamp(): number | undefined {
		return this.data.timestamp;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
	}

	public asset(): object | undefined {
		return {};
	}
}
