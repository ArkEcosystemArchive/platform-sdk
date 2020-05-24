import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

export class TransactionService implements Contracts.TransactionService {
	readonly #peer: string;

	private constructor(peer: string) {
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		try {
			return new TransactionService(config.get<string>("peer"));
		} catch {
			return new TransactionService(`${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`);
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const { client, signatureProvider } = this.getClient(input.sign.passphrase);

		const transfer = await client.transact(
			{
				actions: [
					{
						account: "eosio.token",
						name: "transfer",
						authorization: [
							{
								actor: input.data.from,
								permission: "active",
							},
						],
						data: {
							from: input.data.from,
							to: input.data.to,
							quantity: "0.0001 TNT",
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

		const keys = await signatureProvider.getAvailableKeys();
		transfer.requiredKeys = keys;
		transfer.chainId = "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12";

		const sigs = transfer.signatures || null;
		const signed = await signatureProvider.sign(transfer);

		if (sigs) {
			signed.signatures = signed.signatures.concat(sigs);
		}

		return signed;

		throw new Exceptions.NotImplemented(this.constructor.name, "transfer");
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
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

	private getClient(privateKey: string) {
		const signatureProvider: JsSignatureProvider = new JsSignatureProvider([privateKey]);

		return {
			client: new Api({
				rpc: new JsonRpc(this.#peer, { fetch }),
				signatureProvider,
				textDecoder: new TextDecoder(),
				textEncoder: new TextEncoder(),
			}),
			signatureProvider,
		};
	}
}
