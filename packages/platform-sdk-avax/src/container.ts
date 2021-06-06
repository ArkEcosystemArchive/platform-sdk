import { IoC, Helpers } from "@arkecosystem/platform-sdk";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

export const container = new IoC.Container();

export const bigNumber = (value: NumberLike): BigNumber => Helpers.this.bigNumberService.make(value, container);
