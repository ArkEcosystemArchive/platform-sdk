import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Stellar from "stellar-sdk";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { IdentityService } from "./identity";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;
	readonly #identity: IdentityService;
	readonly #client;
	readonly #networkPassphrase;

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

	private constructor(config: Coins.Config, identity: IdentityService) {
		super();

		const networkConfig = config.get<Coins.NetworkManifest>("network");
		const network = this.#networks[networkConfig.id.split(".")[1]];

		this.#config = config;
		this.#identity = identity;
		this.#client = new Stellar.Server(network.host);
		this.#networkPassphrase = network.networkPassphrase;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config, await IdentityService.__construct(config));
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			let keyPair: Contracts.KeyPairDataTransferObject;
			if (input.signatory.actsWithPrivateKey()) {
				keyPair = await this.#identity.keyPair().fromPrivateKey(input.signatory.signingKey());
			} else {
				keyPair = await this.#identity.keyPair().fromMnemonic(input.signatory.signingKey());
			}

			const { publicKey, privateKey } = keyPair;

			const account = await this.#client.loadAccount(publicKey);
			const amount = Coins.toRawUnit(input.data.amount, this.#config).toString();

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

			return new SignedTransactionData(uuidv4(), transaction, transaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
