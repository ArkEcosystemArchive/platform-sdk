import "jest-extended";

import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { Coin } from "./coin";
import { CoinFactory } from "./coin-factory";

test("#make", async () => {
	await expect(
		CoinFactory.make(
			{
				manifest: {
					name: "ARK",
					networks: {
						"ark.mainnet": {},
					},
				},
				schema: ValidatorSchema.object({
					network: ValidatorSchema.string().allow(
						"ark.mainnet",
						"ark.devnet",
						"compendia.mainnet",
						"compendia.testnet",
					),
					peer: ValidatorSchema.string().uri(),
					peerMultiSignature: ValidatorSchema.string().uri(),
					httpClient: ValidatorSchema.object(),
					services: ValidatorSchema.object({
							ledger: ValidatorSchema.object({
								transport: ValidatorSchema.any(),
							}),
						})
						.default(undefined),
				}),
				ServiceProvider: {
					make: jest.fn(),
				},
			},
			// @ts-ignore
			{ network: "ark.mainnet", httpClient: jest.fn() },
		),
	).resolves.toBeInstanceOf(Coin);
});
