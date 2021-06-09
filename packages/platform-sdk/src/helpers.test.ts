import "jest-extended";

import { ConfigRepository } from "./coins";
import {
	filterHostsFromConfig,
	pluckAddress,
	randomNetworkHostFromConfig,
	randomHostFromConfig,
	toRawUnit,
} from "./helpers";

afterEach(() => jest.restoreAllMocks());

const configMock = ({
	get: () => [
		{
			type: "full",
			host: "https://wallets.ark.io",
		},
		{
			type: "musig",
			host: "https://musig1.ark.io",
		},
		{
			type: "explorer",
			host: "https://explorer.ark.io",
		},
	],
} as unknown) as ConfigRepository;

test("filterHostsFromConfig", () => {
	expect(filterHostsFromConfig(configMock, "explorer")).toEqual([
		{
			type: "explorer",
			host: "https://explorer.ark.io",
		},
	]);
});

test("randomNetworkHostFromConfig", () => {
	expect(randomNetworkHostFromConfig(configMock, "explorer")).toEqual({
		type: "explorer",
		host: "https://explorer.ark.io",
	});
});

test("randomNetworkHostFromConfig default", () => {
	expect(randomNetworkHostFromConfig(configMock)).toEqual({
		type: "full",
		host: "https://wallets.ark.io",
	});
});

test("randomHostFromConfig default", () => {
	expect(randomHostFromConfig(configMock)).toBe("https://wallets.ark.io");
});

describe("pluckAddress", () => {
	test("senderId", () => {
		expect(pluckAddress({ senderId: "senderId" })).toBe("senderId");
	});

	test("recipientId", () => {
		expect(pluckAddress({ recipientId: "recipientId" })).toBe("recipientId");
	});

	test("address", () => {
		expect(pluckAddress({ address: "address" })).toBe("address");
	});

	test("addresses", () => {
		expect(pluckAddress({ addresses: ["addresses"] })).toBe("addresses");
	});

	test("addresses", () => {
		expect(() => pluckAddress({ key: "value" })).toThrow("Failed to pluck any address.");
	});
});

test("#toRawUnit", () => {
	const configMock = ({ get: () => 8 } as unknown) as ConfigRepository;

	expect(toRawUnit(42, configMock).toNumber()).toBe(4_200_000_000);
});
