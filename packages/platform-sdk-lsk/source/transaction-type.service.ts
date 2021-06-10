type TransactionData = Record<string, any>;

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return data.type === 8;
	}

	public static isSecondSignature(data: TransactionData): boolean {
		return data.type === 9;
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return data.type === 10;
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return this.isVote(data) && this.isUnvote(data);
	}

	public static isVote(data: TransactionData): boolean {
		if (data.type !== 11) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("+"));
	}

	public static isUnvote(data: TransactionData): boolean {
		if (data.type !== 11) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("-"));
	}

	public static isMultiSignature(data: TransactionData): boolean {
		return data.type === 12;
	}
}
