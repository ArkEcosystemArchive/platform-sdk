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
var _TransactionService_xchain, _TransactionService_pchain, _TransactionService_keychain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const utils_1 = require("@arkecosystem/utils");
const avalanche_1 = require("avalanche");
const uuid_1 = require("uuid");
const helpers_1 = require("./helpers");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_xchain.set(this, void 0);
		_TransactionService_pchain.set(this, void 0);
		_TransactionService_keychain.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _TransactionService_xchain, helpers_1.useXChain(this.configRepository), "f");
		__classPrivateFieldSet(this, _TransactionService_pchain, helpers_1.usePChain(this.configRepository), "f");
		__classPrivateFieldSet(this, _TransactionService_keychain, helpers_1.useKeychain(this.configRepository), "f");
	}
	async transfer(input) {
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(
				this.constructor.name,
				this.transfer.name,
				"input.signatory",
			);
		}
		try {
			const { child } = __classPrivateFieldGet(this, _TransactionService_keychain, "f").importKey(
				helpers_1
					.keyPairFromMnemonic(this.configRepository, input.signatory.signingKey())
					.child.getPrivateKey(),
			);
			const keyPairAddresses = __classPrivateFieldGet(
				this,
				_TransactionService_keychain,
				"f",
			).getAddressStrings();
			const { utxos } = await __classPrivateFieldGet(this, _TransactionService_xchain, "f").getUTXOs(
				child.getAddressString(),
			);
			const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
			const signedTx = (
				await __classPrivateFieldGet(this, _TransactionService_xchain, "f").buildBaseTx(
					utxos,
					new avalanche_1.BN(amount),
					this.configRepository.get("network.meta.assetId"),
					[input.data.to],
					keyPairAddresses,
					keyPairAddresses,
					input.data.memo === undefined ? undefined : avalanche_1.Buffer.from(input.data.memo),
				)
			).sign(__classPrivateFieldGet(this, _TransactionService_keychain, "f"));
			return this.dataTransferObjectService.signedTransaction(
				// @ts-ignore - feross/buffer should behave the same as nodejs/buffer
				platform_sdk_crypto_1.Hash.sha256(signedTx.toBuffer()).toString("hex"),
				{
					sender: input.signatory.address(),
					recipient: input.data.to,
					amount,
					fee: utils_1.BigNumber.make(0.001).times(1e8),
					timestamp: platform_sdk_intl_1.DateTime.make(),
				},
				signedTx.toString(),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async vote(input) {
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(
				this.constructor.name,
				this.vote.name,
				"input.signatory",
			);
		}
		try {
			const { child } = __classPrivateFieldGet(this, _TransactionService_keychain, "f").importKey(
				helpers_1
					.keyPairFromMnemonic(this.configRepository, input.signatory.signingKey())
					.child.getPrivateKey(),
			);
			const keyPairAddresses = __classPrivateFieldGet(
				this,
				_TransactionService_keychain,
				"f",
			).getAddressStrings();
			const { utxos } = await __classPrivateFieldGet(this, _TransactionService_pchain, "f").getUTXOs(
				child.getAddressString(),
			);
			const signedTx = (
				await __classPrivateFieldGet(this, _TransactionService_pchain, "f").buildAddDelegatorTx(
					utxos,
					keyPairAddresses,
					keyPairAddresses,
					keyPairAddresses,
					input.data.votes[0],
					// @ts-ignore
					"START-TIME",
					"END-TIME",
					"STAKE-AMOUNT",
					keyPairAddresses,
				)
			).sign(__classPrivateFieldGet(this, _TransactionService_keychain, "f"));
			return this.dataTransferObjectService.signedTransaction(
				uuid_1.v4(),
				{
					sender: input.signatory.address(),
					recipient: input.signatory.address(),
					amount: 0,
					fee: 0,
				},
				signedTx.toString(),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_TransactionService_xchain = new WeakMap()),
	(_TransactionService_pchain = new WeakMap()),
	(_TransactionService_keychain = new WeakMap());
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
