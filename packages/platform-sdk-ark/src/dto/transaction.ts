import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	readonly #types = {
		1: {
			0: "transfer",
			1: "secondSignature",
			2: "delegateRegistration",
			3: "vote",
			4: "multiSignature",
			5: "ipfs",
			6: "multiPayment",
			7: "delegateResignation",
			8: "htlcLock",
			9: "htlcClaim",
			10: "htlcRefund",
		},
		2: {
			0: "businessRegistration",
			1: "businessResignation",
			2: "businessUpdate",
			3: "bridgechainRegistration",
			4: "bridgechainResignation",
			5: "bridgechainUpdate",
		},
	};

	public id(): string {
		return this.data.id;
	}

	public type(): string {
		return this.#types[this.data.typeGroup][this.data.type];
	}

	public timestamp(): number | undefined {
		return this.data.timestamp.epoch;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipient;
	}

	public amount(): BigNumber {
		if (this.data.typeGroup === 0 && this.data.type === 6) {
			return this.data.asset.payments.reduce(
				(sum: BigNumber, { amount }: { amount: string }) => sum.plus(amount),
				BigNumber.ZERO,
			);
		}

		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.vendorField;
	}

	public asset(): object | undefined {
		return this.data.asset;
	}
}
