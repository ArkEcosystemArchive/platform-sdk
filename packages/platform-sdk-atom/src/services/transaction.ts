import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { createSignedTransaction } from "@lunie/cosmos-api";
import { getNewWalletFromSeed, signWithPrivateKey } from "@lunie/cosmos-keys";

export class TransactionService implements Contracts.TransactionService {
	public constructor(network: string) {
		//
	}

	public async createTransfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		const privateKey = Buffer.from(getNewWalletFromSeed(input.sign.passphrase, "cosmos").privateKey, "hex");

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

	public async createSecondSignature(input: Contracts.SecondSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(input: Contracts.VoteInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(input: Contracts.MultiSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public async createIpfs(input: Contracts.IpfsInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(input: Contracts.MultiPaymentInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(
		input: Contracts.DelegateResignationInput,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(input: Contracts.HtlcLockInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(input: Contracts.HtlcClaimInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(input: Contracts.HtlcRefundInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
