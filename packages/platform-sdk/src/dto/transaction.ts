import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractTransactionData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract getId(): string;

	abstract getType(): number | undefined;

	abstract getTypeGroup(): number | undefined;

	abstract getTimestamp(): number | undefined;

	abstract getConfirmations(): BigNumber;

	abstract getNonce(): string | undefined;

	abstract getSender(): string;

	abstract getRecipient(): string;

	abstract getAmount(): BigNumber;

	abstract getFee(): BigNumber;

	abstract getVendorField(): string | undefined;

	abstract getBlockId(): string;

	public toObject(): KeyValuePair {
		return {
			id: this.getId(),
			type: this.getType(),
			typeGroup: this.getTypeGroup(),
			timestamp: this.getTimestamp(),
			confirmations: this.getConfirmations(),
			nonce: this.getNonce(),
			sender: this.getSender(),
			recipient: this.getRecipient(),
			amount: this.getAmount(),
			fee: this.getFee(),
			vendorField: this.getVendorField(),
			blockId: this.getBlockId(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
