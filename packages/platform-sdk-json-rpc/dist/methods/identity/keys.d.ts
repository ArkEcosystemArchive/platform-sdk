import Joi from "joi";
export declare const registerKeys: () => (
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").KeyPairDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method({
				coin,
				network,
				privateKey,
			}: {
				coin: any;
				network: any;
				privateKey: any;
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").KeyPairDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").KeyPairDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
