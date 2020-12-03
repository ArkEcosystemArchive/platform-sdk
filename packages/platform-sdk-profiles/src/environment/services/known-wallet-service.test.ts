import "jest-extended";

import { KnownWalletService } from "./known-wallet-service";

let subject: KnownWalletService;

beforeEach(async () => {
	subject = new KnownWalletService();
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
