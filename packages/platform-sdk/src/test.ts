/* istanbul ignore file */

import Joi, { Schema } from "joi";

import { ConfigRepository } from "./coins";
import { Container, BindingType } from "./ioc";
import { BigNumberService } from "./services";

export const createConfig = (config?: object, schema?: Schema): ConfigRepository =>
	new ConfigRepository(
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

export const bindBigNumberService = (container: Container, config?: ConfigRepository): void => {
	if (config) {
		container.constant(BindingType.ConfigRepository, config);
	} else {
		container.constant(BindingType.ConfigRepository, createConfig());
	}

	if (container.missing(BindingType.BigNumberService)) {
		container.singleton(BindingType.BigNumberService, BigNumberService);
	}
};
