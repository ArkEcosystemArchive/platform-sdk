"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAddress = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../helpers");
const registerAddress = () => [
	{
		name: "identity.address.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await helpers_1.makeCoin({ coin, network })).address().fromMnemonic(mnemonic);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, mnemonic: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.address.fromMultiSignature",
		async method({ coin, network, min, publicKeys }) {
			return (await helpers_1.makeCoin({ coin, network })).address().fromMultiSignature(min, publicKeys);
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
		name: "identity.address.fromPublicKey",
		async method({ coin, network, publicKey }) {
			return (await helpers_1.makeCoin({ coin, network })).address().fromPublicKey(publicKey);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, publicKey: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.address.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await helpers_1.makeCoin({ coin, network })).address().fromPrivateKey(privateKey);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, privateKey: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.address.fromWIF",
		async method({ coin, network, wif }) {
			return (await helpers_1.makeCoin({ coin, network })).address().fromWIF(wif);
		},
		schema: joi_1.default.object({ ...helpers_1.baseSchema, wif: joi_1.default.string().required() }).required(),
	},
	{
		name: "identity.address.validate",
		async method({ coin, network, address }) {
			return (await helpers_1.makeCoin({ coin, network })).address().validate(address);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, address: joi_1.default.string().required() })
			.required(),
	},
];
exports.registerAddress = registerAddress;
//# sourceMappingURL=address.js.map
