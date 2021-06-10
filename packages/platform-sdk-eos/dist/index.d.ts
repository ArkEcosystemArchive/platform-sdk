import { ServiceProvider } from "./coin.provider";
export declare const EOS: {
	dataTransferObjects: {
		SignedTransactionData: typeof import("./signed-transaction.dto").SignedTransactionData;
		TransactionData: typeof import("./transaction.dto").TransactionData;
		WalletData: typeof import("./wallet.dto").WalletData;
	};
	manifest: {
		name: string;
		networks: {
			"eos.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"eos.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"telos.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"telos.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"wax.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"worbli.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"worbli.testnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"meetone.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
			"bos.mainnet": import("@arkecosystem/platform-sdk/dist/networks").NetworkManifest;
		};
	};
	schema: import("joi").ObjectSchema<any>;
	ServiceProvider: typeof ServiceProvider;
};
