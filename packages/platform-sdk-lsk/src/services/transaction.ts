import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39, UUID } from "@arkecosystem/platform-sdk-crypto";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import {
	castVotes,
	registerDelegate,
	registerMultisignature,
	registerSecondPassphrase,
	TransactionJSON,
	transfer,
	utils,
} from "@liskhq/lisk-transactions";

import { LedgerService } from "./ledger";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#network!: string;

	@IoC.inject(IoC.BindingType.LedgerService)
	private readonly ledgerService!: LedgerService;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#network = this.configRepository.get<string>("network.meta.networkId");
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"transfer",
			{
				...input,
				// @ts-ignore - @TODO: this should be reviewed or removed because this was only
				// added because the type and timestamp are otherwise lost which will mean that
				// the transaction ID won't be calculated which will cause the whole transaction
				// to be come useless and make it impossible to broadcast it to accept and forge it
				data: input.data.ledger || {
					amount: Helpers.toRawUnit(input.data.amount, this.configRepository).toString(),
					recipientId: input.data.to,
					data: input.data.memo,
				},
			},
			options,
		);
	}

	public async secondSignature(
		input: Services.SecondSignatureInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"registerSecondPassphrase",
			{
				...input,
				data: {
					secondMnemonic: BIP39.normalize(input.data.mnemonic),
				},
			},
			options,
		);
	}

	public async delegateRegistration(
		input: Services.DelegateRegistrationInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("registerDelegate", input, options);
	}

	public async vote(
		input: Services.VoteInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("castVotes", input, options);
	}

	public async multiSignature(
		input: Services.MultiSignatureInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"registerMultisignature",
			{
				...input,
				data: {
					keysgroup: input.data.publicKeys,
					lifetime: input.data.lifetime,
					minimum: input.data.min,
				},
			},
			options,
		);
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

			const transactionSigner = {
				transfer,
				registerSecondPassphrase,
				registerDelegate,
				castVotes,
				registerMultisignature,
			}[type]!;

			if (options && options.unsignedBytes === true) {
				const structTransaction = (transactionSigner(struct as any) as unknown) as TransactionJSON;

				if (input.signatory.actsWithSenderPublicKey()) {
					// @ts-ignore - LSK uses JS so they don't encounter these type errors
					structTransaction.senderPublicKey = input.signatory.signingKey();
					// TODO This one should actually come from the ledger not what the user asks
				}

				const signedTransaction = utils.getTransactionBytes(structTransaction).toString("hex");

				return this.dataTransferObjectService.signedTransaction(
					UUID.random(),
					signedTransaction,
					structTransaction,
				);
			}

			// todo: support multisignature

			if (input.signatory.signingKey()) {
				struct.passphrase = input.signatory.signingKey();
			}

			if (input.signatory.actsWithSecondaryMnemonic()) {
				struct.secondPassphrase = input.signatory.confirmKey();
			}

			if (input.signatory.actsWithSignature()) {
				struct.signature = input.signatory.signingKey();
				struct.id = utils.getTransactionId(struct as any);
				struct.senderPublicKey = input.signatory.publicKey();

				return this.dataTransferObjectService.signedTransaction(struct.id, struct, struct);
			}

			if (input.signatory.actsWithSenderPublicKey()) {
				await this.ledgerService.connect(LedgerTransportNodeHID);
				const path = "m/44'/134'/0'/0/0"; // TODO Need to get this in the signatory or as a param somewhere
				const buffer: Buffer = utils.getTransactionBytes(transactionSigner(struct as any) as TransactionJSON);
				struct.signature = await this.ledgerService.signTransaction(path, buffer);
				await this.ledgerService.disconnect();
			}

			const signedTransaction = transactionSigner(struct as any);

			return this.dataTransferObjectService.signedTransaction(
				// @ts-ignore
				signedTransaction.id,
				signedTransaction,
				signedTransaction,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
