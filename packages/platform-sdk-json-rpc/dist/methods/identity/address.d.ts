import Joi from "joi";
export declare const registerAddress: () => (
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method({
				coin,
				network,
				publicKey,
			}: {
				coin: any;
				network: any;
				publicKey: any;
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject>;
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
			}): Promise<import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method({ coin, network, address }: { coin: any; network: any; address: any }): Promise<boolean>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
