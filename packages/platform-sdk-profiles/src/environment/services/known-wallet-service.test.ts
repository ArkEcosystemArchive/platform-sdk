import "jest-extended";

import nock from "nock";

import { KnownWalletService } from "./known-wallet-service";

let subject: KnownWalletService;

beforeEach(async () => {
	subject = new KnownWalletService();


	nock()
		.get('')
		.respond(200, [{
			"type": "team",
			"name": "ACF Hot Wallet",
			"address": "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67"
		},
		{
			"type": "team",
			"name": "ACF Hot Wallet (old)",
			"address": "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR"
		}])
});

describe("KnownWalletService", () => {
	test("#name", async () => {
		expect(subject.name("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toEqual("Team Display Name");
		expect(subject.name("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toEqual("Exchange Display Name");
		expect(subject.name("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkWa")).toEqual(undefined);
	});

	test("#isKnown", async () => {
		expect(subject.isKnown("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeTrue();
		expect(subject.isKnown("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67s")).toBeFalse();
	});

	test("#isOwnedByExchange", async () => {
		expect(subject.isOwnedByExchange("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toBeTrue();
		expect(subject.isOwnedByExchange("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeFalse();
	});

	test("#isOwnedByTeam", async () => {
		expect(subject.isOwnedByTeam("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeTrue();
		expect(subject.isOwnedByTeam("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toBeFalse();
	});
});
