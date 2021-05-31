import "jest-extended";
import { Config } from "./config";
import { toRawUnit } from "./currency";

const configMock = ({ get: () => 8 } as unknown) as Config;

test("#toRawUnit", () => {
	expect(toRawUnit(42, configMock).toNumber()).toBe(4_200_000_000);
});
