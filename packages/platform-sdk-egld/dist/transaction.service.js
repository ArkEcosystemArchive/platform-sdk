"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const erdjs_1 = require("@elrondnetwork/erdjs");
class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	async transfer(input) {
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(
				this.constructor.name,
				this.transfer.name,
				"sign.mnemonic",
			);
		}
		if (input.fee === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "fee");
		}
		if (input.feeLimit === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "feeLimit");
		}
		if (input.nonce === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "nonce");
		}
		const unsignedTransaction = {
			sender: input.signatory.address(),
			receiver: input.data.to,
			value: erdjs_1.Balance.egld(input.data.amount),
			gasPrice: input.fee,
			gasLimit: input.feeLimit,
			data: input.data.memo,
			timestamp: platform_sdk_intl_1.DateTime.make(),
		};
		const mnemonic = erdjs_1.Mnemonic.fromString(input.signatory.signingKey());
		const secretKey = mnemonic.deriveKey(0); // TODO probably need to consider account index for all bip44 wallets
		const signer = new erdjs_1.UserSigner(secretKey);
		const transaction = new erdjs_1.Transaction({
			receiver: erdjs_1.Address.fromString(input.data.to),
			value: erdjs_1.Balance.egld(input.data.amount),
			gasPrice: new erdjs_1.GasPrice(input.fee),
			gasLimit: new erdjs_1.GasLimit(input.feeLimit),
			data: new erdjs_1.TransactionPayload(input.data.memo),
			nonce: new erdjs_1.Nonce(parseInt(input.nonce)),
		});
		await signer.sign(transaction);
		return this.dataTransferObjectService.signedTransaction(
			transaction.getSignature().hex(),
			unsignedTransaction,
			transaction,
		);
	}
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
