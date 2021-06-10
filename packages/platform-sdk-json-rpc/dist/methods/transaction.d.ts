import Joi from "joi";
export declare const registerTransaction: () => {
	name: string;
	method(
		input: any,
	): Promise<{
		id: string;
		data: any;
	}>;
	schema: Joi.ObjectSchema<any>;
}[];
