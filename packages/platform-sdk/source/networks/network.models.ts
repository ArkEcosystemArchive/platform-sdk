export type FeeType = "static" | "dynamic" | "gas" | "free" | "weight";

export type ExpirationType = "height" | "timestamp";

export type SignatureMethod = "default" | "musig" | "ledgerS" | "ledgerX";

export type NetworkHostType = "full" | "musig" | "archival" | "explorer";

export type WalletPermission = "read" | "write";

export type CoinTransactionTypes =
	| "delegate-registration"
	| "delegate-resignation"
	| "htlc-claim"
	| "htlc-lock"
	| "htlc-refund"
	| "ipfs"
	| "multi-payment"
	| "multi-signature"
	| "second-signature"
	| "transfer"
	| "vote";

export interface NetworkHost {
	type: NetworkHostType;
	host: string;
	query?: Record<string, string>;
}

export interface ImportMethod {
	default: boolean;
	permissions: WalletPermission[];
}

export interface NetworkManifestTransactions {
	expirationType: ExpirationType;
	types: CoinTransactionTypes[];
	fees: {
		type: FeeType;
		ticker: string;
	};
	memo?: boolean;
	utxo?: boolean;
}

export interface NetworkManifestFeatureFlags {
	Client?: ClientMethods;
	Fee?: FeeMethods;
	Identity?: IdentityMethods;
	Ledger?: LedgerMethods;
	Link?: LinkMethods;
	Message?: MessageMethods;
	Transaction?: TransactionMethods;
}

export interface NetworkManifestExplorer {
	block: string;
	transaction: string;
	wallet: string;
}

export interface NetworkManifestToken {
	name: string;
	symbol: string;
	address: string;
	decimals: number;
}

export interface NetworkManifestImportMethods {
	address?: ImportMethod;
	bip38?: ImportMethod;
	bip39?: ImportMethod;
	bip44?: ImportMethod;
	bip49?: ImportMethod;
	bip84?: ImportMethod;
	privateKey?: ImportMethod;
	publicKey?: ImportMethod;
	secret?: ImportMethod;
	wif?: ImportMethod;
}

export interface NetworkManifestConstants {
	slip44: number;
	bech32?: string;
}

export interface NetworkManifest {
	id: string;
	type: string;
	name: string;
	coin: string;
	currency: {
		ticker: string;
		symbol: string;
		decimals?: number;
	};
	hosts: NetworkHost[];
	constants: NetworkManifestConstants;
	governance?: {
		delegateCount: number;
		votesPerWallet: number;
		votesPerTransaction: number;
	};
	transactions: NetworkManifestTransactions;
	importMethods: NetworkManifestImportMethods;
	knownWallets?: string;
	featureFlags: NetworkManifestFeatureFlags;
	explorer: NetworkManifestExplorer;
	tokens?: NetworkManifestToken[];
	meta?: Record<string, any>;
}

export interface CoinManifest {
	name: string;
	networks: Record<string, NetworkManifest>;
}

// These types and interfaces describe what functionality is available.
// A client shall use these to modify the UI to avoid the execution of
// methods that are not available.

export type ClientMethod =
	| "transaction"
	| "transactions"
	| "wallet"
	| "wallets"
	| "delegate"
	| "delegates"
	| "votes"
	| "voters"
	| "configuration"
	| "fees"
	| "syncing"
	| "broadcast";
export type ClientMethods = ClientMethod[];

export type FeeMethod = "all";
export type FeeMethods = FeeMethod[];

export type IdentityMethod =
	| "address.mnemonic.bip39"
	| "address.mnemonic.bip44"
	| "address.mnemonic.bip49"
	| "address.mnemonic.bip84"
	| "address.multiSignature"
	| "address.privateKey"
	| "address.publicKey"
	| "address.secret"
	| "address.validate"
	| "address.wif"
	| "keyPair.mnemonic.bip39"
	| "keyPair.mnemonic.bip44"
	| "keyPair.mnemonic.bip49"
	| "keyPair.mnemonic.bip84"
	| "keyPair.privateKey"
	| "keyPair.secret"
	| "keyPair.wif"
	| "privateKey.mnemonic.bip39"
	| "privateKey.mnemonic.bip44"
	| "privateKey.mnemonic.bip49"
	| "privateKey.mnemonic.bip84"
	| "privateKey.secret"
	| "privateKey.wif"
	| "publicKey.mnemonic.bip39"
	| "publicKey.mnemonic.bip44"
	| "publicKey.mnemonic.bip49"
	| "publicKey.mnemonic.bip84"
	| "publicKey.multiSignature"
	| "publicKey.secret"
	| "publicKey.wif"
	| "wif.mnemonic.bip39"
	| "wif.mnemonic.bip44"
	| "wif.mnemonic.bip49"
	| "wif.mnemonic.bip84"
	| "wif.secret";
export type IdentityMethods = IdentityMethod[];

export type LedgerMethod = "getVersion" | "getPublicKey" | "signTransaction" | "signMessage";
export type LedgerMethods = LedgerMethod[];

export type LinkMethod = "block" | "transaction" | "wallet";
export type LinkMethods = LinkMethod[];

export type MessageMethod = "sign" | "verify";
export type MessageMethods = MessageMethod[];

export type TransactionMethod =
	| "delegateRegistration.ledgerS"
	| "delegateRegistration.ledgerX"
	| "delegateRegistration.musig"
	| "delegateRegistration"
	| "delegateResignation.ledgerS"
	| "delegateResignation.ledgerX"
	| "delegateResignation.musig"
	| "delegateResignation"
	| "estimateExpiration"
	| "htlcClaim.ledgerS"
	| "htlcClaim.ledgerX"
	| "htlcClaim.musig"
	| "htlcClaim"
	| "htlcLock.ledgerS"
	| "htlcLock.ledgerX"
	| "htlcLock.musig"
	| "htlcLock"
	| "htlcRefund.ledgerS"
	| "htlcRefund.ledgerX"
	| "htlcRefund.musig"
	| "htlcRefund"
	| "ipfs.ledgerS"
	| "ipfs.ledgerX"
	| "ipfs.musig"
	| "ipfs"
	| "multiPayment.ledgerS"
	| "multiPayment.ledgerX"
	| "multiPayment.musig"
	| "multiPayment"
	| "multiSignature.ledgerS"
	| "multiSignature.ledgerX"
	| "multiSignature.musig"
	| "multiSignature"
	| "secondSignature.ledgerS"
	| "secondSignature.ledgerX"
	| "secondSignature.musig"
	| "secondSignature"
	| "transfer.ledgerS"
	| "transfer.ledgerX"
	| "transfer.musig"
	| "transfer"
	| "vote.ledgerS"
	| "vote.ledgerX"
	| "vote.musig"
	| "vote";
export type TransactionMethods = TransactionMethod[];
