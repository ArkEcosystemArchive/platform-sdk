import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { Transaction } from "@ethereumjs/tx";
import Common from "@ethereumjs/common";
import Web3 from "web3";

import { SignedTransactionData } from "../dto";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #http: Contracts.HttpClient;
	readonly #peer;
	readonly #chain: string;
	readonly #identity;
	readonly #web3;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#http = opts.http;
		this.#peer = opts.peer;
		this.#chain = opts.network;
		this.#identity = opts.identity;
		this.#web3 = new Web3(""); // todo: provide a host?
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			...config.all(),
			identity: await IdentityService.__construct(config),
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
			const senderAddress: string = await this.#identity.address().fromMnemonic(input.sign.mnemonic);
			const privateKey: string =
				input.sign.privateKey || (await this.#identity.privateKey().fromMnemonic(input.sign.mnemonic));

			const { nonce } = await this.get(`wallets/${senderAddress}`);

			let data: object;

			if (input.contract && input.contract.address) {
				data = {
					nonce: Web3.utils.toHex(Web3.utils.toBN(nonce).add(Web3.utils.toBN("1"))),
					gasPrice: Web3.utils.toHex(input.fee!),
					gasLimit: Web3.utils.toHex(input.feeLimit!),
					to: input.contract.address,
					value: "0x0",
					data: this.createContract(input.contract.address)
						.methods.transfer(input.data.to, input.data.amount)
						.encodeABI(),
				};
			} else {
				data = {
					nonce: Web3.utils.toHex(Web3.utils.toBN(nonce).add(Web3.utils.toBN("1"))),
					gasLimit: Web3.utils.toHex(input.feeLimit!),
					gasPrice: Web3.utils.toHex(input.fee!),
					to: input.data.to,
					value: Web3.utils.toHex(Web3.utils.toWei(`${input.data.amount}`, "wei")),
				};

				if (input.data.memo) {
					// @ts-ignore
					data.data = Buffoon.fromUTF8(input.data.memo);
				}
			}

			const transaction: Transaction = new Transaction(data, {
				common: Common.forCustomChain(this.#chain, {})
			});

			transaction.sign(Buffoon.fromHex(privateKey));

			return new SignedTransactionData(
				transaction.hash().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
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

	public async estimateExpiration(value?: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "estimateExpiration");
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	private createContract(contractAddress: string) {
		return new this.#web3.eth.Contract(
			[
				{
					constant: false,
					inputs: [
						{
							name: "_to",
							type: "address",
						},
						{
							name: "_value",
							type: "uint256",
						},
					],
					name: "transfer",
					outputs: [
						{
							name: "success",
							type: "bool",
						},
					],
					payable: false,
					stateMutability: "nonpayable",
					type: "function",
				},
			],
			contractAddress,
		);
	}
}
