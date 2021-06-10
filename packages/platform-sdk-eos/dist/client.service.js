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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _ClientService_rpc, _ClientService_api;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const node_fetch_1 = __importDefault(require("node-fetch"));
const util_1 = require("util");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_rpc.set(this, void 0);
		_ClientService_api.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_rpc,
			new eosjs_1.JsonRpc(platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository), {
				fetch: node_fetch_1.default,
			}),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_ClientService_api,
			new eosjs_1.Api({
				rpc: __classPrivateFieldGet(this, _ClientService_rpc, "f"),
				signatureProvider: new eosjs_jssig_1.JsSignatureProvider([]),
				// @ts-ignore - this started to error out of nowhere when building
				textDecoder: new util_1.TextDecoder(),
				// @ts-ignore - this started to error out of nowhere when building
				textEncoder: new util_1.TextEncoder(),
			}),
			"f",
		);
	}
	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-transaction-information
	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-table-information
	async wallet(id) {
		return new wallet_dto_1.WalletData(await __classPrivateFieldGet(this, _ClientService_rpc, "f").get_account(id));
	}
	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-transfer-an-eosio-token
	async broadcast(transactions) {
		const result = await __classPrivateFieldGet(this, _ClientService_api, "f").transact(
			{
				actions: [
					{
						account: "eosio.token",
						name: "transfer",
						authorization: [
							{
								actor: "bdfkbzietxos",
								permission: "active",
							},
						],
						data: {
							from: "bdfkbzietxos",
							to: "zqcetsxfxzca",
							quantity: "0.0001 TNT",
							memo: "Hello World",
						},
					},
				],
			},
			{
				blocksBehind: 3,
				expireSeconds: 30,
			},
		);
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.broadcast.name);
	}
};
(_ClientService_rpc = new WeakMap()), (_ClientService_api = new WeakMap());
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
