import Joi from "joi";
import querystring from "querystring";

/**
 * An AIP13/26 compliant serialiser and deserialiser.
 *
 * @export
 * @class URI
 */
export class URI {
	/**
	 * The pattern that represents a valid URI according to AIP13/26.
	 *
	 * @type {RegExp}
	 * @memberof URI
	 */
	readonly #pattern: RegExp = new RegExp(/^(?:ark:)([-0-9a-zA-Z]{1,34})([-a-zA-Z0-9+&@#/%=~_|$?!:,.]*)$/);

	/**
	 * The methods that represent valid actions to be performed through an URI.
	 *
	 * @type {string[]}
	 * @memberof URI
	 */
	readonly #methods: string[] = ["transfer", "vote", "sign-message", "register-delegate"];

	/**
	 * Creates an URI from the given input.
	 *
	 * @param {Record<string, string>} input
	 * @returns {string}
	 * @memberof URI
	 */
	public serialize(input: Record<string, string | number>): string {
		const method: string = input.method as string;

		delete input.method;

		return `ark:${method}?${querystring.stringify(input)}`;
	}

	/**
	 * Parses the given value according to AIP13/26 specifications and throws
	 * if it encounters any data or formats that are not known according to
	 * specifications.
	 *
	 * These should throw an error because we don't want to pass on data to
	 * the end-user that is unknown and could cause harm to the user and/or
	 * application which would be unable to handle the deserialised content.
	 *
	 * @param {string} data
	 * @returns {*}
	 * @memberof URI
	 */
	public deserialize(data: string): any {
		const parsed: RegExpExecArray | null = this.#pattern.exec(data);

		if (!this.#pattern.test(data) || !parsed) {
			throw new Error("The given data is malformed.");
		}

		try {
			let method: string = parsed[1];
			const params = querystring.parse(parsed[2].substring(1));

			// When this is false we just have to assume that we are handling AIP13
			// unless we integrate the parsing more tightly to specific coins which
			// would enable us to validate against specific address validation rules.
			if (!this.#methods.includes(method)) {
				params.recipient = method;
				method = "transfer";
			}

			const { error, value: result } = Joi.object(this.#getSchema(method)).validate({ method, ...params });

			if (error !== undefined) {
				throw error;
			}

			for (const [key, value] of Object.entries(result)) {
				result[key] = this.#decodeURIComponent(value);
			}

			return result;
		} catch (error) {
			throw new Error(`The given data is malformed: ${error}`);
		}
	}

	/**
	 * Decodes the value until it no longer contains encoded segments.
	 *
	 * @private
	 * @param {*} value
	 * @returns {string}
	 * @memberof URI
	 */
	#decodeURIComponent(value): string {
		while (value !== decodeURIComponent(value)) {
			value = decodeURIComponent(value);
		}

		return value;
	}

	/**
	 * Get the schema that should be used to validate the deserialised data.
	 *
	 * @private
	 * @param {string} method
	 * @returns {object}
	 * @memberof URI
	 */
	#getSchema(method: string): object {
		const baseSchema = {
			method: Joi.string().pattern(/(transfer|vote|sign-message|register-delegate)/),
			coin: Joi.string().required(),
			network: Joi.string().required(),
			fee: Joi.number(),
		};

		if (method === "vote") {
			return {
				...baseSchema,
				delegate: Joi.string().required(),
			};
		}

		if (method === "sign-message") {
			return {
				...baseSchema,
				message: Joi.string().required(),
			};
		}

		if (method === "register-delegate") {
			return {
				...baseSchema,
				delegate: Joi.string().required(),
			};
		}

		return {
			...baseSchema,
			recipient: Joi.string().required(),
			amount: Joi.number(),
			memo: Joi.string(),
			vendorField: Joi.string(), // Legacy memo, not an ARK agnostic name
			label: Joi.string(), // ???
			relay: Joi.string(), // ???
		};
	}
}
