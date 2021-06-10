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
var _TransactionService_instances,
	_TransactionService_networkId,
	_TransactionService_peer,
	_TransactionService_ticker,
	_TransactionService_getClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const crypto_1 = require("crypto");
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const node_fetch_1 = __importDefault(require("node-fetch"));
const util_1 = require("util");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		_TransactionService_networkId.set(this, void 0);
		_TransactionService_peer.set(this, void 0);
		_TransactionService_ticker.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_networkId,
			this.configRepository.get("network.meta.networkId"),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_TransactionService_peer,
			platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_TransactionService_ticker,
			this.configRepository.get(platform_sdk_1.Coins.ConfigKey.CurrencyTicker),
			"f",
		);
	}
	async transfer(input) {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new platform_sdk_1.Exceptions.MissingArgument(
					this.constructor.name,
					this.transfer.name,
					"input.signatory",
				);
			}
			const { client, signatureProvider } = __classPrivateFieldGet(
				this,
				_TransactionService_instances,
				"m",
				_TransactionService_getClient,
			).call(this, input.signatory.signingKey());
			const transfer = await client.transact(
				{
					actions: [
						{
							account: "eosio.token",
							name: "transfer",
							authorization: [
								{
									actor: input.signatory.address(),
									permission: "active",
								},
							],
							data: {
								from: input.signatory.address(),
								to: input.data.to,
								quantity: `${input.data.amount} ${__classPrivateFieldGet(
									this,
									_TransactionService_ticker,
									"f",
								)}`,
								memo: input.data.memo,
							},
						},
					],
				},
				{
					blocksBehind: 3,
					expireSeconds: 30,
					broadcast: false,
					sign: false,
				},
			);
			const keys = await signatureProvider.getAvailableKeys();
			transfer.requiredKeys = keys;
			transfer.chainId = __classPrivateFieldGet(this, _TransactionService_networkId, "f");
			const signatures = transfer.signatures || null;
			const transaction = await signatureProvider.sign(transfer);
			if (signatures) {
				transaction.signatures = transaction.signatures.concat(signatures);
			}
			return this.dataTransferObjectService.signedTransaction(
				crypto_1.createHash("sha256").update(transaction.serializedTransaction).digest("hex"),
				{ ...transaction, timestamp: platform_sdk_intl_1.DateTime.make() },
				transaction,
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_TransactionService_networkId = new WeakMap()),
	(_TransactionService_peer = new WeakMap()),
	(_TransactionService_ticker = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_getClient = function _TransactionService_getClient(privateKey) {
		const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([privateKey]);
		return {
			client: new eosjs_1.Api({
				rpc: new eosjs_1.JsonRpc(__classPrivateFieldGet(this, _TransactionService_peer, "f"), {
					fetch: node_fetch_1.default,
				}),
				signatureProvider,
				// @ts-ignore - this started to error out of nowhere when building
				textEncoder: new util_1.TextEncoder(),
				// @ts-ignore - this started to error out of nowhere when building
				textDecoder: new util_1.TextDecoder(),
			}),
			signatureProvider,
		};
	});
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	TransactionService.prototype,
	"onPostConstruct",
	null,
);
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
