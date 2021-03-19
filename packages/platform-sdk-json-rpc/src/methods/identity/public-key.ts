import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerPublicKey = (coin: Coins.Coin) => [
	{
		name: "identity.publicKey.fromMnemonic",
		async method({ mnemonic }) {
			return coin.identity().publicKey().fromMnemonic(mnemonic);
		},
		schema: Joi.object().keys({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.publicKey.fromMultiSignature",
		async method({ min, publicKeys }) {
			return coin.identity().publicKey().fromMultiSignature(min, publicKeys);
		},
		schema: Joi.object().keys({ min: Joi.string().required(), publicKeys: Joi.array().items(Joi.string()) }).required(),
	},
	{
		name: "identity.publicKey.fromWIF",
		async method({ wif }) {
			return coin.identity().publicKey().fromWIF(wif);
		},
		schema: Joi.object().keys({ wif: Joi.string().required() }).required(),
	},
]
