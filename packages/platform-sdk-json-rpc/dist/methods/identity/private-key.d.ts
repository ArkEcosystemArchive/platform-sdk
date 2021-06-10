import Joi from "joi";
export declare const registerPrivateKey: () => (
	| {
			name: string;
			method({
				coin,
				network,
				mnemonic,
			}: {
				coin: any;
				network: any;
				mnemonic: any;
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").PrivateKeyDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method({
				coin,
				network,
				wif,
			}: {
				coin: any;
				network: any;
				wif: any;
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").PrivateKeyDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
