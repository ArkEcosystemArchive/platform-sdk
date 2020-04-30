import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { createSignedTransaction } from "@lunie/cosmos-api";
import { getNewWalletFromSeed, signWithPrivateKey } from "@lunie/cosmos-keys";

export class TransactionService implements Contracts.TransactionService {
	public constructor(network: string) {
		//
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		const privateKey = Buffer.from(getNewWalletFromSeed(data.passphrase, "cosmos").privateKey, "hex");

		const signMessage = await createSignedTransaction(
			{ gas: 1000, gasPrices: [{ amount: "10", denom: "uatom" }], memo: `Hi from Lunie` },
			[
				{
					type: `cosmos-sdk/Send`,
					value: {
						inputs: [
							{
								address: `cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66`,
								coins: [{ denom: `STAKE`, amount: `1` }],
							},
						],
						outputs: [
							{
								address: `cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt`,
								coins: [{ denom: `STAKE`, amount: `1` }],
							},
						],
					},
				},
			],
			(signMessage) => signWithPrivateKey(signMessage, privateKey),
			"test-chain",
			0,
			12,
		);

		console.log(signMessage);

		// return createSignedTransaction(
		// 	{
		// 		gas: 1000,
		// 		gasPrices: [{ amount: "10", denom: "uatom" }],
		// 		memo: "Hi from Lunie",
		// 	},
		// 	[
		// 		{
		// 			type: "cosmos-sdk/Send",
		// 			value: {
		// 				inputs: [
		// 					{
		// 						address: "cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66",
		// 						coins: [{ denom: "STAKE", amount: "1" }],
		// 					},
		// 				],
		// 				outputs: [
		// 					{
		// 						address: "cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt",
		// 						coins: [{ denom: "STAKE", amount: "1" }],
		// 					},
		// 				],
		// 			},
		// 		},
		// 	],
		// 	(signMessage) => signWithPrivateKey(signMessage, privateKey),
		// 	"test-chain",
		// 	0,
		// 	12,
		// );

		throw new Exceptions.NotImplemented(this.constructor.name, "createTransfer");
	}

	public async createSecondSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public async createIpfs(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
