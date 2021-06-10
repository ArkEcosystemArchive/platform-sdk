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
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _TransactionService_instances,
	_TransactionService_peer,
	_TransactionService_multiSignatureSigner,
	_TransactionService_configCrypto,
	_TransactionService_createFromData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const multi_signature_1 = require("@arkecosystem/multi-signature");
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const hw_transport_node_hid_singleton_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid-singleton"));
const coin_contract_1 = require("./coin.contract");
const helpers_1 = require("./helpers");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		Object.defineProperty(this, "ledgerService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "keyPairService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "publicKeyService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "packageCrypto", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "packageHeight", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		// @TODO: remove or inject
		_TransactionService_peer.set(this, void 0);
		_TransactionService_multiSignatureSigner.set(this, void 0);
		_TransactionService_configCrypto.set(this, void 0);
	}
	async transfer(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "transfer", input, ({ transaction, data }) => {
			transaction.recipientId(data.to);
			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}
	async secondSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "secondSignature", input, ({ transaction, data }) =>
			transaction.signatureAsset(platform_sdk_crypto_1.BIP39.normalize(data.mnemonic)),
		);
	}
	async delegateRegistration(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "delegateRegistration", input, ({ transaction, data }) =>
			transaction.usernameAsset(data.username),
		);
	}
	async vote(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "vote", input, ({ transaction, data }) => {
			const votes = [];
			if (Array.isArray(data.unvotes)) {
				for (const unvote of data.unvotes) {
					votes.push(`-${unvote}`);
				}
			}
			if (Array.isArray(data.votes)) {
				for (const vote of data.votes) {
					votes.push(`+${vote}`);
				}
			}
			transaction.votesAsset(votes);
		});
	}
	async multiSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "multiSignature", input, ({ transaction, data }) => {
			transaction.multiSignatureAsset({
				publicKeys: data.publicKeys,
				min: data.min,
			});
			transaction.senderPublicKey(data.senderPublicKey);
		});
	}
	async ipfs(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "ipfs", input, ({ transaction, data }) => transaction.ipfsAsset(data.hash));
	}
	async multiPayment(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "multiPayment", input, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(
					payment.to,
					platform_sdk_1.Helpers.toRawUnit(payment.amount, this.configRepository).toString(),
				);
			}
			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}
	async delegateResignation(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "delegateResignation", input);
	}
	async htlcLock(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "htlcLock", input, ({ transaction, data }) => {
			transaction.amount(platform_sdk_1.Helpers.toRawUnit(data.amount, this.configRepository).toString());
			transaction.recipientId(data.to);
			transaction.htlcLockAsset({
				secretHash: data.secretHash,
				expiration: data.expiration,
			});
		});
	}
	async htlcClaim(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "htlcClaim", input, ({ transaction, data }) =>
			transaction.htlcClaimAsset({
				lockTransactionId: data.lockTransactionId,
				unlockSecret: data.unlockSecret,
			}),
		);
	}
	async htlcRefund(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "htlcRefund", input, ({ transaction, data }) =>
			transaction.htlcRefundAsset({
				lockTransactionId: data.lockTransactionId,
			}),
		);
	}
	/**
	 * This method should be used to split-sign transactions in combination with the MuSig Server.
	 *
	 * @param transaction A transaction that was previously signed with a multi-signature.
	 * @param input
	 */
	async multiSign(transaction, input) {
		helpers_1.applyCryptoConfiguration(__classPrivateFieldGet(this, _TransactionService_configCrypto, "f"));
		let keys;
		if (input.signatory.actsWithMnemonic()) {
			keys = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
		}
		if (input.signatory.actsWithWif()) {
			keys = await this.keyPairService.fromWIF(input.signatory.signingKey());
		}
		if (!keys) {
			throw new Error("Failed to retrieve the keys for the signatory wallet.");
		}
		const transactionWithSignature = __classPrivateFieldGet(
			this,
			_TransactionService_multiSignatureSigner,
			"f",
		).addSignature(transaction, {
			publicKey: keys.publicKey,
			privateKey: keys.privateKey,
			compressed: true,
		});
		return this.dataTransferObjectService.signedTransaction(
			transactionWithSignature.id,
			transactionWithSignature,
			transactionWithSignature,
		);
	}
	async estimateExpiration(value) {
		const { data: blockchain } = (
			await this.httpClient.get(`${__classPrivateFieldGet(this, _TransactionService_peer, "f")}/blockchain`)
		).json();
		const { data: configuration } = (
			await this.httpClient.get(
				`${__classPrivateFieldGet(this, _TransactionService_peer, "f")}/node/configuration`,
			)
		).json();
		return platform_sdk_support_1.BigNumber.make(blockchain.block.height)
			.plus(value || 5 * configuration.constants.activeDelegates)
			.toString();
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_peer,
			platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			"f",
		);
		// @ts-ignore
		__classPrivateFieldSet(
			this,
			_TransactionService_multiSignatureSigner,
			new multi_signature_1.MultiSignatureSigner(this.packageCrypto, this.packageHeight),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_TransactionService_configCrypto,
			{ crypto: this.packageCrypto, height: this.packageHeight },
			"f",
		);
	}
};
(_TransactionService_peer = new WeakMap()),
	(_TransactionService_multiSignatureSigner = new WeakMap()),
	(_TransactionService_configCrypto = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_createFromData = async function _TransactionService_createFromData(type, input, callback) {
		helpers_1.applyCryptoConfiguration(__classPrivateFieldGet(this, _TransactionService_configCrypto, "f"));
		try {
			let address;
			if (input.signatory.actsWithMnemonic() || input.signatory.actsWithPrivateMultiSignature()) {
				address = (await this.addressService.fromMnemonic(input.signatory.signingKey())).address;
			}
			if (input.signatory.actsWithWif()) {
				address = (await this.addressService.fromWIF(input.signatory.signingKey())).address;
			}
			const transaction = crypto_1.Transactions.BuilderFactory[type]().version(2);
			if (input.signatory.actsWithLedger()) {
				await this.ledgerService.connect(hw_transport_node_hid_singleton_1.default);
				const senderPublicKey = await this.ledgerService.getPublicKey(input.signatory.signingKey());
				transaction.senderPublicKey(senderPublicKey);
				address = (await this.addressService.fromPublicKey(senderPublicKey)).address;
			}
			if (input.signatory.actsWithSenderPublicKey()) {
				address = input.signatory.address();
				transaction.senderPublicKey(input.signatory.signingKey());
			}
			if (input.nonce) {
				transaction.nonce(input.nonce);
			} else {
				const { data } = (
					await this.httpClient.get(
						`${__classPrivateFieldGet(this, _TransactionService_peer, "f")}/wallets/${address}`,
					)
				).json();
				transaction.nonce(platform_sdk_support_1.BigNumber.make(data.nonce).plus(1).toFixed());
			}
			if (input.data && input.data.amount) {
				transaction.amount(
					platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString(),
				);
			}
			if (input.fee) {
				transaction.fee(platform_sdk_1.Helpers.toRawUnit(input.fee, this.configRepository).toString());
			}
			if (input.data && input.data.expiration) {
				transaction.expiration(input.data.expiration);
			} else {
				try {
					const estimatedExpiration = await this.estimateExpiration();
					if (estimatedExpiration) {
						transaction.expiration(parseInt(estimatedExpiration));
					}
				} catch {
					// If we fail to estimate the expiration we'll still continue.
				}
			}
			if (callback) {
				callback({ transaction, data: input.data });
			}
			if (input.signatory.actsWithLedger()) {
				transaction.data.signature = await this.ledgerService.signTransaction(
					input.signatory.signingKey(),
					crypto_1.Transactions.Serializer.getBytes(transaction.data, {
						excludeSignature: true,
						excludeSecondSignature: true,
					}),
				);
				await this.ledgerService.disconnect();
			}
			if (input.signatory.actsWithMultiSignature()) {
				const transactionWithSignature = __classPrivateFieldGet(
					this,
					_TransactionService_multiSignatureSigner,
					"f",
				).sign(transaction, input.signatory.signingList());
				return this.dataTransferObjectService.signedTransaction(
					transactionWithSignature.id,
					transactionWithSignature,
					transactionWithSignature,
				);
			}
			const actsWithMultiMnemonic =
				input.signatory.actsWithMultiMnemonic() || input.signatory.actsWithPrivateMultiSignature();
			if (actsWithMultiMnemonic && Array.isArray(input.signatory.signingKeys())) {
				const signingKeys = input.signatory.signingKeys();
				const senderPublicKeys = (
					await Promise.all(signingKeys.map((mnemonic) => this.publicKeyService.fromMnemonic(mnemonic)))
				).map(({ publicKey }) => publicKey);
				transaction.senderPublicKey(
					(await this.publicKeyService.fromMultiSignature(signingKeys.length, senderPublicKeys)).publicKey,
				);
				for (let i = 0; i < signingKeys.length; i++) {
					transaction.multiSign(signingKeys[i], i);
				}
			} else {
				if (input.signatory.actsWithMnemonic()) {
					transaction.sign(input.signatory.signingKey());
				}
				if (input.signatory.actsWithSecondaryMnemonic()) {
					transaction.sign(input.signatory.signingKey());
					transaction.secondSign(input.signatory.confirmKey());
				}
				if (input.signatory.actsWithWif()) {
					transaction.signWithWif(input.signatory.signingKey());
				}
				if (input.signatory.actsWithSecondaryWif()) {
					transaction.signWithWif(input.signatory.signingKey());
					transaction.secondSignWithWif(input.signatory.confirmKey());
				}
			}
			const signedTransaction = transaction.build().toJson();
			return this.dataTransferObjectService.signedTransaction(
				signedTransaction.id,
				signedTransaction,
				signedTransaction,
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	});
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.LedgerService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"ledgerService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"addressService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.KeyPairService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"keyPairService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.PublicKeyService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"publicKeyService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(coin_contract_1.Bindings.Crypto), __metadata("design:type", Object)],
	TransactionService.prototype,
	"packageCrypto",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(coin_contract_1.Bindings.Height), __metadata("design:type", Number)],
	TransactionService.prototype,
	"packageHeight",
	void 0,
);
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
