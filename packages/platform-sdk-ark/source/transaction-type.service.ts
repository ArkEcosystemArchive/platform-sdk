type TransactionData = Record<string, any>;

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 0;
	}

	public static isSecondSignature(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 1;
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 2;
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return this.isVote(data) && this.isUnvote(data);
	}

	public static isVote(data: TransactionData): boolean {
		const isVote = TransactionTypeService.#typeGroup(data) === 1 && data.type === 3;

		if (!isVote) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("+"));
	}

	public static isUnvote(data: TransactionData): boolean {
		const isVote = TransactionTypeService.#typeGroup(data) === 1 && data.type === 3;

		if (!isVote) {
			return false;
		}

		return ((data.asset || {}).votes as string[]).some((vote) => vote.startsWith("-"));
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 4;
	}

	public static isIpfs(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 5;
	}

	public static isMultiPayment(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 6;
	}

	public static isDelegateResignation(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 7;
	}

	public static isHtlcLock(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 8;
	}

	public static isHtlcClaim(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 9;
	}

	public static isHtlcRefund(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 10;
	}

	public static isMagistrate(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 2;
	}

	static #typeGroup(data: TransactionData): number {
		if (data.typeGroup === undefined) {
			return 1;
		}

		return data.typeGroup;
	}
}
