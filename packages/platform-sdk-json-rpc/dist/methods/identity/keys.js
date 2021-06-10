"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerKeys = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../helpers");
const registerKeys = () => [
	{
		name: "identity.keyPair.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await helpers_1.makeCoin({ coin, network })).keyPair().fromMnemonic(mnemonic);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, mnemonic: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.keyPair.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await helpers_1.makeCoin({ coin, network })).keyPair().fromPrivateKey(privateKey);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, privateKey: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.keyPair.fromWIF",
		async method({ coin, network, wif }) {
			return (await helpers_1.makeCoin({ coin, network })).keyPair().fromWIF(wif);
		},
		schema: joi_1.default.object({ ...helpers_1.baseSchema, wif: joi_1.default.string().required() }).required(),
	},
];
exports.registerKeys = registerKeys;
//# sourceMappingURL=keys.js.map
