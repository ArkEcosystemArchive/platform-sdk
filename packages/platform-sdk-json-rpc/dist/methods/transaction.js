"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTransaction = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../helpers");
const registerTransaction = () => [
	{
		name: "transaction.transfer",
		async method(input) {
			const coin = await helpers_1.makeCoin(input);
			const signedTransaction = await coin.transaction().transfer({
				...input,
				signatory: await coin.signatory().mnemonic(input.sign.mnemonic),
			});
			return {
				id: signedTransaction.id(),
				data: signedTransaction.toBroadcast(),
			};
		},
		schema: joi_1.default
			.object({
				...helpers_1.baseSchema,
				// Specific
				data: joi_1.default.object({
					amount: joi_1.default.string().required(),
					to: joi_1.default.string().required(),
					memo: joi_1.default.string(),
					expiration: joi_1.default.number(),
				}),
				// Shared
				fee: joi_1.default.string(),
				feeLimit: joi_1.default.string(),
				nonce: joi_1.default.string(),
				from: joi_1.default.string(),
				sign: joi_1.default.object({
					mnemonic: joi_1.default.string(),
					mnemonics: joi_1.default.array().items(joi_1.default.string()),
					secondMnemonic: joi_1.default.string(),
					wif: joi_1.default.string(),
					secondWif: joi_1.default.string(),
					privateKey: joi_1.default.string(),
					multiSignature: joi_1.default.object({
						min: joi_1.default.number(),
						publicKeys: joi_1.default.array().items(joi_1.default.string()),
					}),
					senderPublicKey: joi_1.default.string(),
					signature: joi_1.default.string(),
				}),
				contract: joi_1.default.object({
					address: joi_1.default.string(),
				}),
			})
			.required(),
	},
];
exports.registerTransaction = registerTransaction;
//# sourceMappingURL=transaction.js.map
