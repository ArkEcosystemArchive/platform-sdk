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
exports.AbstractServiceProvider = void 0;
const inversify_1 = require("inversify");
const coins_1 = require("../coins");
const services_1 = require("../services");
const service_provider_contract_1 = require("./service-provider.contract");
let AbstractServiceProvider = class AbstractServiceProvider {
	constructor() {
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async compose(services, container) {
		container.singleton(
			service_provider_contract_1.BindingType.AddressService,
			services.AddressService || services_1.AbstractAddressService,
		);
		container.singleton(service_provider_contract_1.BindingType.BigNumberService, services_1.BigNumberService);
		container.singleton(
			service_provider_contract_1.BindingType.ClientService,
			services.ClientService || services_1.AbstractClientService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.DataTransferObjectService,
			services.DataTransferObjectService || services_1.AbstractDataTransferObjectService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.ExtendedAddressService,
			services.ExtendedAddressService || services_1.AbstractExtendedAddressService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.FeeService,
			services.FeeService || services_1.AbstractFeeService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.KeyPairService,
			services.KeyPairService || services_1.AbstractKeyPairService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.KnownWalletService,
			services.KnownWalletService || services_1.AbstractKnownWalletService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.LedgerService,
			services.LedgerService || services_1.AbstractLedgerService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.LinkService,
			services.LinkService || services_1.AbstractLinkService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.MessageService,
			services.MessageService || services_1.AbstractMessageService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.MultiSignatureService,
			services.MultiSignatureService || services_1.AbstractMultiSignatureService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.PrivateKeyService,
			services.PrivateKeyService || services_1.AbstractPrivateKeyService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.PublicKeyService,
			services.PublicKeyService || services_1.AbstractPublicKeyService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.SignatoryService,
			services.SignatoryService || services_1.AbstractSignatoryService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.TransactionService,
			services.TransactionService || services_1.AbstractTransactionService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.WalletDiscoveryService,
			services.WalletDiscoveryService || services_1.AbstractWalletDiscoveryService,
		);
		container.singleton(
			service_provider_contract_1.BindingType.WIFService,
			services.WIFService || services_1.AbstractWIFService,
		);
	}
};
__decorate(
	[
		inversify_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", coins_1.ConfigRepository),
	],
	AbstractServiceProvider.prototype,
	"configRepository",
	void 0,
);
AbstractServiceProvider = __decorate([inversify_1.injectable()], AbstractServiceProvider);
exports.AbstractServiceProvider = AbstractServiceProvider;
//# sourceMappingURL=service-provider.js.map
