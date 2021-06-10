"use strict";
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
var _URI_instances, _URI_pattern, _URI_methods, _URI_decodeURIComponent, _URI_getSchema;
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = void 0;
const joi_1 = __importDefault(require("joi"));
const querystring_1 = __importDefault(require("querystring"));
/**
 * An AIP13/26 compliant serialiser and deserialiser.
 *
 * @export
 * @class URI
 */
class URI {
	constructor() {
		_URI_instances.add(this);
		/**
		 * The pattern that represents a valid URI according to AIP13/26.
		 *
		 * @type {RegExp}
		 * @memberof URI
		 */
		_URI_pattern.set(this, new RegExp(/^(?:ark:)([-0-9a-zA-Z]{1,34})([-a-zA-Z0-9+&@#/%=~_|$?!:,.]*)$/));
		/**
		 * The methods that represent valid actions to be performed through an URI.
		 *
		 * @type {string[]}
		 * @memberof URI
		 */
		_URI_methods.set(this, ["transfer", "vote", "sign-message", "register-delegate"]);
	}
	/**
	 * Creates an URI from the given input.
	 *
	 * @param {Record<string, string>} input
	 * @returns {string}
	 * @memberof URI
	 */
	serialize(input) {
		const method = input.method;
		delete input.method;
		return `ark:${method}?${querystring_1.default.stringify(input)}`;
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
	deserialize(data) {
		const parsed = __classPrivateFieldGet(this, _URI_pattern, "f").exec(data);
		if (!__classPrivateFieldGet(this, _URI_pattern, "f").test(data) || !parsed) {
			throw new Error("The given data is malformed.");
		}
		try {
			let method = parsed[1];
			const params = querystring_1.default.parse(parsed[2].substring(1));
			// When this is false we just have to assume that we are handling AIP13
			// unless we integrate the parsing more tightly to specific coins which
			// would enable us to validate against specific address validation rules.
			if (!__classPrivateFieldGet(this, _URI_methods, "f").includes(method)) {
				params.recipient = method;
				method = "transfer";
			}
			const { error, value: result } = joi_1.default
				.object(__classPrivateFieldGet(this, _URI_instances, "m", _URI_getSchema).call(this, method))
				.validate({ method, ...params });
			if (error !== undefined) {
				throw error;
			}
			for (const [key, value] of Object.entries(result)) {
				result[key] = __classPrivateFieldGet(this, _URI_instances, "m", _URI_decodeURIComponent).call(
					this,
					value,
				);
			}
			return result;
		} catch (error) {
			throw new Error(`The given data is malformed: ${error}`);
		}
	}
}
exports.URI = URI;
(_URI_pattern = new WeakMap()),
	(_URI_methods = new WeakMap()),
	(_URI_instances = new WeakSet()),
	(_URI_decodeURIComponent = function _URI_decodeURIComponent(value) {
		while (value !== decodeURIComponent(value)) {
			value = decodeURIComponent(value);
		}
		return value;
	}),
	(_URI_getSchema = function _URI_getSchema(method) {
		const baseSchema = {
			method: joi_1.default.string().pattern(/(transfer|vote|sign-message|register-delegate)/),
			coin: joi_1.default.string().default("ark"),
			network: joi_1.default.string().default("ark.mainnet"),
			fee: joi_1.default.number(),
		};
		if (method === "vote") {
			return {
				...baseSchema,
				delegate: joi_1.default.string().required(),
			};
		}
		if (method === "sign-message") {
			return {
				...baseSchema,
				message: joi_1.default.string().required(),
			};
		}
		if (method === "register-delegate") {
			return {
				...baseSchema,
				delegate: joi_1.default.string().required(),
			};
		}
		return {
			...baseSchema,
			recipient: joi_1.default.string().required(),
			amount: joi_1.default.number(),
			memo: joi_1.default.string(),
			vendorField: joi_1.default.string(),
			label: joi_1.default.string(),
			relay: joi_1.default.string(), // ???
		};
	});
//# sourceMappingURL=uri.js.map
