import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerPrivateKey = (coin: Coins.Coin) => [
	{
		name: "identity.privateKey.fromMnemonic",
		async method({ mnemonic }) {
			return coin.identity().privateKey().fromMnemonic(mnemonic);
		},
		schema: Joi.object().keys({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.privateKey.fromWIF",
		async method({ wif }) {
			return coin.identity().privateKey().fromWIF(wif);
		},
		schema: Joi.object().keys({ wif: Joi.string().required() }).required(),
	},
];
