import Joi from "joi";
export declare const registerClient: () => {
	name: string;
	method({ coin, network, id }: { coin: any; network: any; id: any }): Promise<Record<string, any>>;
	schema: Joi.ObjectSchema<any>;
}[];
