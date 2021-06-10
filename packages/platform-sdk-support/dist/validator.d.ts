import Joi from "joi";
export declare const ValidatorSchema: Joi.Root;
/**
 * Implements data validation functionality, powered by joi, formerly @hapi/joi.
 *
 * @export
 * @class Validator
 */
export declare class Validator {
	#private;
	/**
	 * Compares the given data against the given schema.
	 *
	 * @param {object} data
	 * @param {Joi.Schema} schema
	 * @returns {*}
	 * @memberof Validator
	 */
	validate(data: object, schema: Joi.Schema): any;
	/**
	 * Indicates wheter the data has passed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	passes(): boolean;
	/**
	 * Indicates wheter the data has failed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	fails(): boolean;
	/**
	 * Returns the human-readable explanation for the latest occurred.
	 *
	 * @returns {(string[] | undefined)}
	 * @memberof Validator
	 */
	errors(): string[] | undefined;
	/**
	 * Returns the latest error that has occurred.
	 *
	 * @returns {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	error(): Joi.ValidationError | undefined;
}
