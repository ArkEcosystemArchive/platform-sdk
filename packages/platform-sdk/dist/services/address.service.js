"use strict";
/* istanbul ignore file */
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
exports.AbstractAddressService = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
let AbstractAddressService = class AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}
	async fromMultiSignature(min, publicKeys) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}
	async fromPublicKey(publicKey, options) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}
	async fromPrivateKey(privateKey, options) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}
	async fromWIF(wif) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromWIF.name);
	}
	async fromSecret(secret) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromSecret.name);
	}
	async validate(address) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}
};
AbstractAddressService = __decorate([ioc_1.injectable()], AbstractAddressService);
exports.AbstractAddressService = AbstractAddressService;
//# sourceMappingURL=address.service.js.map
