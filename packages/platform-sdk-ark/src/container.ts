import { IoC, Services } from "@arkecosystem/platform-sdk";
import { BigNumber, NumberLike } from "../../platform-sdk-support/dist";

export const container = new IoC.Container();

// @TODO: extract this into a helper in platform-sdk
export const bigNumber = (value: NumberLike): BigNumber => container.get<Services.BigNumberService>(IoC.ServiceKeys.BigNumberService).make(value);
