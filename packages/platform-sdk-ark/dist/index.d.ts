import { ServiceProvider } from "./coin.provider";
export declare const ARK: {
	dataTransferObjects: {
		DelegateRegistrationData: typeof import("./delegate-registration.dto").DelegateRegistrationData;
		HtlcClaimData: typeof import("./htlc-claim.dto").HtlcClaimData;
		HtlcLockData: typeof import("./htlc-lock.dto").HtlcLockData;
		HtlcRefundData: typeof import("./htlc-refund.dto").HtlcRefundData;
		IpfsData: typeof import("./ipfs.dto").IpfsData;
		MultiPaymentData: typeof import("./multi-payment.dto").MultiPaymentData;
		MultiSignatureData: typeof import("./multi-signature.dto").MultiSignatureData;
		SecondSignatureData: typeof import("./second-signature.dto").SecondSignatureData;
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		TransactionData: typeof import("./transaction.dto").TransactionData;
		TransferData: typeof import("./transfer.dto").TransferData;
		VoteData: typeof import("./vote.dto").VoteData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"ark.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"ark.devnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"bind.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"bind.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
