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
export enum WalletImportMethod {
	Address = "ADDRESS",
	AddressWithDerivationPath = "ADDRESS_WITH_DERIVATION_PATH",
	MnemonicBIP39 = "MNEMONIC.BIP39",
	MnemonicBIP39WithEncryption = "MNEMONIC.BIP39.ENCRYPTION",
	MnemonicBIP44 = "MNEMONIC.BIP44",
	MnemonicBIP44WithEncryption = "MNEMONIC.BIP44.ENCRYPTION",
	MnemonicBIP49 = "MNEMONIC.BIP49",
	MnemonicBIP49WithEncryption = "MNEMONIC.BIP49.ENCRYPTION",
	MnemonicBIP84 = "MNEMONIC.BIP84",
	MnemonicBIP84WithEncryption = "MNEMONIC.BIP84.ENCRYPTION",
	PrivateKey = "PRIVATE_KEY",
	PublicKey = "PUBLIC_KEY",
	WIF = "WIF",
	WIFWithEncryption = "WIF_WITH_ENCRYPTION",
}
