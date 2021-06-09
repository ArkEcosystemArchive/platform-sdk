import { Contracts, Exceptions, Helpers, IoC, Networks, Services } from "@arkecosystem/platform-sdk";
import Stellar from "stellar-sdk";
import { v4 as uuidv4 } from "uuid";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(IoC.BindingType.KeyPairService)
	private readonly keyPairService!: Services.KeyPairService;

	#client;
	#networkPassphrase;

	readonly #networks = {
		mainnet: {
			host: "https://horizon.stellar.org",
			networkPassphrase: Stellar.Networks.MAINNET,
		},
		testnet: {
			host: "https://horizon-testnet.stellar.org",
			networkPassphrase: Stellar.Networks.TESTNET,
		},
	};

	@IoC.postConstruct()
	private onPostConstruct(): void {
		const networkConfig = this.configRepository.get<Networks.NetworkManifest>("network");
		const network = this.#networks[networkConfig.id.split(".")[1]];

		this.#client = new Stellar.Server(network.host);
		this.#networkPassphrase = network.networkPassphrase;
	}

	public async transfer(
		input: Services.TransferInput,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			let keyPair: Services.KeyPairDataTransferObject;
			if (input.signatory.actsWithPrivateKey()) {
				keyPair = await this.keyPairService.fromPrivateKey(input.signatory.signingKey());
			} else {
				keyPair = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
			}

			const { publicKey, privateKey } = keyPair;

			const account = await this.#client.loadAccount(publicKey);
			const amount = Helpers.toRawUnit(input.data.amount, this.configRepository).toString();

			const transaction = new Stellar.TransactionBuilder(account, {
				fee: input.fee || Stellar.BASE_FEE,
				networkPassphrase: this.#networkPassphrase,
			})
				.addOperation(
					Stellar.Operation.payment({
						destination: input.data.to,
						asset: Stellar.Asset.native(),
						amount,
					}),
				)
				.setTimeout(30) // todo: support expiration
				.build();

			transaction.sign(Stellar.Keypair.fromSecret(privateKey));

			return this.dataTransferObjectService.signedTransaction(uuidv4(), transaction, transaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
