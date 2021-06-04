/* istanbul ignore file */

import Joi, { Schema } from "joi";

import { Config } from "./coins";
import { Container, ServiceKeys } from "./ioc";
import { BigNumberService } from "./services";

export const createConfig = (config?: object, schema?: Schema): Config =>
	new Config(
		config || {
			network: {
				currency: {
					decimals: 1e8,
				},
			},
		},
		schema ||
			Joi.object({
				network: Joi.object({
					currency: Joi.object({
						decimals: Joi.number(),
					}),
				}),
			}),
	);

export const bindBigNumberService = (container: Container, config?: Config): void => {
	if (container.missing(ServiceKeys.BigNumberService)) {
		container.constant(ServiceKeys.BigNumberService, new BigNumberService(config || createConfig()));
	}
};
