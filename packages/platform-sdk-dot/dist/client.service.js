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
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const api_1 = require("@polkadot/api");
const constants_1 = require("./constants");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "client", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async __destruct() {
		await this.client.disconnect();
	}
	async wallet(id) {
		const { data: balances, nonce } = await this.client.query.system.account(id);
		return new wallet_dto_1.WalletData({
			address: id,
			balance: balances.free.toString(),
			nonce: nonce.toString(),
		});
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				await this.client.rpc.author.submitExtrinsic(transaction.toBroadcast());
				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.ApiPromise), __metadata("design:type", api_1.ApiPromise)],
	ClientService.prototype,
	"client",
	void 0,
);
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
