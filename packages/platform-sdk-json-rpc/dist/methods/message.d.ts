import Joi from "joi";
export declare const registerMessage: () => (
	| {
			name: string;
			method(input: any): Promise<import("@arkecosystem/platform-sdk/dist/services").SignedMessage>;
			schema: Joi.ObjectSchema<any>;
	  }
	| {
			name: string;
			method(input: any): Promise<boolean>;
			schema: Joi.ObjectSchema<any>;
	  }
)[];
