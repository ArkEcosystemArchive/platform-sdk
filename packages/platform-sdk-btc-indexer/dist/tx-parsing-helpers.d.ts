import { BigNumber } from "@arkecosystem/utils";
import { Input, Output } from "./types";
export declare const getAmount: (transaction: any) => BigNumber;
export declare const getOutputs: (transaction: any) => Output[];
export declare const getInputs: (transaction: any) => Input[];
export declare const getFees: (transaction: any, outputs: any) => BigNumber;
