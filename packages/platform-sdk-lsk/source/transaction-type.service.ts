type TransactionData = Record<string, any>;

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return parseInt(data.type) === 0;
	}

	public static isSecondSignature(data: TransactionData): boolean {
		return parseInt(data.type) === 1;
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return parseInt(data.type) === 2;
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return this.isVote(data) && this.isUnvote(data);
	}

	public static isVote(data: TransactionData): boolean {
		if (parseInt(data.type) !== 3) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("+"));
	}

	public static isUnvote(data: TransactionData): boolean {
		if (parseInt(data.type) !== 3) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("-"));
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		return parseInt(data.type) === 4;
	}
}
