import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	@IoC.inject(IoC.BindingType.PrivateKeyService)
	private readonly privateKeyService!: Services.PrivateKeyService;

	#connection!: TronWeb;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#connection = new TronWeb({ fullHost: Helpers.randomHostFromConfig(this.configRepository) });
	}

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			const { address: senderAddress } = await this.addressService.fromMnemonic(input.signatory.signingKey());

			if (senderAddress === input.data.to) {
				throw new Exceptions.InvalidRecipientException("Cannot transfer TRX to the same account.");
			}

			let transaction = await this.#connection.transactionBuilder.sendTrx(
				input.data.to,
				Helpers.toRawUnit(input.data.amount, this.configRepository).toString(),
				senderAddress,
				1,
			);

			if (input.data.memo) {
				transaction = await this.#connection.transactionBuilder.addUpdateData(
					transaction,
					input.data.memo,
					"utf8",
				);
			}

			const response = await this.#connection.trx.sign(
				transaction,
				(
					await this.privateKeyService.fromMnemonic(input.signatory.signingKey())
				).privateKey,
			);

			const decimals = this.configRepository.get<number>(Coins.ConfigKey.CurrencyDecimals);
			return this.dataTransferObjectService.signedTransaction(response.txID, response, response);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
