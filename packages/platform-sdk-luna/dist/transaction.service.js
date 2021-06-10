"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _TransactionService_instances, _TransactionService_useClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const terra_js_1 = require("@terra-money/terra.js");
const helpers_1 = require("./helpers");
class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
	}
	async transfer(input) {
		const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const transaction = await __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_useClient,
		)
			.call(this)
			.wallet(new terra_js_1.MnemonicKey({ mnemonic: input.signatory.signingKey() }))
			.createAndSignTx({
				msgs: [new terra_js_1.MsgSend(input.signatory.address(), input.data.to, { uluna: amount })],
				memo: input.data.memo,
			});
		return this.dataTransferObjectService.signedTransaction(
			platform_sdk_crypto_1.UUID.random(),
			transaction.toData(),
			transaction.toJSON(),
		);
	}
}
exports.TransactionService = TransactionService;
(_TransactionService_instances = new WeakSet()),
	(_TransactionService_useClient = function _TransactionService_useClient() {
		return helpers_1.useClient(
			`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/api`,
			this.configRepository.get("network.meta.networkId"),
		);
	});
//# sourceMappingURL=transaction.service.js.map
