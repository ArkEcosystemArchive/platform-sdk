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
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const api_1 = require("@polkadot/api");
const keyring_1 = require("@polkadot/keyring");
const constants_1 = require("./constants");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "client", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "keyring", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async __destruct() {
		await this.client.disconnect();
	}
	async transfer(input) {
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(
				this.constructor.name,
				this.transfer.name,
				"input.signatory",
			);
		}
		const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const keypair = this.keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);
		const signedData = {
			...JSON.parse(transaction.toString()),
			timestamp: platform_sdk_intl_1.DateTime.make(),
		};
		return this.dataTransferObjectService.signedTransaction(
			transaction.hash.toHex(),
			signedData,
			transaction.toHex(),
		);
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.ApiPromise), __metadata("design:type", api_1.ApiPromise)],
	TransactionService.prototype,
	"client",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.Keyring), __metadata("design:type", keyring_1.Keyring)],
	TransactionService.prototype,
	"keyring",
	void 0,
);
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
