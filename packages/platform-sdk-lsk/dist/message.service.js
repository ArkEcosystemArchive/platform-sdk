"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const lisk_cryptography_1 = require("@liskhq/lisk-cryptography");
let MessageService = class MessageService extends platform_sdk_1.Services.AbstractMessageService {
	async sign(input) {
		try {
			const { message, publicKey, signature } = lisk_cryptography_1.signMessageWithPassphrase(
				input.message,
				input.signatory.signingKey(),
			);
			return { message, signatory: publicKey, signature };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async verify(input) {
		try {
			return lisk_cryptography_1.verifyMessageWithPublicKey({
				message: input.message,
				publicKey: input.signatory,
				signature: input.signature,
			});
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
MessageService = __decorate([platform_sdk_1.IoC.injectable()], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
