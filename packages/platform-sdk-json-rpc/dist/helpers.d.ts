import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";
export declare const makeCoin: (input: Record<string, string>) => Promise<Coins.Coin>;
export declare const useLogger: () => Console;
export declare const baseSchema: {
	coin: Joi.StringSchema;
	network: Joi.StringSchema;
};
