import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Network } from "./network";

let subject: Network;

beforeEach(() => {
	subject = new Network("ARK", ARK.manifest.networks["ark.devnet"]);
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

it("should allows voting", () => {
	expect(subject.allowsVoting()).toBeTrue();
});

it("should maximum votes per wallet", () => {
	expect(subject.maximumVotesPerWallet()).toBe(1);
});

it("should maximum votes per transaction", () => {
	expect(subject.maximumVotesPerTransaction()).toBe(1);
});

it("should have an object representation", () => {
	expect(subject.toObject()).toBeObject();
});

it("should have an string representation", () => {
	expect(subject.toJson()).toBeString();
});
