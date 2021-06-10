"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPrivateKey = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../helpers");
const registerPrivateKey = () => [
	{
		name: "identity.privateKey.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await helpers_1.makeCoin({ coin, network })).privateKey().fromMnemonic(mnemonic);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, mnemonic: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.privateKey.fromWIF",
		async method({ coin, network, wif }) {
			return (await helpers_1.makeCoin({ coin, network })).privateKey().fromWIF(wif);
		},
		schema: joi_1.default.object({ ...helpers_1.baseSchema, wif: joi_1.default.string().required() }).required(),
	},
];
exports.registerPrivateKey = registerPrivateKey;
//# sourceMappingURL=private-key.js.map
