import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import * as transactions from "@liskhq/lisk-transactions";
import * as transactionsBeta from "@liskhq/lisk-transactions-new";

import { manifest } from "../manifest";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	private constructor(network: Coins.CoinNetwork) {
		this.#network = network.crypto.networkId;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config.get<Coins.CoinNetwork>("network"));
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("transfer", {
			...input,
			...{
				data: {
					amount: input.data.amount,
					recipientId: input.data.to,
					data: input.data.memo,
				},
			},
		});
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registersecondMnemonic", {
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
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerDelegate", input);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("castVotes", input);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
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

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async businessRegistration(
		input: Contracts.BusinessRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "businessRegistration");
	}

	public async businessResignation(
		input: Contracts.BusinessResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "businessResignation");
	}

	public async businessUpdate(
		input: Contracts.BusinessUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "businessUpdate");
	}

	public async bridgechainRegistration(
		input: Contracts.BridgechainRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainRegistration");
	}

	public async bridgechainResignation(
		input: Contracts.BridgechainResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainResignation");
	}

	public async bridgechainUpdate(
		input: Contracts.BridgechainUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainUpdate");
	}

	private async createFromData(
		type: string,
		input: Contracts.KeyValuePair,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransaction> {
		const struct: Contracts.KeyValuePair = { ...input.data };

		struct.networkIdentifier = this.#network;

		if (callback) {
			callback({ struct });
		}

		// todo: support multisignature

		if (input.sign.mnemonic) {
			struct.mnemonic = BIP39.normalize(input.sign.mnemonic);
		}

		if (input.sign.secondMnemonic) {
			struct.secondMnemonic = BIP39.normalize(input.sign.secondMnemonic);
		}

		if (this.#network === manifest.networks.betanet.crypto.networkId) {
			return transactionsBeta[type](struct);
		}

		return transactions[type](struct);
	}
}
