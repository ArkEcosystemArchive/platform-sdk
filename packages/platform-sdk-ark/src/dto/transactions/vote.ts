import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class VoteData extends TransactionData implements DTO.DelegateRegistrationData {
	public votes(): string[] {
		return this.data.asset.votes.filter((vote: string) => vote.startsWith("+"));
	}

	public unvotes(): string[] {
		return this.data.asset.votes.filter((vote: string) => vote.startsWith("-"));
	}
}
