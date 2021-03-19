import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerKeys = (coin: Coins.Coin) => [
	{
		name: "identity.keys.fromMnemonic",
		async method({ mnemonic }) {
			return coin.identity().keys().fromMnemonic(mnemonic);
		},
		schema: Joi.object().keys({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.keys.fromPrivateKey",
		async method({ privateKey }) {
			return coin.identity().keys().fromPrivateKey(privateKey);
		},
		schema: Joi.object().keys({ privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.keys.fromWIF",
		async method({ wif }) {
			return coin.identity().keys().fromWIF(wif);
		},
		schema: Joi.object().keys({ wif: Joi.string().required() }).required(),
	},
]
