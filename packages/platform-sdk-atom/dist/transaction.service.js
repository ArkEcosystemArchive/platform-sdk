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
var _TransactionService_networkId, _TransactionService_decimals;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const uuid_1 = require("uuid");
const crypto_1 = require("./crypto");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "clientService", {
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
		_TransactionService_networkId.set(this, void 0);
		_TransactionService_decimals.set(this, void 0);
	}
	async transfer(input) {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}
			const { address: senderAddress } = await this.addressService.fromMnemonic(input.signatory.signingKey());
			const keyPair = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
			// @ts-ignore
			const { account_number, sequence } = (await this.clientService.wallet(senderAddress)).raw();
			const signedTransaction = crypto_1.createSignedTransactionData(
				{
					msgs: [
						{
							type: "cosmos-sdk/MsgSend",
							value: {
								amount: [
									{
										amount: `${input.data.amount}`,
										denom: "umuon", // todo: make this configurable
									},
								],
								from_address: senderAddress,
								to_address: input.data.to,
							},
						},
					],
					chain_id: __classPrivateFieldGet(this, _TransactionService_networkId, "f"),
					fee: {
						amount: [
							{
								amount: String(5000),
								denom: "umuon", // todo: make this configurable
							},
						],
						gas: String(200000), // todo: make this configurable or estimate it
					},
					memo: "",
					account_number: String(account_number),
					sequence: String(sequence),
				},
				keyPair,
			);
			return this.dataTransferObjectService.signedTransaction(uuid_1.v4(), signedTransaction, signedTransaction);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
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
			_TransactionService_decimals,
			this.configRepository.get(platform_sdk_1.Coins.ConfigKey.CurrencyDecimals),
			"f",
		);
	}
};
(_TransactionService_networkId = new WeakMap()), (_TransactionService_decimals = new WeakMap());
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ClientService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"clientService",
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
