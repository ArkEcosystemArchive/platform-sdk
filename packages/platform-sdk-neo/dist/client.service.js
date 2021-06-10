"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
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
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
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
var _ClientService_instances,
	_ClientService_peer,
	_ClientService_apiProvider,
	_ClientService_broadcastErrors,
	_ClientService_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const neon_js_1 = __importStar(require("@cityofzion/neon-js"));
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_peer.set(this, void 0);
		_ClientService_apiProvider.set(this, void 0);
		_ClientService_broadcastErrors.set(this, {
			"Block or transaction already exists and cannot be sent repeatedly.": "ERR_DUPLICATE",
			"The memory pool is full and no more transactions can be sent.": "ERR_EXCESS",
			"The block cannot be validated.": "ERR_VALIDATION_FAILED",
			"Block or transaction validation failed.": "ERR_VALIDATION_FAILED",
			"One of the Policy filters failed.": "ERR_POLICY_FILTER_FAILED",
			"Unknown error.": "ERR_UNKNOWN",
		});
	}
	onPostConstruct() {
		const network = this.configRepository.get("network").id.split(".")[1];
		__classPrivateFieldSet(
			this,
			_ClientService_peer,
			{
				mainnet: "https://api.neoscan.io/api/main_net/v1",
				testnet: "https://neoscan-testnet.io/api/test_net/v1",
			}[network],
			"f",
		);
		__classPrivateFieldSet(
			this,
			_ClientService_apiProvider,
			new neon_js_1.api.neoscan.instance(network === "mainnet" ? "MainNet" : "TestNet"),
			"f",
		);
	}
	async transactions(query) {
		const basePath = `get_address_abstracts/${query.address}`;
		const basePage = query.cursor || 1;
		const response = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`${basePath}/${basePage}`,
		);
		const prevPage = response.page_number > 1 ? basePage - 1 : undefined;
		const nextPage = response.total_pages > 1 ? basePage + 1 : undefined;
		return this.dataTransferObjectService.transactions(response.entries, {
			prev: `${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${basePath}/${prevPage}`,
			self: undefined,
			next: `${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${basePath}/${nextPage}`,
			last: response.total_pages,
		});
	}
	async wallet(id) {
		const response = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`get_balance/${id}`,
		);
		return new wallet_dto_1.WalletData({
			address: id,
			balance: response.balance.find((balance) => balance.asset === "NEO").amount,
		});
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const { response } = await neon_js_1.default.sendAsset({
				api: __classPrivateFieldGet(this, _ClientService_apiProvider, "f"),
				account: transaction.get("account"),
				intents: transaction.get("intents"),
			});
			if (response === undefined) {
				result.rejected.push(transaction.id());
				continue;
			}
			if (response.txid) {
				transaction.setAttributes({ identifier: response.txid });
				result.accepted.push(transaction.id());
			}
			// @ts-ignore
			if (response.error) {
				result.rejected.push(transaction.id());
				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					// @ts-ignore
					if (response.error.message.includes(key)) {
						result.errors[transaction.id()].push(value);
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_peer = new WeakMap()),
	(_ClientService_apiProvider = new WeakMap()),
	(_ClientService_broadcastErrors = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		const response = await this.httpClient.get(
			`${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${path}`,
			query,
		);
		return response.json();
	});
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
