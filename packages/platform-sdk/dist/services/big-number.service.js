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
exports.BigNumberService = void 0;
require("reflect-metadata");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const config_1 = require("../coins/config");
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
let BigNumberService = class BigNumberService {
	constructor() {
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	make(value) {
		return platform_sdk_support_1.BigNumber.make(
			value,
			this.configRepository.get(config_1.ConfigKey.CurrencyDecimals),
		);
	}
};
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", config_1.ConfigRepository),
	],
	BigNumberService.prototype,
	"configRepository",
	void 0,
);
BigNumberService = __decorate([ioc_1.injectable()], BigNumberService);
exports.BigNumberService = BigNumberService;
//# sourceMappingURL=big-number.service.js.map
