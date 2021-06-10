/**
 * Defines the data that is allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export declare enum WalletData {
	Coin = "COIN",
	Network = "NETWORK",
	Address = "ADDRESS",
	PublicKey = "PUBLIC_KEY",
	Balance = "BALANCE",
	Bip38EncryptedKey = "BIP38_ENCRYPTED_KEY",
	BroadcastedTransactions = "BROADCASTED_TRANSACTIONS",
	Delegates = "DELEGATES",
	DerivationPath = "DERIVATION_PATH",
	DerivationType = "DERIVATION_TYPE",
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	ImportMethod = "IMPORT_METHOD",
	MultiSignatureParticipants = "MULTI_SIGNATURE_PARTICIPANTS",
	Sequence = "SEQUENCE",
	SignedTransactions = "SIGNED_TRANSACTIONS",
	Votes = "VOTES",
	VotesAvailable = "VOTES_AVAILABLE",
	VotesUsed = "VOTES_USED",
	WaitingForOtherSignaturesTransactions = "WAITING_FOR_OTHER_SIGNATURES_TRANSACTIONS",
	WaitingForOurSignatureTransactions = "WAITING_FOR_OUR_SIGNATURE_TRANSACTIONS",
}
/**
 * Defines the flags that are allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export declare enum WalletFlag {
	Starred = "STARRED",
}
/**
 * Defines the settings that are allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export declare enum WalletSetting {
	Alias = "ALIAS",
	Avatar = "AVATAR",
	Peer = "PEER",
}
/**
 * Defines the import methods that can be used for wallets.
 *
 * @export
 * @enum {number}
 */
export declare const WalletImportMethod: {
	BIP39: {
		MNEMONIC: string;
		MNEMONIC_WITH_ENCRYPTION: string;
	};
	BIP44: {
		DERIVATION_PATH: string;
		MNEMONIC: string;
		MNEMONIC_WITH_ENCRYPTION: string;
	};
	BIP49: {
		DERIVATION_PATH: string;
		MNEMONIC: string;
		MNEMONIC_WITH_ENCRYPTION: string;
	};
	BIP84: {
		DERIVATION_PATH: string;
		MNEMONIC: string;
		MNEMONIC_WITH_ENCRYPTION: string;
	};
	Address: string;
	PrivateKey: string;
	PublicKey: string;
	WIF: string;
	WIFWithEncryption: string;
};
