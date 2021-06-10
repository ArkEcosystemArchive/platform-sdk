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
var _ClientService_client, _ClientService_broadcastErrors;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const stellar_sdk_1 = __importDefault(require("stellar-sdk"));
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_client.set(this, void 0);
		_ClientService_broadcastErrors.set(this, {
			op_malformed: "ERR_MALFORMED",
			op_underfunded: "ERR_INSUFFICIENT_FUNDS",
			op_low_reserve: "ERR_LOW_RESERVE",
			op_line_full: "ERR_LINE_FULL",
			op_no_issuer: "ERR_NO_ISSUER",
		});
	}
	onPostConstruct() {
		const network = this.configRepository.get("network").id;
		__classPrivateFieldSet(
			this,
			_ClientService_client,
			new stellar_sdk_1.default.Server(
				{ mainnet: "https://horizon.stellar.org", testnet: "https://horizon-testnet.stellar.org" }[
					network.split(".")[1]
				],
			),
			"f",
		);
	}
	async transaction(id, input) {
		const transaction = await __classPrivateFieldGet(this, _ClientService_client, "f")
			.transactions()
			.transaction(id)
			.call();
		const operations = await transaction.operations();
		return this.dataTransferObjectService.transaction({
			...transaction,
			operation: operations.records[0],
		});
	}
	async transactions(query) {
		const { records, next, prev } = await __classPrivateFieldGet(this, _ClientService_client, "f")
			.payments()
			.forAccount(query.address)
			.call();
		return this.dataTransferObjectService.transactions(
			records.filter((transaction) => transaction.type === "payment"),
			{
				prev,
				self: undefined,
				next,
				last: undefined,
			},
		);
	}
	async wallet(id) {
		return new wallet_dto_1.WalletData(
			await __classPrivateFieldGet(this, _ClientService_client, "f").loadAccount(id),
		);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				const { id } = await __classPrivateFieldGet(this, _ClientService_client, "f").submitTransaction(
					transaction.toBroadcast(),
				);
				transaction.setAttributes({ identifier: id });
				result.accepted.push(id);
			} catch (err) {
				const { extras } = err.response.data;
				result.rejected.push(transaction.id());
				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					for (const operation of extras.result_codes.operations) {
						if (operation.includes(key)) {
							result.errors[transaction.id()].push(value);
						}
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_client = new WeakMap()), (_ClientService_broadcastErrors = new WeakMap());
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
