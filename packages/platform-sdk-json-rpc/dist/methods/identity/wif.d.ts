import Joi from "joi";
export declare const registerWIF: () => (
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").WIFDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").WIFDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
