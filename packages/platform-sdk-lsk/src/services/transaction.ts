import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import {
	castVotes,
	registerDelegate,
	registerMultisignature,
	registerSecondPassphrase,
	transfer,
} from "@liskhq/lisk-transactions";

import { SignedTransactionData } from "../dto/signed-transaction";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #network;

	private constructor(network: Coins.NetworkManifest) {
		super();

		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		this.#network = network.meta?.networkId!;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config.get<Coins.NetworkManifest>("network"));
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("transfer", {
			...input,
			...{
				data: {
					amount: input.data.amount.toString(),
					recipientId: input.data.to,
					data: input.data.memo,
				},
			},
		});
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("registerSecondPassphrase", {
			...input,
			...{
				data: {
					secondMnemonic: BIP39.normalize(input.data.mnemonic),
				},
			},
		});
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("registerDelegate", input);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("castVotes", input);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("registerMultisignature", {
			...input,
			...{
				data: {
					keysgroup: input.data.publicKeys,
					lifetime: input.data.lifetime,
					minimum: input.data.min,
				},
			},
		});
	}

	private async createFromData(
		type: string,
		input: Contracts.KeyValuePair,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		try {
			const struct: Contracts.KeyValuePair = { ...input.data };

			struct.networkIdentifier = this.#network;

			if (callback) {
				callback({ struct });
			}

			// todo: support multisignature

			if (input.signatory.signingKey()) {
				struct.passphrase = BIP39.normalize(input.signatory.signingKey());
			}

			if (input.signatory.actsWithSecondaryMnemonic()) {
				struct.secondPassphrase = BIP39.normalize(input.signatory.confirmKey());
			}

			const signedTransaction = {
				transfer,
				registerSecondPassphrase,
				registerDelegate,
				castVotes,
				registerMultisignature,
			}[type](struct);

			return new SignedTransactionData(signedTransaction.id, signedTransaction, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
