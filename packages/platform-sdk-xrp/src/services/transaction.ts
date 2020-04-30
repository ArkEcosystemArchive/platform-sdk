import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: RippleAPI;

	private constructor(connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async new(peer: string) {
		const connection = new RippleAPI({ server: peer });

		await connection.connect();

		return new TransactionService(connection);
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		const prepared = await this.#connection.preparePayment(
			data.sender,
			{
				source: {
					address: data.sender,
					maxAmount: {
						value: `${data.amount}`,
						currency: "XRP",
					},
				},
				destination: {
					address: data.recipient,
					amount: {
						value: `${data.amount}`,
						currency: "XRP",
					},
				},
			},
			{ maxLedgerVersionOffset: 5 },
		);

		const { signedTransaction } = this.#connection.sign(prepared.txJSON, data.passphrase);

		return signedTransaction;
	}

	public async createSecondSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public async createIpfs(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
