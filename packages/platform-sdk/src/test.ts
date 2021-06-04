import Joi, { Schema } from "joi";

import { Config } from "./coins";

export const createConfig = (config?: object, schema?: Schema): Config => new Config(config || {
	network: {
		currency: {
			decimals: 1e8,
		}
	}
}, schema || Joi.object({
	network: Joi.object({
		currency: Joi.object({
			decimals: Joi.number(),
		})
	})
}))
