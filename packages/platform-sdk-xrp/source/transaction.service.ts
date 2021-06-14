import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { RippleAPI } from "ripple-lib";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#ripple!: RippleAPI;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#ripple = new RippleAPI();
	}

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			const amount = this.toSatoshi(input.data.amount).toString();
			const prepared = await this.#ripple.preparePayment(
				input.signatory.address(),
				{
					source: {
						address: input.signatory.address(),
						maxAmount: { value: amount, currency: "XRP" },
					},
					destination: {
						address: input.data.to,
						amount: { value: amount, currency: "XRP" },
					},
				},
				{ maxLedgerVersionOffset: 5 },
			);

			const { id, signedTransaction } = await this.#post("sign", [
				{
					tx_json: prepared.txJSON,
					secret: input.signatory.signingKey(),
				},
			]);

			const signedData = { ...signedTransaction, timestamp: DateTime.make() };

			return this.dataTransferObjectService.signedTransaction(id, signedData, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	async #post(method: string, params: any[]): Promise<Contracts.KeyValuePair> {
		return (
			await this.httpClient.post(Helpers.randomHostFromConfig(this.configRepository), {
				jsonrpc: "2.0",
				id: UUID.random(),
				method,
				params,
			})
		).json().result;
	}
}
