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
exports.AbstractExtendedAddressService = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
let AbstractExtendedAddressService = class AbstractExtendedAddressService {
	async fromMnemonic(mnemonic, pageSize) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}
	async fromPrivateKey(privateKey, pageSize) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}
};
AbstractExtendedAddressService = __decorate([ioc_1.injectable()], AbstractExtendedAddressService);
exports.AbstractExtendedAddressService = AbstractExtendedAddressService;
//# sourceMappingURL=extended-address.service.js.map
