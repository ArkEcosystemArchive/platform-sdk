import { Coins, Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #peer;
	readonly #chain: string;
	readonly #identity;
	readonly #web3;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#peer = opts.peer;
		this.#chain = opts.network;
		this.#identity = opts.identity;
		this.#web3 = new Web3(""); // todo: provide a host?
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			...config.all(),
			identity: await IdentityService.construct(config),
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const senderAddress: string = await this.#identity.address().fromPassphrase(input.sign.passphrase);
		const privateKey: string =
			input.sign.privateKey || (await this.#identity.privateKey().fromPassphrase(input.sign.passphrase));

		const { nonce } = await this.get(`wallets/${senderAddress}`);

		let data: object;

		if (input.contract && input.contract.address) {
			data = {
				nonce: Web3.utils.toHex(Web3.utils.toBN(nonce).add(Web3.utils.toBN("1"))),
				gasPrice: Web3.utils.toHex(4 * 1e9),
				gasLimit: Web3.utils.toHex(4000000),
				to: input.contract.address,
				value: "0x0",
				data: this.createContract(input.contract.address)
					.methods.transfer(input.data.to, input.data.amount)
					.encodeABI(),
			};
		} else {
			data = {
				nonce: Web3.utils.toHex(Web3.utils.toBN(nonce).add(Web3.utils.toBN("1"))),
				gasLimit: Web3.utils.toHex(input.feeLimit),
				gasPrice: Web3.utils.toHex(input.fee),
				to: input.data.to,
				value: Web3.utils.toHex(Web3.utils.toWei(`${input.data.amount}`, "wei")),
				// data: Utils.Buffoon.fromUTF8(input.to.memo),
			};
		}

		const transaction: Transaction = new Transaction(data, { chain: this.#chain });

		transaction.sign(Utils.Buffoon.fromHex(privateKey));

		return "0x" + transaction.serialize().toString("hex");
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

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#peer).get(path, query);
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
