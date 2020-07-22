import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { NetworkData } from "./network";

let subject: NetworkData;

beforeEach(() => {
	subject = new NetworkData("ARK", ARK.manifest.networks.devnet);
});

it("should have an id", () => {
	expect(subject.id()).toBe("devnet");
});

it("should have a name", () => {
	expect(subject.name()).toBe("Devnet");
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
		hosts: ["https://dwallets.ark.io"],
		hostsMultiSignature: [],
		id: "devnet",
		name: "Devnet",
		type: "test",
		voting: {
			enabled: true,
			singular: true,
		},
	});
});
