import emoji from "node-emoji";
import { KeyValuePair } from "../contracts/types";
import { BigNumber } from "../utils";
import { Censor } from "../utils/censor";

export abstract class AbstractTransactionData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract type(): string;

	abstract timestamp(): number | undefined;

	abstract confirmations(): BigNumber;

	abstract sender(): string;

	abstract recipient(): string;

	abstract amount(): BigNumber;

	abstract fee(): BigNumber;

	abstract memo(): string | undefined;

	abstract asset(): object | undefined;

	public toObject(): KeyValuePair {
		return {
			id: this.id(),
			type: this.type(),
			timestamp: this.timestamp(),
			confirmations: this.confirmations(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount(),
			fee: this.fee(),
			vendorField: this.memo(),
			asset: this.asset(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}

	protected censorMemo(memo?: string): string | undefined {
		if (memo) {
			const processor: Censor = new Censor();

			if (processor.isBad(memo)) {
				return undefined;
			}

			return processor.process(emoji.emojify(memo));
		}

		return memo;
	}
}
