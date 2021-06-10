import Joi from "joi";
export declare const registerPublicKey: () => (
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").PublicKeyDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method({
				coin,
				network,
				min,
				publicKeys,
			}: {
				coin: any;
				network: any;
				min: any;
				publicKeys: any;
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").PublicKeyDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").PublicKeyDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
