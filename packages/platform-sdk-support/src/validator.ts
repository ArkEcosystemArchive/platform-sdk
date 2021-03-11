import Joi from "joi";

export const ValidatorSchema = Joi;

/**
 *
 *
 * @export
 * @class Validator
 */
export class Validator {
	/**
	 *
	 *
	 * @type {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	#error: Joi.ValidationError | undefined;

	/**
	 *
	 *
	 * @param {object} data
	 * @param {Joi.Schema} schema
	 * @returns {*}
	 * @memberof Validator
	 */
	public validate(data: object, schema: Joi.Schema): any {
		const { error, value } = schema.validate(data);

		this.#error = error;

		return value;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	public passes(): boolean {
		return this.#error === undefined;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	public fails(): boolean {
		return !this.passes();
	}

	/**
	 *
	 *
	 * @returns {(string[] | undefined)}
	 * @memberof Validator
	 */
	public errors(): string[] | undefined {
		return this.#error?.details.map((error: Joi.ValidationErrorItem) => error.message);
	}

	/**
	 *
	 *
	 * @returns {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	public error(): Joi.ValidationError | undefined {
		return this.#error;
	}
}
