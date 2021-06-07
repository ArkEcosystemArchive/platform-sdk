import "jest-extended";
import "reflect-metadata";

import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { Coin } from "./coin";
import { CoinFactory } from "./coin-factory";

test("#make", async () => {
	expect(
		CoinFactory.make(
			{
				manifest: {
					name: "ARK",
					networks: {
						// @ts-ignore
						"ark.mainnet": {},
					},
				},
				schema: ValidatorSchema.object({
					network: ValidatorSchema.string().valid(
						"ark.mainnet",
						"ark.devnet",
						"compendia.mainnet",
						"compendia.testnet",
					),
					httpClient: ValidatorSchema.object(),
					services: ValidatorSchema.object({
						ledger: ValidatorSchema.object({
							transport: ValidatorSchema.any(),
						}),
					}).default(undefined),
				}),
				ServiceProvider: {
					make: jest.fn(),
				},
			},
			// @ts-ignore
			{ network: "ark.mainnet", httpClient: {} },
		),
	).toBeInstanceOf(Coin);
});
