import { ServiceProvider } from "./coin.provider";
export declare const ETH: {
	dataTransferObjects: {
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		TransactionData: typeof import("./transaction.dto").TransactionData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"eth.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"eth.kovan": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"eth.ropsten": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"eth.rinkeby": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"eth.goerli": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
