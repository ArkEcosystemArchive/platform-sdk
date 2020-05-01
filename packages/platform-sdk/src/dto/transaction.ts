import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractTransactionData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract type(): number | undefined;

	abstract typeGroup(): number | undefined;

	abstract timestamp(): number | undefined;

	abstract confirmations(): BigNumber;

	abstract nonce(): string | undefined;

	abstract sender(): string;

	abstract recipient(): string;

	abstract amount(): BigNumber;

	abstract fee(): BigNumber;

	abstract memo(): string | undefined;

	abstract blockId(): string;

	public toObject(): KeyValuePair {
		return {
			id: this.id(),
			type: this.type(),
			typeGroup: this.typeGroup(),
			timestamp: this.timestamp(),
			confirmations: this.confirmations(),
			nonce: this.nonce(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount(),
			fee: this.fee(),
			vendorField: this.memo(),
			blockId: this.blockId(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
