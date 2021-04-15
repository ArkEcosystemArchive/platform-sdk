import { BigNum, Value } from "@emurgo/cardano-serialization-lib-nodejs";

export const createValue = (value: string): Value => Value.new(BigNum.from_str(value));
