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
var _TransactionService_client, _TransactionService_networkPassphrase, _TransactionService_networks;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const stellar_sdk_1 = __importDefault(require("stellar-sdk"));
const uuid_1 = require("uuid");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "keyPairService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_TransactionService_client.set(this, void 0);
		_TransactionService_networkPassphrase.set(this, void 0);
		_TransactionService_networks.set(this, {
			mainnet: {
				host: "https://horizon.stellar.org",
				networkPassphrase: stellar_sdk_1.default.Networks.MAINNET,
			},
			testnet: {
				host: "https://horizon-testnet.stellar.org",
				networkPassphrase: stellar_sdk_1.default.Networks.TESTNET,
			},
		});
	}
	onPostConstruct() {
		const networkConfig = this.configRepository.get("network");
		const network = __classPrivateFieldGet(this, _TransactionService_networks, "f")[networkConfig.id.split(".")[1]];
		__classPrivateFieldSet(this, _TransactionService_client, new stellar_sdk_1.default.Server(network.host), "f");
		__classPrivateFieldSet(this, _TransactionService_networkPassphrase, network.networkPassphrase, "f");
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
			let keyPair;
			if (input.signatory.actsWithPrivateKey()) {
				keyPair = await this.keyPairService.fromPrivateKey(input.signatory.signingKey());
			} else {
				keyPair = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
			}
			const { publicKey, privateKey } = keyPair;
			const account = await __classPrivateFieldGet(this, _TransactionService_client, "f").loadAccount(publicKey);
			const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
			const transaction = new stellar_sdk_1.default.TransactionBuilder(account, {
				fee: input.fee || stellar_sdk_1.default.BASE_FEE,
				networkPassphrase: __classPrivateFieldGet(this, _TransactionService_networkPassphrase, "f"),
			})
				.addOperation(
					stellar_sdk_1.default.Operation.payment({
						destination: input.data.to,
						asset: stellar_sdk_1.default.Asset.native(),
						amount,
					}),
				)
				.setTimeout(30) // todo: support expiration
				.build();
			transaction.sign(stellar_sdk_1.default.Keypair.fromSecret(privateKey));
			return this.dataTransferObjectService.signedTransaction(uuid_1.v4(), transaction, transaction);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_TransactionService_client = new WeakMap()),
	(_TransactionService_networkPassphrase = new WeakMap()),
	(_TransactionService_networks = new WeakMap());
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.KeyPairService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"keyPairService",
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
