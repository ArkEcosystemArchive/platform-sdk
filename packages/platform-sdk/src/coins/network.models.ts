import { KeyValuePair } from "../contracts";

export type FeeType = "static" | "dynamic" | "gas" | "free" | "weight";

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

export type ExpirationType = "height" | "timestamp";

export interface SignatureMethods {
	default: boolean;
	ledgerS?: boolean;
	ledgerX?: boolean;
}

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
			secret?: boolean;
			validate?: boolean;
		};
		publicKey?: {
			mnemonic?: boolean;
			multiSignature?: boolean;
			wif?: boolean;
			secret?: boolean;
		};
		privateKey?: {
			mnemonic?: boolean;
			wif?: boolean;
			secret?: boolean;
		};
		wif?: {
			mnemonic?: boolean;
			secret?: boolean;
		};
		keyPair?: {
			mnemonic?: boolean;
			privateKey?: boolean;
			wif?: boolean;
			secret?: boolean;
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
		transfer?: SignatureMethods;
		secondSignature?: SignatureMethods;
		delegateRegistration?: SignatureMethods;
		vote?: SignatureMethods;
		multiSignature?: SignatureMethods;
		ipfs?: SignatureMethods;
		multiPayment?: SignatureMethods;
		delegateResignation?: SignatureMethods;
		htlcLock?: SignatureMethods;
		htlcClaim?: SignatureMethods;
		htlcRefund?: SignatureMethods;
	};
	Miscellaneous?: {
		dynamicFees?: boolean;
		memo?: boolean;
		utxo?: boolean;
	};
	Derivation?: {
		bip39?: boolean;
		bip44?: boolean;
		bip49?: boolean;
		bip84?: boolean;
		secret?: boolean;
	};
	Internal?: {
		fastDelegateSync?: boolean;
	};
}

export interface NetworkManifest {
	id: string;
	type: string;
	name: string;
	coin: string;
	explorer: string;
	currency: {
		ticker: string;
		symbol: string;
	};
	fees: {
		type: FeeType;
		ticker: string;
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
		derivation?: {
			extendedPublicKey: boolean;
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

export interface CoinManifest {
	name: string;
	networks: Record<string, NetworkManifest>;
}
