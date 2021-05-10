import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { checkGasPrice, getZilliqa } from "../zilliqa";

export class ClientService implements Contracts.ClientService {
	readonly #zilliqa: Zilliqa;

	private constructor(config: Coins.Config) {
		this.#zilliqa = getZilliqa(config);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const transaction = await this.#zilliqa.blockchain.getTransaction(id);
		const receipt = transaction.getReceipt();
		const data = {
			id: transaction.hash,
			sender: transaction.senderAddress,
			recipient: transaction.payload.toAddr,
			amount: transaction.payload.amount,
			gasUsed: receipt?.cumulative_gas || 0,
			gasPrice: transaction.payload.gasPrice,
			isConfirmed: transaction.isConfirmed(),
			isSent: transaction.isPending(),
		};
		return Helpers.createTransactionDataWithType(data, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transactions.name);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.#zilliqa.blockchain.getBalance(id);

		if (response.error) {
			throw new Exceptions.Exception(`Received an error: ${JSON.stringify(response.error)}`);
		} else if (!response?.result) {
			throw new Exceptions.Exception(`Received an invalid response: ${JSON.stringify(response)}`);
		}

		const { balance, nonce } = response.result;
		return new WalletData({
			address: id,
			balance,
			nonce,
		});
	}

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.wallets.name);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegate.name);
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegates.name);
	}

	public async votes(id: string): Promise<Contracts.VoteReport> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.voters.name);
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.syncing.name);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const minGasPrice = (await this.#zilliqa.blockchain.getMinimumGasPrice()).result;

		const response: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const id = transaction.id();

			try {
				checkGasPrice(transaction.fee().toString(), minGasPrice);

				const broadcastData = transaction.toBroadcast();
				const hash = await this.#zilliqa.blockchain.createTransactionRaw(broadcastData);

				const txParams = JSON.parse(broadcastData);
				const tx = this.#zilliqa.transactions.new({ ...txParams });
				await tx.confirm(hash);

				if (tx.isConfirmed()) {
					response.accepted.push(id);
				} else {
					response.rejected.push(id);
					const receipt = tx.getReceipt();
					if (receipt?.errors) {
						response.errors[id] = receipt.errors;
					}
				}
			} catch (error) {
				response.rejected.push(id);
				response.errors[id] = [error.message];
			}
		}

		return response;
	}

	public async broadcastSpread(
		transactions: Contracts.SignedTransactionData[],
		hosts: string[],
	): Promise<Contracts.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.broadcastSpread.name);
	}
}
