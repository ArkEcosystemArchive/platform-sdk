import "jest-extended";
import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

import { CoinFactory } from "./coin-factory";
import { Coin } from "./coin";

test("#make", async () => {
	await expect(CoinFactory.make({
		manifest: {
			name: "ARK",
			networks: {
				"ark.mainnet": {},
			},
		},
		schema: ValidatorSchema.object().shape({
			network: ValidatorSchema.string().oneOf(["ark.mainnet", "ark.devnet", "compendia.mainnet", "compendia.testnet"]),
			peer: ValidatorSchema.string().url().notRequired(),
			peerMultiSignature: ValidatorSchema.string().url().notRequired(),
			httpClient: ValidatorSchema.object(),
			services: ValidatorSchema.object()
				.shape({
					ledger: ValidatorSchema.object().shape({
						transport: ValidatorSchema.mixed().notRequired(),
					}),
				})
				.default(undefined),
		}),
		ServiceProvider: {
			make: jest.fn()
		}
		// @ts-ignore
	}, { network: "ark.mainnet", httpClient: jest.fn() })).resolves.toBeInstanceOf(Coin);
});
