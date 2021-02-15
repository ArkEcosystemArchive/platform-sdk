import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { get, has } from "dot-prop";

export class ValidatorData extends DTO.AbstractValidatorData implements Contracts.ValidatorData {
	public id(): string {
		return this.data.publicKey;
	}

	public alias(): string {
		return this.data.username;
	}

	public rank(): number {
		return this.getProperty(["rank", "attributes.delegate.rank"]) || 0;
	}

	public stake(): BigNumber {
		const balance: string | undefined = this.getProperty(["votes", "attributes.delegate.voteBalance"]);

		if (balance === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(balance);
	}

	public delegationFee(): BigNumber | undefined {
		return BigNumber.ZERO;
	}

	public startTime(): DateTime | undefined {
		return undefined;
	}

	public endTime(): DateTime | undefined {
		return undefined;
	}

	private getProperty<T>(keys: string[]): T | undefined {
		for (const key of keys) {
			if (has(this.data, key)) {
				return get(this.data, key);
			}
		}

		return undefined;
	}
}
