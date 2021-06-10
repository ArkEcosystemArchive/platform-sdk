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
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ClientService_client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wallet_dto_1 = require("./wallet.dto");
const rpc_1 = require("./rpc");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_client.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_client,
			new rpc_1.NanoClient(this.configRepository, this.httpClient),
			"f",
		);
	}
	async transactions(query) {
		const account = query.address || query.addresses[0];
		const count = (query.limit || 15).toString();
		const options = { head: query.cursor || undefined };
		const { history, previous } = await __classPrivateFieldGet(this, _ClientService_client, "f").accountHistory(
			account,
			count,
			options,
		);
		return this.dataTransferObjectService.transactions(
			Object.values(history).map((transaction) => {
				transaction._origin = account;
				return transaction;
			}),
			{
				prev: undefined,
				self: undefined,
				next: previous,
				last: undefined,
			},
		);
	}
	async wallet(id) {
		const { balance, pending } = await __classPrivateFieldGet(this, _ClientService_client, "f").accountInfo(id, {
			pending: true,
		});
		return new wallet_dto_1.WalletData({ id, balance, pending });
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				await __classPrivateFieldGet(this, _ClientService_client, "f").process(
					"send",
					transaction.toBroadcast(),
				);
				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
};
_ClientService_client = new WeakMap();
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	ClientService.prototype,
	"onPostConstruct",
	null,
);
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
