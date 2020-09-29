import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { NetworkData } from "./network";

let subject: NetworkData;

beforeEach(() => {
	subject = new NetworkData("ARK", ARK.manifest.networks["ark.devnet"]);
});

it("should have an id", () => {
	expect(subject.id()).toBe("ark.devnet");
});

it("should have a name", () => {
	expect(subject.name()).toBe("ARK Devnet");
});

it("should have an explorer", () => {
	expect(subject.explorer()).toBe("https://dexplorer.ark.io/");
});

it("should have a ticker", () => {
	expect(subject.ticker()).toBe("DARK");
});

it("should have a symbol", () => {
	expect(subject.symbol()).toBe("DѦ");
});

it("should determine if the network is a live environment", () => {
	expect(subject.isLive()).toBeFalse();
});

it("should determine if the network is a test environment", () => {
	expect(subject.isTest()).toBeTrue();
});

it("should have an toObject", () => {
	expect(subject.toObject()).toEqual({
		crypto: {
			slip44: 111,
		},
		currency: {
			symbol: "DѦ",
			ticker: "DARK",
		},
		explorer: "https://dexplorer.ark.io/",
		networking: { hosts: ["https://dwallets.ark.io"], hostsMultiSignature: ["https://dmusig1.ark.io"] },
		id: "ark.devnet",
		name: "ARK Devnet",
		type: "test",
		governance: {
			voting: {
				enabled: true,
				maximum: 1,
				maximumPerTransaction: 1,
			},
		},
	});
});
