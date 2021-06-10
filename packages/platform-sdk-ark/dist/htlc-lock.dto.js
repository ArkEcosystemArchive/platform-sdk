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
exports.HtlcLockData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const transaction_dto_1 = require("./transaction.dto");
let HtlcLockData = class HtlcLockData extends transaction_dto_1.TransactionData {
	secretHash() {
		return this.data.asset.lock.secretHash;
	}
	expirationType() {
		return this.data.asset.lock.expiration.type;
	}
	expirationValue() {
		return this.data.asset.lock.expiration.value;
	}
};
HtlcLockData = __decorate([platform_sdk_1.IoC.injectable()], HtlcLockData);
exports.HtlcLockData = HtlcLockData;
//# sourceMappingURL=htlc-lock.dto.js.map
