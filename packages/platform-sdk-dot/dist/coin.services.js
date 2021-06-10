"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const address_service_1 = require("./address.service");
const client_service_1 = require("./client.service");
const key_pair_service_1 = require("./key-pair.service");
const ledger_service_1 = require("./ledger.service");
const message_service_1 = require("./message.service");
const private_key_service_1 = require("./private-key.service");
const public_key_service_1 = require("./public-key.service");
const transaction_service_1 = require("./transaction.service");
exports.Services = {
	AddressService: address_service_1.AddressService,
	ClientService: client_service_1.ClientService,
	KeyPairService: key_pair_service_1.KeyPairService,
	LedgerService: ledger_service_1.LedgerService,
	MessageService: message_service_1.MessageService,
	PrivateKeyService: private_key_service_1.PrivateKeyService,
	PublicKeyService: public_key_service_1.PublicKeyService,
	TransactionService: transaction_service_1.TransactionService,
};
//# sourceMappingURL=coin.services.js.map
