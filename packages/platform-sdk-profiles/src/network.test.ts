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

it("should have an name", () => {
	expect(subject.name()).toBe("Devnet");
});

it("should have an explorer", () => {
	expect(subject.explorer()).toBe("https://dexplorer.ark.io/");
});

it("should have an ticker", () => {
	expect(subject.ticker()).toBe("DARK");
});

it("should have an symbol", () => {
	expect(subject.symbol()).toBe("DѦ");
});

it("should have an isLive", () => {
	expect(subject.isLive()).toBeFalse();
});

it("should have an isTest", () => {
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
		hosts: [
			"https://dexplorer.ark.io",
			"http://167.114.29.51:4003",
			"http://167.114.29.52:4003",
			"http://167.114.29.53:4003",
			"http://167.114.29.54:4003",
			"http://167.114.29.55:4003",
		],
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
