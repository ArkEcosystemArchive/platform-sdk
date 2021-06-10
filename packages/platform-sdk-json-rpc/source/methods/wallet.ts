import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerWallet = () => [
	{
		name: "wallet.generate",
		async method({ coin, network }) {
			const instance = await makeCoin({ coin, network });
			const mnemonic = BIP39.generate();

			return {
				address: await instance.address().fromMnemonic(mnemonic),
				publicKey: await instance.publicKey().fromMnemonic(mnemonic),
				mnemonic,
			};
		},
		schema: Joi.object(baseSchema).required(),
	},
];
