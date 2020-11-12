import querystring from "querystring";
import { number, object, string } from "yup";

export class URI {
	readonly #pattern: RegExp = new RegExp(/^(?:ark:)([-0-9a-zA-Z]{1,34})([-a-zA-Z0-9+&@#/%=~_|$?!:,.]*)$/);
	readonly #methods: string[] = ['transfer', 'vote', 'sign-message', 'register-delegate'];

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
			let method: string = parsed[1];
			const params: any = querystring.parse(parsed[2].substring(1));

			// When this is false we just have to assume that we are handling AIP13
			// unless we integrate the parsing more tightly to specific coins which
			// would enable us to validate against specific address validation rules.
			if (! this.#methods.includes(method)) {
				params.recipient = method;
				method = 'transfer';
			}

			const result = object()
				.shape(this.getSchema(method))
				.validateSync({ method, ...params });

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

	private getSchema(method: string): object {
		const baseSchema = {
			method: string().matches(/(transfer|vote|sign-message|register-delegate)/),
			coin: string().default('ark'),
			network: string().default('ark.mainnet'),
			fee: number(),
		};

		if (method === 'transfer') {
			return {
				...baseSchema,
				recipient: string().required(),
				amount: number(),
				memo: string(),
				vendorField: string(), // Legacy memo, not an ARK agnostic name
			};
		}

		if (method === 'vote') {
			return {
				...baseSchema,
				delegate: string().required(),
			};
		}

		if (method === 'sign-message') {
			return {
				message: string().required(),
			};
		}

		if (method === 'register-delegate') {
			return {
				...baseSchema,
				delegate: string().required(),
			};
		}

		throw new Error('Invalid method used in URI');
	}
}
