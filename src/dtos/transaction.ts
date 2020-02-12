export class Transaction {
	private readonly id: string;
	private readonly amount: string;

	public constructor({ id, amount }) {
		this.id = id;
		this.amount = amount;
	}

	public getId() {
		return this.id;
	}

	public getAmount() {
		return this.amount;
	}
}
