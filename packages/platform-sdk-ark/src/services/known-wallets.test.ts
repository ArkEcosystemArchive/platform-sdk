import "jest-extended";

import { createConfig } from "../../test/helpers";
import { KnownWalletService } from "./known-wallets";

let subject: KnownWalletService;
let subjectEmpty: KnownWalletService;

beforeEach(async () => {
	const config = createConfig();
	config.set("network.knownWallets", [
		{
			type: "team",
			name: "Team Display Name",
			address: "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67",
		},
		{
			type: "exchange",
			name: "Exchange Display Name",
			address: "ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW",
		},
	]);
	subject = await KnownWalletService.construct(config);
	subjectEmpty = await KnownWalletService.construct(createConfig());
});

describe("KnownWalletService", () => {
	test("should start empty", async () => {
		expect(subject.findByAddress("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67s")).toBeUndefined();
	});

	test("#findByAddress", async () => {
		expect(subject.findByAddress("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toEqual({
			type: "team",
			name: "Team Display Name",
			address: "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67",
		});

		expect(subject.findByAddress("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67s")).toBeUndefined();
	});

	test("#isKnown", async () => {
		expect(subject.isKnown("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeTrue();
		expect(subject.isKnown("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67s")).toBeFalse();
	});

	test("#hasType", async () => {
		expect(subject.hasType("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67", "team")).toBeTrue();
		expect(subject.hasType("AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR", "team")).toBeFalse();
	});

	test("#isOwnedByExchange", async () => {
		expect(subject.isOwnedByExchange("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toBeTrue();
		expect(subject.isOwnedByExchange("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeFalse();
	});

	test("#isOwnedByTeam", async () => {
		expect(subject.isOwnedByTeam("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeTrue();
		expect(subject.isOwnedByTeam("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toBeFalse();
	});

	test("#displayName", async () => {
		expect(subject.displayName("AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toEqual("Team Display Name");
		expect(subject.displayName("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkW")).toEqual("Exchange Display Name");
		expect(subject.displayName("ANvR7ny44GrLy4NTfuVqjGYr4EAwK7vnkWa")).toEqual(undefined);
	});
});
