import "jest-extended";
import Joi from "joi";

import { BigNumberService } from "./big-number.service";
import { Config } from "../coins";

test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])("#make(%s)", async (power) => {
	const subject = new BigNumberService(
		new Config({
			network: {
				currency: {
					decimals: power,
				}
			}
		}, Joi.object({
			network: Joi.object({
				currency: Joi.object({
					decimals: Joi.number(),
				})
			})
		}))
	);

	expect(subject.make(`1${"0".repeat(power)}`).toHuman()).toBe("1");
});
