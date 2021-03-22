import Joi from "joi";

import { makeCoin } from "../../helpers";

export const registerWIF = () => [
	{
		name: "identity.wif.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin(coin, network)).identity().wif().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.wif.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await makeCoin(coin, network)).identity().wif().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ privateKey: Joi.string().required() }).required(),
	},
];
