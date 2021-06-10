import { ServiceProvider } from "./coin.provider";
export declare const ADA: {
	dataTransferObjects: {
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		TransactionData: typeof import("./transaction.dto").TransactionData;
		TransferData: typeof import("./transfer.dto").TransferData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"ada.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"ada.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
