import Joi from "@hapi/joi";
import querystring from "querystring";

import { URIService as Contract } from "../../contracts/coins/uri";

export class URIService implements Contract {
	readonly #pattern: RegExp = new RegExp(/^(?:ark:)([-0-9a-zA-Z]{1,34})([-a-zA-Z0-9+&@#/%=~_|$?!:,.]*)$/);

	public serialize(input: Record<string, string>): string {
		const method: string = input.method;

		delete input.method;

		return `ark:${method}?${querystring.stringify(input)}`;
	}

	public deserialize(data: string): any {
		const parsed: RegExpExecArray | null = this.#pattern.exec(data);

		if (!this.#pattern.test(data) || !parsed) {
			throw new Error("The given data is malformed.");
		}

		const { value: result, error } = Joi.object({
			method: Joi.string().required(),
			coin: Joi.string().required(),
			network: Joi.string().required(),
			recipient: Joi.string().required(),
			amount: Joi.number().required(),
			memo: Joi.string().optional(),
		}).validate({
			method: parsed[1],
			...querystring.parse(parsed[2].substring(1)),
		});

		if (error) {
			throw new Error("The given data is malformed.");
		}

		for (const [key, value] of Object.entries(result)) {
			result[key] = this.decodeURIComponent(value);
		}

		return result;
	}

	private decodeURIComponent(value): string {
		while (value !== decodeURIComponent(value)) {
			value = decodeURIComponent(value);
		}

		return value;
	}
}
