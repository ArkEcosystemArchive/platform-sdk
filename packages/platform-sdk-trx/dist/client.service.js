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
	_ClientService_connection,
	_ClientService_peer,
	_ClientService_broadcastErrors,
	_ClientService_getHost;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const tronweb_1 = __importDefault(require("tronweb"));
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_connection.set(this, void 0);
		_ClientService_peer.set(this, void 0);
		_ClientService_broadcastErrors.set(this, {
			SIGERROR: "ERR_INVALID_SIGNATURE",
			CONTRACT_VALIDATE_ERROR: "ERR_CONTRACT_VALIDATE_ERROR",
			CONTRACT_EXE_ERROR: "ERR_CONTRACT_EXE_ERROR",
			BANDWITH_ERROR: "ERR_BANDWITH_ERROR",
			DUP_TRANSACTION_ERROR: "ERR_DUP_TRANSACTION_ERROR",
			TAPOS_ERROR: "ERR_TAPOS_ERROR",
			TOO_BIG_TRANSACTION_ERROR: "ERR_TOO_BIG_TRANSACTION_ERROR",
			TRANSACTION_EXPIRATION_ERROR: "ERR_TRANSACTION_EXPIRATION_ERROR",
			SERVER_BUSY: "ERR_SERVER_BUSY",
			NO_CONNECTION: "ERR_NO_CONNECTION",
			NOT_ENOUGH_EFFECTIVE_CONNECTION: "ERR_NOT_ENOUGH_EFFECTIVE_CONNECTION",
			OTHER_ERROR: "ERR_OTHER_ERROR",
		});
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_ClientService_peer,
			platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_ClientService_connection,
			new tronweb_1.default({ fullHost: __classPrivateFieldGet(this, _ClientService_peer, "f") }),
			"f",
		);
	}
	async transaction(id, input) {
		const result = await __classPrivateFieldGet(this, _ClientService_connection, "f").trx.getTransaction(id);
		return this.dataTransferObjectService.transaction(result);
	}
	async transactions(query) {
		const payload = {
			limit: query.limit || 15,
		};
		if (query.senderId) {
			payload.only_from = true;
		}
		if (query.recipientId) {
			payload.only_to = true;
		}
		const response = (
			await this.httpClient.get(
				`${__classPrivateFieldGet(
					this,
					_ClientService_peer,
					"f",
				)}/v1/accounts/${platform_sdk_1.Helpers.pluckAddress(query)}/transactions`,
				payload,
			)
		).json();
		return this.dataTransferObjectService.transactions(
			response.data.filter(({ raw_data }) => raw_data.contract[0].type === "TransferContract"),
			{
				prev: undefined,
				self: undefined,
				next: response.meta.fingerprint,
				last: undefined,
			},
		);
	}
	async wallet(id) {
		const { data } = (
			await this.httpClient.get(
				`${__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_getHost).call(
					this,
				)}/v1/accounts/${id}`,
			)
		).json();
		return new wallet_dto_1.WalletData(data[0]);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const response = (
				await this.httpClient.post(
					`${__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_getHost).call(
						this,
					)}/wallet/broadcasttransaction`,
					transaction.toBroadcast(),
				)
			).json();
			if (response.result) {
				result.accepted.push(transaction.id());
			}
			if (response.code) {
				result.rejected.push(transaction.id());
				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					if (response.code.includes(key)) {
						result.errors[transaction.id()].push(value);
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_connection = new WeakMap()),
	(_ClientService_peer = new WeakMap()),
	(_ClientService_broadcastErrors = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_getHost = function _ClientService_getHost() {
		return platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository);
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
