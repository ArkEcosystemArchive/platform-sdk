"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletImportMethod = exports.WalletSetting = exports.WalletFlag = exports.WalletData = void 0;
/**
 * Defines the data that is allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
var WalletData;
(function (WalletData) {
	// Identity
	WalletData["Coin"] = "COIN";
	WalletData["Network"] = "NETWORK";
	WalletData["Address"] = "ADDRESS";
	WalletData["PublicKey"] = "PUBLIC_KEY";
	// Other
	WalletData["Balance"] = "BALANCE";
	WalletData["Bip38EncryptedKey"] = "BIP38_ENCRYPTED_KEY";
	WalletData["BroadcastedTransactions"] = "BROADCASTED_TRANSACTIONS";
	WalletData["Delegates"] = "DELEGATES";
	WalletData["DerivationPath"] = "DERIVATION_PATH";
	WalletData["DerivationType"] = "DERIVATION_TYPE";
	WalletData["ExchangeCurrency"] = "EXCHANGE_CURRENCY";
	WalletData["ImportMethod"] = "IMPORT_METHOD";
	WalletData["MultiSignatureParticipants"] = "MULTI_SIGNATURE_PARTICIPANTS";
	WalletData["Sequence"] = "SEQUENCE";
	WalletData["SignedTransactions"] = "SIGNED_TRANSACTIONS";
	WalletData["Votes"] = "VOTES";
	WalletData["VotesAvailable"] = "VOTES_AVAILABLE";
	WalletData["VotesUsed"] = "VOTES_USED";
	WalletData["WaitingForOtherSignaturesTransactions"] = "WAITING_FOR_OTHER_SIGNATURES_TRANSACTIONS";
	WalletData["WaitingForOurSignatureTransactions"] = "WAITING_FOR_OUR_SIGNATURE_TRANSACTIONS";
})((WalletData = exports.WalletData || (exports.WalletData = {})));
/**
 * Defines the flags that are allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
var WalletFlag;
(function (WalletFlag) {
	WalletFlag["Starred"] = "STARRED";
})((WalletFlag = exports.WalletFlag || (exports.WalletFlag = {})));
/**
 * Defines the settings that are allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
var WalletSetting;
(function (WalletSetting) {
	WalletSetting["Alias"] = "ALIAS";
	WalletSetting["Avatar"] = "AVATAR";
	WalletSetting["Peer"] = "PEER";
})((WalletSetting = exports.WalletSetting || (exports.WalletSetting = {})));
/**
 * Defines the import methods that can be used for wallets.
 *
 * @export
 * @enum {number}
 */
exports.WalletImportMethod = {
	BIP39: {
		MNEMONIC: "BIP39.MNEMONIC",
		MNEMONIC_WITH_ENCRYPTION: "BIP39.MNEMONIC_WITH_ENCRYPTION",
	},
	BIP44: {
		DERIVATION_PATH: "BIP44.DERIVATION_PATH",
		MNEMONIC: "BIP44.MNEMONIC",
		MNEMONIC_WITH_ENCRYPTION: "BIP44.MNEMONIC_WITH_ENCRYPTION",
	},
	BIP49: {
		DERIVATION_PATH: "BIP49.DERIVATION_PATH",
		MNEMONIC: "BIP49.MNEMONIC",
		MNEMONIC_WITH_ENCRYPTION: "BIP49.MNEMONIC_WITH_ENCRYPTION",
	},
	BIP84: {
		DERIVATION_PATH: "BIP84.DERIVATION_PATH",
		MNEMONIC: "BIP84.MNEMONIC",
		MNEMONIC_WITH_ENCRYPTION: "BIP84.MNEMONIC_WITH_ENCRYPTION",
	},
	Address: "ADDRESS",
	PrivateKey: "PRIVATE_KEY",
	PublicKey: "PUBLIC_KEY",
	WIF: "WIF",
	WIFWithEncryption: "WIF_WITH_ENCRYPTION",
};
//# sourceMappingURL=wallet.enum.js.map
