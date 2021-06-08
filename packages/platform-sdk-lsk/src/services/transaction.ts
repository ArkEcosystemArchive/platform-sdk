import { Coins, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import {
	convertLSKToBeddows,
	getSigningBytes,
	signTransaction,
	castVotes,
	registerDelegate,
	registerMultisignature,
	registerSecondPassphrase,
	transfer,
} from "@liskhq/lisk-transactions";
import { getNetworkIdentifier, hexToBuffer } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#network!: string;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#network = this.configRepository.get<string>("network.meta.networkId");
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("transfer", {
			...input,
			data: {
				amount: convertLSKToBeddows(input.data.amount.toString()),
				recipientId: input.data.to,
				data: input.data.memo,
			},
		});
	}

	public async secondSignature(
		input: Services.SecondSignatureInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("registerSecondPassphrase", {
			...input,
			data: {
				secondMnemonic: BIP39.normalize(input.data.mnemonic),
			},
		});
	}

	public async delegateRegistration(
		input: Services.DelegateRegistrationInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("registerDelegate", input);
	}

	public async vote(
		input: Services.VoteInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("castVotes", input);
	}

	public async multiSignature(
		input: Services.MultiSignatureInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("registerMultisignature", {
			...input,
			data: {
				keysgroup: input.data.publicKeys,
				lifetime: input.data.lifetime,
				minimum: input.data.min,
			},
		});
	}

	async #createFromData(
		type: string,
		input: Contracts.KeyValuePair,
		options?: Services.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		try {
			const struct: Contracts.KeyValuePair = { ...input.data };

			struct.networkIdentifier = this.#network;

			if (callback) {
				callback({ struct });
			}

			if (options && options.unsignedBytes === true) {
				return getSigningBytes(asset, transaction);
			}

			// todo: support multisignature

			let signedTransaction;

			if (input.signatory.signingKey()) {
				signTransaction(asset, struct, getNetworkIdentifier(
					hexToBuffer(this.configRepository.get("meta.genesisBlockPayloadHash")),
					this.configRepository.get("meta.communityIdentifier"),
				  ), input.signatory.signingKey());
			}

			// @TODO
			if (input.signatory.actsWithSecondaryMnemonic()) {
				struct.secondPassphrase = input.signatory.confirmKey();
			}

			return this.dataTransferObjectService.signedTransaction(
				signedTransaction.id,
				signedTransaction,
				signedTransaction,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
