import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Common from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import Web3 from "web3";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	@IoC.inject(IoC.BindingType.PrivateKeyService)
	private readonly privateKeyService!: Services.PrivateKeyService;

	#chain!: string;
	#peer!: string;
	#web3!: Web3;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#chain = this.configRepository.get("network");
		this.#peer = Helpers.randomHostFromConfig(this.configRepository);
		this.#web3 = new Web3(); // @TODO: provide a host
	}

	public async transfer(
		input: Services.TransferInput,
	): Promise<Contracts.SignedTransactionData> {
		try {
			const senderData = await this.addressService.fromMnemonic(input.signatory.signingKey());

			let privateKey: string;
			if (input.signatory.actsWithPrivateKey()) {
				privateKey = input.signatory.signingKey();
			} else {
				privateKey = (await this.privateKeyService.fromMnemonic(input.signatory.signingKey())).privateKey;
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

			return this.dataTransferObjectService.signedTransaction(
				transaction.hash().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
				"0x" + transaction.serialize().toString("hex"),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.get(`${this.#peer}/${path}`, query);

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
