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
exports.FeeService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
let FeeService = class FeeService extends platform_sdk_1.Services.AbstractFeeService {
	async all() {
		const { slow, normal, fast, instant } = (await this.httpClient.get("https://ethgas.watch/api/gas")).json();
		const fees = {
			static: instant.gwei.toString(),
			min: slow.gwei.toString(),
			avg: normal.gwei.toString(),
			max: fast.gwei.toString(),
		};
		return {
			transfer: fees,
			secondSignature: fees,
			delegateRegistration: fees,
			vote: fees,
			multiSignature: fees,
			ipfs: fees,
			multiPayment: fees,
			delegateResignation: fees,
			htlcLock: fees,
			htlcClaim: fees,
			htlcRefund: fees,
		};
	}
};
FeeService = __decorate([platform_sdk_1.IoC.injectable()], FeeService);
exports.FeeService = FeeService;
//# sourceMappingURL=fee.service.js.map
