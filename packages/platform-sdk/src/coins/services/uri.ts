import querystring from "querystring";
import { number, object, string } from "yup";

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

		try {
			const result: any = object()
				.shape({
					method: string().required(),
					coin: string().required(),
					network: string().required(),
					recipient: string().required(),
					amount: number().required(),
					memo: string(),
				})
				.validateSync({
					method: parsed[1],
					...querystring.parse(parsed[2].substring(1)),
				});

			for (const [key, value] of Object.entries(result)) {
				result[key] = this.decodeURIComponent(value);
			}

			return result;
		} catch (error) {
			throw new Error(`The given data is malformed: ${error}`);
		}
	}

	private decodeURIComponent(value): string {
		while (value !== decodeURIComponent(value)) {
			value = decodeURIComponent(value);
		}

		return value;
	}
}
