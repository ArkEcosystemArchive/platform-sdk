import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";
import { Config } from "./config";

export const toRawUnit = (value: NumberLike, config: Config) => {
  const decimals = config.get<number>("network.currency.decimals");
  const denomination = BigNumber.make(`1${"0".repeat(decimals)}`); // poor man's bigint exponentiation
  return denomination.times(value);
}