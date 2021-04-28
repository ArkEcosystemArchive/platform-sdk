import { KeyValuePair } from "../contracts";

export type CoinTransactionTypes =
	| "bridgechain-registration"
	| "bridgechain-resignation"
	| "bridgechain-update"
	| "business-registration"
	| "business-resignation"
	| "business-update"
	| "delegate-registration"
	| "delegate-resignation"
	| "entity-registration"
	| "entity-resignation"
	| "entity-update"
	| "ipfs"
	| "multi-payment"
	| "multi-signature"
	| "second-signature"
	| "transfer"
	| "vote";

export type ExpirationType = "height" | "timestamp";

export interface NetworkFeatureFlags {
	Client?: {
		transaction?: boolean;
		transactions?: boolean;
		wallet?: boolean;
		wallets?: boolean;
		delegate?: boolean;
		delegates?: boolean;
		votes?: boolean;
		voters?: boolean;
		configuration?: boolean;
		fees?: boolean;
		syncing?: boolean;
		broadcast?: boolean;
	};
	Fee?: {
		all?: boolean;
	};
	Identity?: {
		address?: {
			mnemonic?: boolean;
			multiSignature?: boolean;
			publicKey?: boolean;
			privateKey?: boolean;
			wif?: boolean;
			validate?: boolean;
		};
		publicKey?: {
			mnemonic?: boolean;
			multiSignature?: boolean;
			wif?: boolean;
		};
		privateKey?: {
			mnemonic?: boolean;
			wif?: boolean;
		};
		wif?: {
			mnemonic?: boolean;
		};
		keyPair?: {
			mnemonic?: boolean;
			privateKey?: boolean;
			wif?: boolean;
		};
	};
	Ledger?: {
		getVersion?: boolean;
		getPublicKey?: boolean;
		signTransaction?: boolean;
		signMessage?: boolean;
	};
	Link?: {
		block?: boolean;
		transaction?: boolean;
		wallet?: boolean;
	};
	Message?: {
		sign?: boolean;
		verify?: boolean;
	};
	Peer?: {
		search?: boolean;
	};
	Transaction?: {
		transfer?: boolean;
		transferWithLedgerS?: boolean;
		transferWithLedgerX?: boolean;
		secondSignature?: boolean;
		secondSignatureWithLedgerS?: boolean;
		secondSignatureWithLedgerX?: boolean;
		delegateRegistration?: boolean;
		delegateRegistrationWithLedgerS?: boolean;
		delegateRegistrationWithLedgerX?: boolean;
		vote?: boolean;
		voteWithLedgerS?: boolean;
		voteWithLedgerX?: boolean;
		multiSignature?: boolean;
		multiSignatureWithLedgerS?: boolean;
		multiSignatureWithLedgerX?: boolean;
		ipfs?: boolean;
		ipfsWithLedgerS?: boolean;
		ipfsWithLedgerX?: boolean;
		multiPayment?: boolean;
		multiPaymentWithLedgerS?: boolean;
		multiPaymentWithLedgerX?: boolean;
		delegateResignation?: boolean;
		delegateResignationWithLedgerS?: boolean;
		delegateResignationWithLedgerX?: boolean;
	};
	Miscellaneous?: {
		memo?: boolean;
		utxo?: boolean;
		dynamicFees?: boolean;
		customPeer?: boolean;
	};
	Derivation?: {
		bip39?: boolean;
		bip44?: boolean;
		bip49?: boolean;
		bip84?: boolean;
	};
	Internal?: {
		fastDelegateSync?: boolean;
	};
}

export interface CoinNetwork {
	id: string;
	type: string;
	name: string;
	coin: string;
	explorer: string;
	currency: {
		ticker: string;
		symbol: string;
	};
	crypto: {
		networkId?: string;
		blockchainId?: string;
		assetId?: string;
		slip44?: number;
		bech32?: string;
		signingMethods?: {
			mnemonic?: boolean;
			privateKey?: boolean;
			wif?: boolean;
		};
		expirationType: ExpirationType;
	};
	networking: {
		hosts: string[];
		hostsMultiSignature?: string[];
		hostsArchival?: string[];
	};
	governance?: {
		voting?: {
			enabled: boolean;
			delegateCount: number;
			maximumPerWallet: number;
			maximumPerTransaction: number;
		};
	};
	featureFlags: NetworkFeatureFlags;
	// @TODO: we could replace this with kebabCase(Object.keys(FeatureFlags.Transaction))
	transactionTypes: CoinTransactionTypes[];
	knownWallets?: string;
	meta?: KeyValuePair;
}
