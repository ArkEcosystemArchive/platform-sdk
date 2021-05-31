/**
 * Defines the data that is allowed to be stored within a wallet.
 *
 * @export
 * @enum {number}
 */
export enum WalletData {
	Balance = "BALANCE",
	Bip38EncryptedKey = "BIP38_ENCRYPTED_KEY",
	BroadcastedTransactions = "BROADCASTED_TRANSACTIONS",
	Delegates = "DELEGATES",
	DerivationPath = "DERIVATION_PATH",
	DerivationType = "DERIVATION_TYPE",
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	ImportMethod = "IMPORT_METHOD",
	// @TODO: remove this in favour of DerivationPath
	LedgerPath = "LEDGER_PATH",
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
	MnemonicBIP39 = "MNEMONIC.BIP39",
	MnemonicBIP44 = "MNEMONIC.BIP44",
	MnemonicBIP49 = "MNEMONIC.BIP49",
	MnemonicBIP84 = "MNEMONIC.BIP84",
	Address = "ADDRESS",
	PublicKey = "PUBLIC_KEY",
	PrivateKey = "PRIVATE_KEY",
	AddressWithLedgerPath = "ADDRESS_WITH_LEDGER_PATH",
	MnemonicWithEncryption = "MNEMONIC_WITH_ENCRYPTION",
	WIF = "WIF",
	WIFWithEncryption = "WIF_WITH_ENCRYPTION",
}
