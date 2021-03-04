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
	| "htlc-claim"
	| "htlc-lock"
	| "htlc-refund"
	| "ipfs"
	| "multi-payment"
	| "multi-signature"
	| "second-signature"
	| "transfer"
	| "vote";

export interface CoinNetwork {
	id: string;
	type: string;
	name: string;
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
	featureFlags: {
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
			secondSignature?: boolean;
			delegateRegistration?: boolean;
			vote?: boolean;
			multiSignature?: boolean;
			ipfs?: boolean;
			multiPayment?: boolean;
			delegateResignation?: boolean;
			htlcLock?: boolean;
			htlcClaim?: boolean;
			htlcRefund?: boolean;
		};
		Miscellaneous?: {
			memo?: boolean;
			utxo?: boolean;
			dynamicFees?: boolean;
			customPeer?: boolean;
		};
		Derivation?: {
			bip32?: boolean;
			bip39?: boolean;
		};
	};
	transactionTypes: CoinTransactionTypes[];
	knownWallets?: string;
	meta?: KeyValuePair;
}
