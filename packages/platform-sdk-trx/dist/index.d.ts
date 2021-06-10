import { ServiceProvider } from "./coin.provider";
export declare const TRX: {
	dataTransferObjects: {
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		TransactionData: typeof import("./transaction.dto").TransactionData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"trx.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"trx.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
