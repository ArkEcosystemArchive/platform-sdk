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
var _TransactionService_connection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const tronweb_1 = __importDefault(require("tronweb"));
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "privateKeyService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_TransactionService_connection.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_connection,
			new tronweb_1.default({ fullHost: platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository) }),
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
			const { address: senderAddress } = await this.addressService.fromMnemonic(input.signatory.signingKey());
			if (senderAddress === input.data.to) {
				throw new platform_sdk_1.Exceptions.InvalidRecipientException(
					"Cannot transfer TRX to the same account.",
				);
			}
			let transaction = await __classPrivateFieldGet(
				this,
				_TransactionService_connection,
				"f",
			).transactionBuilder.sendTrx(
				input.data.to,
				platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString(),
				senderAddress,
				1,
			);
			if (input.data.memo) {
				transaction = await __classPrivateFieldGet(
					this,
					_TransactionService_connection,
					"f",
				).transactionBuilder.addUpdateData(transaction, input.data.memo, "utf8");
			}
			const response = await __classPrivateFieldGet(this, _TransactionService_connection, "f").trx.sign(
				transaction,
				(await this.privateKeyService.fromMnemonic(input.signatory.signingKey())).privateKey,
			);
			const decimals = this.configRepository.get(platform_sdk_1.Coins.ConfigKey.CurrencyDecimals);
			return this.dataTransferObjectService.signedTransaction(response.txID, response, response);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
_TransactionService_connection = new WeakMap();
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"addressService",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.PrivateKeyService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"privateKeyService",
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
