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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _MultiSignatureService_instances,
	_MultiSignatureService_get,
	_MultiSignatureService_delete,
	_MultiSignatureService_post,
	_MultiSignatureService_getPeer,
	_MultiSignatureService_normalizeTransaction,
	_MultiSignatureService_fetchAll;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignatureService = void 0;
const multi_signature_1 = require("@arkecosystem/multi-signature");
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
let MultiSignatureService = class MultiSignatureService extends platform_sdk_1.Services.AbstractMultiSignatureService {
	constructor() {
		super(...arguments);
		_MultiSignatureService_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "httpClient", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	/** @inheritdoc */
	async allWithPendingState(publicKey) {
		return __classPrivateFieldGet(
			this,
			_MultiSignatureService_instances,
			"m",
			_MultiSignatureService_fetchAll,
		).call(this, publicKey, "pending");
	}
	/** @inheritdoc */
	async allWithReadyState(publicKey) {
		return __classPrivateFieldGet(
			this,
			_MultiSignatureService_instances,
			"m",
			_MultiSignatureService_fetchAll,
		).call(this, publicKey, "ready");
	}
	/** @inheritdoc */
	async findById(id) {
		return __classPrivateFieldGet(
			this,
			_MultiSignatureService_instances,
			"m",
			_MultiSignatureService_normalizeTransaction,
		).call(
			this,
			await __classPrivateFieldGet(this, _MultiSignatureService_instances, "m", _MultiSignatureService_get).call(
				this,
				`transaction/${id}`,
			),
		);
	}
	/** @inheritdoc */
	async broadcast(transaction) {
		let multiSignature = transaction.multiSignature;
		if (transaction.asset && transaction.asset.multiSignature) {
			multiSignature = transaction.asset.multiSignature;
		}
		const { id } = await __classPrivateFieldGet(
			this,
			_MultiSignatureService_instances,
			"m",
			_MultiSignatureService_post,
		).call(this, "transaction", {
			data: transaction,
			multisigAsset: multiSignature,
		});
		return id;
	}
	/** @inheritdoc */
	async flush() {
		return __classPrivateFieldGet(this, _MultiSignatureService_instances, "m", _MultiSignatureService_delete).call(
			this,
			"transactions",
		);
	}
	/** @inheritdoc */
	isMultiSignatureReady(transaction, excludeFinal) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).isMultiSignatureReady({
			excludeFinal,
		});
	}
	/** @inheritdoc */
	needsSignatures(transaction) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).needsSignatures();
	}
	/** @inheritdoc */
	needsAllSignatures(transaction) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).needsAllSignatures();
	}
	/** @inheritdoc */
	needsWalletSignature(transaction, publicKey) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).needsWalletSignature(
			publicKey,
		);
	}
	/** @inheritdoc */
	needsFinalSignature(transaction) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).needsFinalSignature();
	}
	/** @inheritdoc */
	getValidMultiSignatures(transaction) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).getValidMultiSignatures();
	}
	/** @inheritdoc */
	remainingSignatureCount(transaction) {
		return new multi_signature_1.PendingMultiSignatureTransaction(transaction.data()).remainingSignatureCount();
	}
};
(_MultiSignatureService_instances = new WeakSet()),
	(_MultiSignatureService_get =
		/**
		 *
		 *
		 * @private
		 * @param {string} path
		 * @param {Contracts.KeyValuePair} [query]
		 * @returns {Promise<Contracts.KeyValuePair>}
		 * @memberof MultiSignatureService
		 */
		async function _MultiSignatureService_get(path, query) {
			return (
				await this.httpClient.get(
					`${__classPrivateFieldGet(
						this,
						_MultiSignatureService_instances,
						"m",
						_MultiSignatureService_getPeer,
					).call(this)}/${path}`,
					query,
				)
			).json();
		}),
	(_MultiSignatureService_delete =
		/**
		 *
		 *
		 * @private
		 * @param {string} path
		 * @param {Contracts.KeyValuePair} [query]
		 * @returns {Promise<Contracts.KeyValuePair>}
		 * @memberof MultiSignatureService
		 */
		async function _MultiSignatureService_delete(path, query) {
			return (
				await this.httpClient.delete(
					`${__classPrivateFieldGet(
						this,
						_MultiSignatureService_instances,
						"m",
						_MultiSignatureService_getPeer,
					).call(this)}/${path}`,
					query,
				)
			).json();
		}),
	(_MultiSignatureService_post =
		/**
		 *
		 *
		 * @private
		 * @param {string} path
		 * @param {Contracts.KeyValuePair} body
		 * @returns {Promise<Contracts.KeyValuePair>}
		 * @memberof MultiSignatureService
		 */
		async function _MultiSignatureService_post(path, body) {
			return (
				await this.httpClient.post(
					`${__classPrivateFieldGet(
						this,
						_MultiSignatureService_instances,
						"m",
						_MultiSignatureService_getPeer,
					).call(this)}/${path}`,
					body,
				)
			).json();
		}),
	(_MultiSignatureService_getPeer = function _MultiSignatureService_getPeer() {
		return platform_sdk_1.Helpers.randomHost(this.configRepository.get("network").hosts, "musig").host;
	}),
	(_MultiSignatureService_normalizeTransaction = function _MultiSignatureService_normalizeTransaction({
		data,
		id,
		timestamp,
		multisigAsset,
	}) {
		return {
			...data,
			id,
			timestamp,
			multiSignature: multisigAsset,
		};
	}),
	(_MultiSignatureService_fetchAll =
		/**
		 *
		 *
		 * @private
		 * @param {string} publicKey
		 * @param {string} state
		 * @returns {Promise<any[]>}
		 * @memberof MultiSignatureService
		 */
		async function _MultiSignatureService_fetchAll(publicKey, state) {
			return (
				await __classPrivateFieldGet(
					this,
					_MultiSignatureService_instances,
					"m",
					_MultiSignatureService_get,
				).call(this, "transactions", {
					publicKey,
					state,
				})
			).map((transaction) =>
				__classPrivateFieldGet(
					this,
					_MultiSignatureService_instances,
					"m",
					_MultiSignatureService_normalizeTransaction,
				).call(this, transaction),
			);
		});
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	MultiSignatureService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.HttpClient), __metadata("design:type", Object)],
	MultiSignatureService.prototype,
	"httpClient",
	void 0,
);
MultiSignatureService = __decorate([platform_sdk_1.IoC.injectable()], MultiSignatureService);
exports.MultiSignatureService = MultiSignatureService;
//# sourceMappingURL=multi-signature.service.js.map
