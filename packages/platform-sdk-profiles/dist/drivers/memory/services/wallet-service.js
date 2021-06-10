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
exports.WalletService = void 0;
const queue_1 = require("../../../helpers/queue");
const inversify_1 = require("inversify");
let WalletService = class WalletService {
	/** {@inheritDoc IWalletService.syncByProfile} */
	async syncByProfile(profile) {
		const promises = [];
		for (const wallet of profile.wallets().values()) {
			promises.push(() => (wallet === null || wallet === void 0 ? void 0 : wallet.synchroniser().identity()));
			promises.push(() => (wallet === null || wallet === void 0 ? void 0 : wallet.synchroniser().votes()));
		}
		await queue_1.pqueueSettled(promises);
	}
};
WalletService = __decorate([inversify_1.injectable()], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet-service.js.map
