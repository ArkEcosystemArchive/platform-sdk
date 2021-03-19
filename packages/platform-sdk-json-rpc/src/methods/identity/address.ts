import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerAddress = (coin: Coins.Coin) => [
	{
		name: "identity.address.fromMnemonic",
		async method({ mnemonic }) {
			return coin.identity().address().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromMultiSignature",
		async method({ min, publicKeys }) {
			return coin.identity().address().fromMultiSignature(min, publicKeys);
		},
		schema: Joi.object()
			.keys({ min: Joi.string().required(), publicKeys: Joi.array().items(Joi.string()) })
			.required(),
	},
	{
		name: "identity.address.fromPublicKey",
		async method({ publicKey }) {
			return coin.identity().address().fromPublicKey(publicKey);
		},
		schema: Joi.object({ publicKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromPrivateKey",
		async method({ privateKey }) {
			return coin.identity().address().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromWIF",
		async method({ wif }) {
			return coin.identity().address().fromWIF(wif);
		},
		schema: Joi.object({ wif: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.validate",
		async method({ address }) {
			return coin.identity().address().validate(address);
		},
		schema: Joi.object({ address: Joi.string().required() }).required(),
	},
];
