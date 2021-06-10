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
var _ClientService_instances,
	_ClientService_peer,
	_ClientService_broadcastErrors,
	_ClientService_get,
	_ClientService_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const web3_1 = __importDefault(require("web3"));
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_peer.set(this, void 0);
		_ClientService_broadcastErrors.set(this, {
			"nonce too low": "ERR_NONCE_TOO_LOW",
			"nonce too high": "ERR_NONCE_TOO_HIGH",
			"gas limit reached": "ERR_GAS_LIMIT_REACHED",
			"insufficient funds for transfer": "ERR_INSUFFICIENT_FUNDS_FOR_TRANSFER",
			"insufficient funds for gas * price + value": "ERR_INSUFFICIENT_FUNDS",
			"gas uint64 overflow": "ERR_GAS_UINT_OVERFLOW",
			"intrinsic gas too low": "ERR_INTRINSIC_GAS",
		});
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_peer,
			platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			"f",
		);
	}
	async transaction(id, input) {
		return this.dataTransferObjectService.transaction(
			await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
				this,
				`transactions/${id}`,
			),
		);
	}
	async transactions(query) {
		const transactions = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`wallets/${query.address}/transactions`,
		);
		return this.dataTransferObjectService.transactions(
			transactions,
			// TODO: implement pagination on server
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}
	async wallet(id) {
		return new wallet_dto_1.WalletData(
			await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
				this,
				`wallets/${id}`,
			),
		);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const transactionId = web3_1.default.utils.sha3(transaction.toBroadcast());
			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}
			transaction.setAttributes({ identifier: transactionId });
			const response = await __classPrivateFieldGet(
				this,
				_ClientService_instances,
				"m",
				_ClientService_post,
			).call(this, "transactions", { transactions: [transaction] });
			if (response.result) {
				result.accepted.push(transactionId);
			}
			if (response.error) {
				result.rejected.push(transactionId);
				if (!Array.isArray(result.errors[transactionId])) {
					result.errors[transactionId] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					if (response.error.message.includes(key)) {
						result.errors[transactionId].push(value);
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_peer = new WeakMap()),
	(_ClientService_broadcastErrors = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		return (
			await this.httpClient.get(`${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${path}`, query)
		).json();
	}),
	(_ClientService_post = async function _ClientService_post(path, body) {
		return (
			await this.httpClient.post(`${__classPrivateFieldGet(this, _ClientService_peer, "f")}/${path}`, body)
		).json();
	});
Object.defineProperty(ClientService, "MONTH_IN_SECONDS", {
	enumerable: true,
	configurable: true,
	writable: true,
	value: 8640 * 30,
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
