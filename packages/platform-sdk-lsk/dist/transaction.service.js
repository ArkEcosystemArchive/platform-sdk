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
var _TransactionService_instances, _TransactionService_network, _TransactionService_createFromData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const hw_transport_node_hid_singleton_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid-singleton"));
const lisk_transactions_1 = require("@liskhq/lisk-transactions");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		_TransactionService_network.set(this, void 0);
		Object.defineProperty(this, "ledgerService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_network,
			this.configRepository.get("network.meta.networkId"),
			"f",
		);
	}
	async transfer(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "transfer", {
			...input,
			data: {
				amount: platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString(),
				recipientId: input.data.to,
				data: input.data.memo,
			},
		});
	}
	async secondSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "registerSecondPassphrase", {
			...input,
			data: {
				secondMnemonic: platform_sdk_crypto_1.BIP39.normalize(input.data.mnemonic),
			},
		});
	}
	async delegateRegistration(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "registerDelegate", input);
	}
	async vote(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "castVotes", input);
	}
	async multiSignature(input) {
		return __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_createFromData,
		).call(this, "registerMultisignature", {
			...input,
			data: {
				keysgroup: input.data.publicKeys,
				lifetime: input.data.lifetime,
				minimum: input.data.min,
			},
		});
	}
};
(_TransactionService_network = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_createFromData = async function _TransactionService_createFromData(type, input, callback) {
		try {
			const struct = { ...input.data };
			struct.networkIdentifier = __classPrivateFieldGet(this, _TransactionService_network, "f");
			if (callback) {
				callback({ struct });
			}
			const transactionSigner = {
				transfer: lisk_transactions_1.transfer,
				registerSecondPassphrase: lisk_transactions_1.registerSecondPassphrase,
				registerDelegate: lisk_transactions_1.registerDelegate,
				castVotes: lisk_transactions_1.castVotes,
				registerMultisignature: lisk_transactions_1.registerMultisignature,
			}[type];
			if (input.signatory.actsWithLedger()) {
				await this.ledgerService.connect(hw_transport_node_hid_singleton_1.default);
				const structTransaction = transactionSigner(struct);
				// @ts-ignore - LSK uses JS so they don't encounter these type errors
				structTransaction.senderPublicKey = await this.ledgerService.getPublicKey(input.signatory.signingKey());
				// @ts-ignore - LSK uses JS so they don't encounter these type errors
				structTransaction.signature = await this.ledgerService.signTransaction(
					input.signatory.signingKey(),
					lisk_transactions_1.utils.getTransactionBytes(structTransaction),
				);
				// @ts-ignore - LSK uses JS so they don't encounter these type errors
				structTransaction.id = lisk_transactions_1.utils.getTransactionId(structTransaction);
				await this.ledgerService.disconnect();
				return this.dataTransferObjectService.signedTransaction(
					structTransaction.id,
					structTransaction,
					structTransaction,
				);
			}
			// todo: support multisignature
			if (input.signatory.signingKey()) {
				struct.passphrase = input.signatory.signingKey();
			}
			if (input.signatory.actsWithSecondaryMnemonic()) {
				struct.secondPassphrase = input.signatory.confirmKey();
			}
			const signedTransaction = transactionSigner(struct);
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
