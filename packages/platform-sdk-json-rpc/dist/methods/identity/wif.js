"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWIF = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../helpers");
const registerWIF = () => [
	{
		name: "identity.wif.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await helpers_1.makeCoin({ coin, network })).wif().fromMnemonic(mnemonic);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, mnemonic: joi_1.default.string().required() })
			.required(),
	},
	{
		name: "identity.wif.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await helpers_1.makeCoin({ coin, network })).wif().fromPrivateKey(privateKey);
		},
		schema: joi_1.default
			.object({ ...helpers_1.baseSchema, privateKey: joi_1.default.string().required() })
			.required(),
	},
];
exports.registerWIF = registerWIF;
//# sourceMappingURL=wif.js.map
