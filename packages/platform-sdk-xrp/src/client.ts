import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Client implements Contracts.Client {
	readonly #connection: RippleAPI;

	public constructor (private readonly peer: string) {
		this.#connection = new RippleAPI({ server: peer });
	}

	public async getTransaction(id: string): Promise<Transaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransaction");
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const address = "rPBPQ34twiBAjm8n7joizT8ruwD7hGoWjk";

		await this.#connection.connect()

		console.log(await this.#connection.getBalances(address))

		const payment = {
			source: {
				address: address,
				maxAmount: {
					value: '0.01',
					currency: 'XRP'
				}
			},
			destination: {
				address: 'rHE2tehVYCGeMvi1gDEcYzQ7fpiCiYecAR',
				amount: {
					value: '0.01',
					currency: 'XRP'
				}
			}
		};

		const prepared = await this.#connection.preparePayment(address, payment, { maxLedgerVersionOffset: 5 })

		const { signedTransaction } = this.#connection.sign(prepared.txJSON, input.passphrase);

		const response = await this.#connection.submit(signedTransaction)

		console.log(response)

		throw new Exceptions.NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Delegate>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getPeers(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Peer>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPeers");
	}

	public async getConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByType");
	}

	public async getSyncStatus(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transaction: object): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "postTransactions");
	}
}
