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

	public async createTransfer(data: Contracts.KeyValuePair): Promise<any> {
		const prepared = await this.#connection.preparePayment(
			data.sender,
			{
				source: {
					address: data.sender,
					maxAmount: {
						value: data.amount,
						currency: "XRP",
					},
				},
				destination: {
					address: data.recipient,
					amount: {
						value: data.amount,
						currency: "XRP",
					},
				},
			},
			{ maxLedgerVersionOffset: 5 },
		);

		const { signedTransaction } = this.#connection.sign(prepared.txJSON, data.passphrase);

		return signedTransaction;
	}

	public createSecondSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public createIpfs(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
