import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerWIF = (coin: Coins.Coin) => [
	{
		name: "identity.wif.fromMnemonic",
		async method({ mnemonic }) {
			return coin.identity().wif().fromMnemonic(mnemonic);
		},
		schema: Joi.object().keys({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.wif.fromPrivateKey",
		async method({ privateKey }) {
			return coin.identity().wif().fromPrivateKey(privateKey);
		},
		schema: Joi.object().keys({ privateKey: Joi.string().required() }).required(),
	},
]
