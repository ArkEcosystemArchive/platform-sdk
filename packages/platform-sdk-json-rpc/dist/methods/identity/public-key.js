"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPublicKey = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../helpers");
const registerPublicKey = () => [
	{
		name: "identity.publicKey.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await helpers_1.makeCoin({ coin, network })).publicKey().fromMnemonic(mnemonic);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, mnemonic: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.publicKey.fromMultiSignature",
		async method({ coin, network, min, publicKeys }) {
			return (await helpers_1.makeCoin({ coin, network })).publicKey().fromMultiSignature(min, publicKeys);
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				min: joi_1.default.string().required(),
				publicKeys: joi_1.default.array().items(joi_1.default.string()),
			})
			.required(),
	},
	{
		name: "identity.publicKey.fromWIF",
		async method({ coin, network, wif }) {
			return (await helpers_1.makeCoin({ coin, network })).publicKey().fromWIF(wif);
		},
		schema: joi_1.default.object({ ...helpers_1.baseSchema, wif: joi_1.default.string().required() }).required(),
	},
];
exports.registerPublicKey = registerPublicKey;
//# sourceMappingURL=public-key.js.map
