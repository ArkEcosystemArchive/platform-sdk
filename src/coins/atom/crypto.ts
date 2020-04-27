import { signWithPrivateKey, getNewWalletFromSeed } from "@lunie/cosmos-keys";
import { createSignedTransaction } from "@lunie/cosmos-api";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Crypto } from "../contracts/crypto";

export class Atom implements Crypto {
	public constructor(network: string) {
		//
	}

	public async createTransfer(data: KeyValuePair): Promise<object> {
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

		throw new NotImplemented(this.constructor.name, "createTransfer");
	}

	public createSecondSignature(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public createIpfs(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
