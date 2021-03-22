import Joi from "joi";

import { makeCoin } from "../../helpers";

export const registerPrivateKey = () => [
	{
		name: "identity.privateKey.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin(coin, network)).identity().privateKey().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.privateKey.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin(coin, network)).identity().privateKey().fromWIF(wif);
		},
		schema: Joi.object({ wif: Joi.string().required() }).required(),
	},
];
