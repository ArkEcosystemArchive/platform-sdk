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
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSignatoryService = void 0;
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
const signatories_1 = require("../signatories");
let AbstractSignatoryService = class AbstractSignatoryService {
	constructor() {
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "extendedAddressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "keyPairService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "privateKeyService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "publicKeyService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "wifService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async mnemonic(mnemonic, options) {
		return new signatories_1.Signatory(
			new signatories_1.MnemonicSignatory({
				signingKey: mnemonic,
				address: (await this.addressService.fromMnemonic(mnemonic, options)).address,
				publicKey: (await this.publicKeyService.fromMnemonic(mnemonic, options)).publicKey,
				privateKey: (await this.privateKeyService.fromMnemonic(mnemonic, options)).privateKey,
			}),
		);
	}
	async secondaryMnemonic(signingKey, confirmKey, options) {
		return new signatories_1.Signatory(
			new signatories_1.SecondaryMnemonicSignatory({
				signingKey,
				confirmKey,
				address: (await this.addressService.fromMnemonic(signingKey, options)).address,
				publicKey: (await this.publicKeyService.fromMnemonic(signingKey, options)).publicKey,
				privateKey: (await this.privateKeyService.fromMnemonic(signingKey, options)).privateKey,
			}),
		);
	}
	async multiMnemonic(mnemonics) {
		return new signatories_1.Signatory(
			new signatories_1.MultiMnemonicSignatory(
				mnemonics,
				(await Promise.all(mnemonics.map((mnemonic) => this.publicKeyService.fromMnemonic(mnemonic)))).map(
					({ publicKey }) => publicKey,
				),
			),
		);
	}
	async wif(primary) {
		return new signatories_1.Signatory(
			new signatories_1.WIFSignatory({
				signingKey: primary,
				address: (await this.addressService.fromWIF(primary)).address,
				publicKey: (await this.publicKeyService.fromWIF(primary)).publicKey,
				privateKey: (await this.privateKeyService.fromWIF(primary)).privateKey,
			}),
		);
	}
	async secondaryWif(signingKey, confirmKey) {
		return new signatories_1.Signatory(
			new signatories_1.SecondaryWIFSignatory({
				signingKey,
				confirmKey,
				address: (await this.addressService.fromWIF(signingKey)).address,
				publicKey: (await this.publicKeyService.fromWIF(signingKey)).publicKey,
				privateKey: (await this.privateKeyService.fromWIF(signingKey)).privateKey,
			}),
		);
	}
	async privateKey(privateKey, options) {
		return new signatories_1.Signatory(
			new signatories_1.PrivateKeySignatory({
				signingKey: privateKey,
				address: (await this.addressService.fromPrivateKey(privateKey, options)).address,
			}),
		);
	}
	async senderPublicKey(publicKey, options) {
		return new signatories_1.Signatory(
			new signatories_1.SenderPublicKeySignatory({
				signingKey: publicKey,
				address: (await this.addressService.fromPublicKey(publicKey, options)).address,
				publicKey,
			}),
		);
	}
	async multiSignature(min, publicKeys) {
		return new signatories_1.Signatory(new signatories_1.MultiSignatureSignatory({ min, publicKeys }));
	}
	async ledger(path) {
		return new signatories_1.Signatory(new signatories_1.LedgerSignatory(path));
	}
};
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.AddressService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"addressService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.ExtendedAddressService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"extendedAddressService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.KeyPairService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"keyPairService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.PrivateKeyService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"privateKeyService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.PublicKeyService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"publicKeyService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.WIFService), __metadata("design:type", Object)],
	AbstractSignatoryService.prototype,
	"wifService",
	void 0,
);
AbstractSignatoryService = __decorate([ioc_1.injectable()], AbstractSignatoryService);
exports.AbstractSignatoryService = AbstractSignatoryService;
//# sourceMappingURL=signatory.service.js.map
