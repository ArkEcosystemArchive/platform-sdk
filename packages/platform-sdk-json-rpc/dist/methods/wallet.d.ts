import Joi from "joi";
export declare const registerWallet: () => {
	name: string;
	method({
		coin,
		network,
	}: {
		coin: any;
		network: any;
	}): Promise<{
		address: import("@arkecosystem/platform-sdk/dist/services").AddressDataTransferObject;
		publicKey: import("@arkecosystem/platform-sdk/dist/services").PublicKeyDataTransferObject;
		mnemonic: string;
	}>;
	schema: Joi.ObjectSchema<any>;
}[];
