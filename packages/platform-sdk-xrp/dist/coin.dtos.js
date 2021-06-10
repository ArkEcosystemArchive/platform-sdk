"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransferObjects = void 0;
const signed_transaction_dto_1 = require("./signed-transaction.dto");
const transaction_dto_1 = require("./transaction.dto");
const transfer_dto_1 = require("./transfer.dto");
const wallet_dto_1 = require("./wallet.dto");
exports.DataTransferObjects = {
	SignedTransactionData: signed_transaction_dto_1.SignedTransactionData,
	TransactionData: transaction_dto_1.TransactionData,
	TransferData: transfer_dto_1.TransferData,
	WalletData: wallet_dto_1.WalletData,
};
//# sourceMappingURL=coin.dtos.js.map
