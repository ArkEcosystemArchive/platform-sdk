"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../helpers");
const registerMessage = () => [
	{
		name: "message.sign",
		async method(input) {
			const coin = await helpers_1.makeCoin(input);
			return coin.message().sign({
				...input,
				signatory: await coin.signatory().mnemonic(input.sign.mnemonic),
			});
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				message: joi_1.default.string().required(),
				mnemonic: joi_1.default.string().required(),
			})
			.required(),
	},
	{
		name: "message.verify",
		async method(input) {
			return (await helpers_1.makeCoin(input)).message().verify(input);
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				message: joi_1.default.string().required(),
				signatory: joi_1.default.string().required(),
				signature: joi_1.default.string().required(),
			})
			.required(),
	},
];
exports.registerMessage = registerMessage;
//# sourceMappingURL=message.js.map
