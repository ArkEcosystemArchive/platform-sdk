/**
 * Defines the data that is allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export enum WalletData {
	// Identity
	Coin = "COIN",
	Network = "NETWORK",
	Address = "ADDRESS",
	PublicKey = "PUBLIC_KEY",
	// Other
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
export enum WalletFlag {
	Starred = "STARRED",
}

/**
 * Defines the settings that are allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export enum WalletSetting {
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
export const WalletImportMethod = {
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
	SECRET: "SECRET",
	SECRET_WITH_ENCRYPTION: "SECRET_WITH_ENCRYPTION",
	WIF: "WIF",
	WIFWithEncryption: "WIF_WITH_ENCRYPTION",
};
