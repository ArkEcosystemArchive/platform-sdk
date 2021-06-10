import { ServiceProvider } from "./coin.provider";
export declare const DOT: {
	dataTransferObjects: {
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"dot.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"ksm.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
