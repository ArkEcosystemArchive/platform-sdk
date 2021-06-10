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
const cardano_serialization_lib_nodejs_1 = require("@emurgo/cardano-serialization-lib-nodejs");
const shelley_1 = require("./shelley");
let MessageService = class MessageService extends platform_sdk_1.Services.AbstractMessageService {
	async sign(input) {
		try {
			const privateKey = shelley_1.deriveRootKey(input.signatory.signingKey());
			return {
				message: input.message,
				signatory: privateKey.to_public().to_raw_key().to_bech32(),
				signature: privateKey.to_raw_key().sign(Buffer.from(input.message, "utf8")).to_bech32(),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async verify(input) {
		try {
			return cardano_serialization_lib_nodejs_1.PublicKey.from_bech32(input.signatory).verify(
				Buffer.from(input.message, "utf8"),
				cardano_serialization_lib_nodejs_1.Ed25519Signature.from_bech32(input.signature),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
MessageService = __decorate([platform_sdk_1.IoC.injectable()], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
