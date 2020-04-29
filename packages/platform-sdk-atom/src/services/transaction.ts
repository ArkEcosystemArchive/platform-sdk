import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { createSignedTransaction } from "@lunie/cosmos-api";
import { getNewWalletFromSeed, signWithPrivateKey } from "@lunie/cosmos-keys";

export class TransactionService implements Contracts.TransactionService {
	public constructor (network: string) {
		//
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<object> {
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

	public createSecondSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public createIpfs(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
