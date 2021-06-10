"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const address_service_1 = require("./address.service");
const client_service_1 = require("./client.service");
const fee_service_1 = require("./fee.service");
const key_pair_service_1 = require("./key-pair.service");
const known_wallets_service_1 = require("./known-wallets.service");
const ledger_service_1 = require("./ledger.service");
const message_service_1 = require("./message.service");
const multi_signature_service_1 = require("./multi-signature.service");
const private_key_service_1 = require("./private-key.service");
const public_key_service_1 = require("./public-key.service");
const transaction_service_1 = require("./transaction.service");
const wif_service_1 = require("./wif.service");
exports.Services = {
	AddressService: address_service_1.AddressService,
	ClientService: client_service_1.ClientService,
	FeeService: fee_service_1.FeeService,
	KeyPairService: key_pair_service_1.KeyPairService,
	KnownWalletService: known_wallets_service_1.KnownWalletService,
	LedgerService: ledger_service_1.LedgerService,
	MessageService: message_service_1.MessageService,
	MultiSignatureService: multi_signature_service_1.MultiSignatureService,
	PrivateKeyService: private_key_service_1.PrivateKeyService,
	PublicKeyService: public_key_service_1.PublicKeyService,
	TransactionService: transaction_service_1.TransactionService,
	WIFService: wif_service_1.WIFService,
};
//# sourceMappingURL=coin.services.js.map
