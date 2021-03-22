import Joi from "joi";

import { makeCoin } from "../../helpers";

export const registerAddress = () => [
	{
		name: "identity.address.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin(coin, network)).identity().address().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromMultiSignature",
		async method({ coin, network, min, publicKeys }) {
			return (await makeCoin(coin, network)).identity().address().fromMultiSignature(min, publicKeys);
		},
		schema: Joi.object()
			.keys({ min: Joi.string().required(), publicKeys: Joi.array().items(Joi.string()) })
			.required(),
	},
	{
		name: "identity.address.fromPublicKey",
		async method({ coin, network, publicKey }) {
			return (await makeCoin(coin, network)).identity().address().fromPublicKey(publicKey);
		},
		schema: Joi.object({ publicKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await makeCoin(coin, network)).identity().address().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin(coin, network)).identity().address().fromWIF(wif);
		},
		schema: Joi.object({ wif: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.validate",
		async method({ coin, network, address }) {
			return (await makeCoin(coin, network)).identity().address().validate(address);
		},
		schema: Joi.object({ address: Joi.string().required() }).required(),
	},
];
