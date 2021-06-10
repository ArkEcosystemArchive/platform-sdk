import "reflect-metadata";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";
export declare class BigNumberService {
	private readonly configRepository;
	make(value: NumberLike): BigNumber;
}
