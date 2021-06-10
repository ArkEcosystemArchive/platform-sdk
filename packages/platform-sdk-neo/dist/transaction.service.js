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
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const neon_js_1 = require("@cityofzion/neon-js");
const uuid_1 = require("uuid");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	async transfer(input) {
		try {
			const signedTransaction = {
				account: new neon_js_1.wallet.Account(input.signatory.signingKey()),
				intents: neon_js_1.api.makeIntent(
					{ NEO: parseFloat(input.data.amount.toString()), GAS: parseFloat(input.fee.toString()) },
					input.data.to,
				),
			};
			const signedData = { ...signedTransaction, timestamp: platform_sdk_intl_1.DateTime.make() };
			return this.dataTransferObjectService.signedTransaction(
				uuid_1.v4(),
				signedData,
				JSON.stringify(signedTransaction),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
