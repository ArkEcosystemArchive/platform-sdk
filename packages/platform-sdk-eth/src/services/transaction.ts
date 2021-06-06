import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import Web3 from "web3";

import { SignedTransactionData } from "../dto";
import { IdentityService } from "./identity";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #http: HttpClient;
	readonly #chain: string;
	readonly #identity: IdentityService;
	readonly #peer: string;
	readonly #web3: Web3;

	private constructor(config: Coins.Config, identity: IdentityService) {
		super();

		this.#http = config.all().http;
		this.#chain = config.all().network;
		this.#identity = identity;
		this.#peer = Helpers.randomHostFromConfig(config);
		this.#web3 = new Web3(); // @TODO: provide a host
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService(config, await IdentityService.__construct(config));
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			const senderData = await this.#identity.address().fromMnemonic(input.signatory.signingKey());

			let privateKey: string;
			if (input.signatory.actsWithPrivateKey()) {
				privateKey = input.signatory.signingKey();
			} else {
				privateKey = (await this.#identity.privateKey().fromMnemonic(input.signatory.signingKey())).privateKey;
			}

			const { nonce } = await this.#get(`wallets/${senderData.address}`);

			let data: object;

			if (input.contract && input.contract.address) {
				data = {
					nonce: Web3.utils.toHex(Web3.utils.toBN(nonce).add(Web3.utils.toBN("1"))),
					gasPrice: Web3.utils.toHex(input.fee!),
					gasLimit: Web3.utils.toHex(input.feeLimit!),
					to: input.contract.address,
					value: "0x0",
					data: this.#createContract(input.contract.address)
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
				common: Common.forCustomChain(this.#chain, {}),
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

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	#createContract(contractAddress: string) {
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
