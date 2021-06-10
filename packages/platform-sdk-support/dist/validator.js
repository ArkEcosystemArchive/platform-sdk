"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _Validator_error;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.ValidatorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ValidatorSchema = joi_1.default;
/**
 * Implements data validation functionality, powered by joi, formerly @hapi/joi.
 *
 * @export
 * @class Validator
 */
class Validator {
	constructor() {
		/**
		 * The latest validation error.
		 *
		 * @type {(Joi.ValidationError | undefined)}
		 * @memberof Validator
		 */
		_Validator_error.set(this, void 0);
	}
	/**
	 * Compares the given data against the given schema.
	 *
	 * @param {object} data
	 * @param {Joi.Schema} schema
	 * @returns {*}
	 * @memberof Validator
	 */
	validate(data, schema) {
		const { error, value } = schema.validate(data);
		__classPrivateFieldSet(this, _Validator_error, error, "f");
		return value;
	}
	/**
	 * Indicates wheter the data has passed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	passes() {
		return __classPrivateFieldGet(this, _Validator_error, "f") === undefined;
	}
	/**
	 * Indicates wheter the data has failed validation.
	 *
	 * @returns {boolean}
	 * @memberof Validator
	 */
	fails() {
		return !this.passes();
	}
	/**
	 * Returns the human-readable explanation for the latest occurred.
	 *
	 * @returns {(string[] | undefined)}
	 * @memberof Validator
	 */
	errors() {
		var _a;
		return (_a = __classPrivateFieldGet(this, _Validator_error, "f")) === null || _a === void 0
			? void 0
			: _a.details.map((error) => error.message);
	}
	/**
	 * Returns the latest error that has occurred.
	 *
	 * @returns {(Joi.ValidationError | undefined)}
	 * @memberof Validator
	 */
	error() {
		return __classPrivateFieldGet(this, _Validator_error, "f");
	}
}
exports.Validator = Validator;
_Validator_error = new WeakMap();
//# sourceMappingURL=validator.js.map
