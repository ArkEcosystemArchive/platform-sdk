import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { createHash } from "crypto";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

import { SignedTransactionData } from "../dto";

export class TransactionService implements Contracts.TransactionService {
	readonly #networkId: string;
	readonly #peer: string;

	private constructor({ networkId, peer }) {
		this.#networkId = networkId;
		this.#peer = peer;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			networkId: config.get<string>(Coins.ConfigKey.CryptoNetworkId),
			peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (!input.sign.mnemonic) {
				throw new Error("No mnemonic provided.");
			}

			const { client, signatureProvider } = this.getClient(input.sign.mnemonic);

			const transfer = await client.transact(
				{
					actions: [
						{
							account: "eosio.token",
							name: "transfer",
							authorization: [
								{
									actor: input.from,
									permission: "active",
								},
							],
							data: {
								from: input.from,
								to: input.data.to,
								quantity: "0.0001 TNT", // todo: use network specific token
								memo: input.data.memo,
							},
						},
					],
				},
				{
					blocksBehind: 3,
					expireSeconds: 30,
					broadcast: false,
					sign: false,
				},
			);

			const keys: string[] = await signatureProvider.getAvailableKeys();
			transfer.requiredKeys = keys;
			transfer.chainId = this.#networkId;

			const signatures = transfer.signatures || null;
			const transaction = await signatureProvider.sign(transfer);

			if (signatures) {
				transaction.signatures = transaction.signatures.concat(signatures);
			}

			return new SignedTransactionData(
				createHash("sha256").update(transaction.serializedTransaction).digest("hex"),
				transaction,
				transaction,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}

	private getClient(privateKey: string) {
		const signatureProvider: JsSignatureProvider = new JsSignatureProvider([privateKey]);

		return {
			client: new Api({
				rpc: new JsonRpc(this.#peer, { fetch }),
				signatureProvider,
				// @ts-ignore - this started to error out of nowhere when building
				textEncoder: new TextEncoder(),
				// @ts-ignore - this started to error out of nowhere when building
				textDecoder: new TextDecoder(),
			}),
			signatureProvider,
		};
	}
}
