import Joi from "joi";

export const ValidatorSchema = Joi;

/**
 * Implements data validation functionality, powered by joi, formerly @hapi/joi.
 *
 * @export
 * @class Validator
 */
export class Validator {
	/**
	 * The latest validation error.
	 *
	 * @type {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	#error: Joi.ValidationError | undefined;

	/**
	 * Compares the given data against the given schema.
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
	 * Indicates wheter the data has passed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	public passes(): boolean {
		return this.#error === undefined;
	}

	/**
	 * Indicates wheter the data has failed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	public fails(): boolean {
		return !this.passes();
	}

	/**
	 * Returns the human-readable explanation for the latest occurred.
	 *
	 * @returns {(string[] | undefined)}
	 * @memberof Validator
	 */
	public errors(): string[] | undefined {
		return this.#error?.details.map((error: Joi.ValidationErrorItem) => error.message);
	}

	/**
	 * Returns the latest error that has occurred.
	 *
	 * @returns {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	public error(): Joi.ValidationError | undefined {
		return this.#error;
	}
}
