import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { BN, Zilliqa } from "@zilliqa-js/zilliqa";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#zilliqa!: Zilliqa;
	#decimals!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#zilliqa = new Zilliqa(Helpers.randomHostFromConfig(this.configRepository));
		this.#decimals = this.configRepository.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
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
		return Helpers.createTransactionDataWithType(data, TransactionDTO).withDecimals(this.#decimals);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.#zilliqa.blockchain.getBalance(id);

		if (response.error) {
			throw new Exceptions.Exception(`Received an error: ${JSON.stringify(response.error)}`);
		}

		if (response?.result === undefined) {
			throw new Exceptions.Exception(`Received an invalid response: ${JSON.stringify(response)}`);
		}

		return new WalletData({
			address: id,
			balance: response.result.balance,
			nonce: response.result.nonce,
		});
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const minGasPrice = (await this.#zilliqa.blockchain.getMinimumGasPrice()).result;

		const response: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const id = transaction.id();

			try {
				this.#checkGasPrice(transaction.fee().toString(), minGasPrice);

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

	#checkGasPrice(gasPrice: string, minGasPrice = "0") {
		const isGasSufficient = new BN(gasPrice).gte(new BN(minGasPrice));
		if (!isGasSufficient) {
			throw new Exceptions.Exception(`Insufficient gas: ${gasPrice}, needed: ${minGasPrice}`);
		}
	}
}
