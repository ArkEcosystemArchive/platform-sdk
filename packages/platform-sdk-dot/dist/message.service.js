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
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const constants_1 = require("./constants");
let MessageService = class MessageService extends platform_sdk_1.Services.AbstractMessageService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "keyring", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async sign(input) {
		try {
			const keypair = this.keyring.addFromUri(input.signatory.signingKey());
			return {
				message: input.message,
				signatory: keypair.address,
				signature: util_1.u8aToHex(keypair.sign(util_1.stringToU8a(input.message))),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async verify(input) {
		try {
			return util_crypto_1.signatureVerify(
				util_1.stringToU8a(input.message),
				util_1.hexToU8a(input.signature),
				input.signatory,
			).isValid;
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.Keyring), __metadata("design:type", keyring_1.Keyring)],
	MessageService.prototype,
	"keyring",
	void 0,
);
MessageService = __decorate([platform_sdk_1.IoC.injectable()], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
