import "jest-extended";

import { URI } from "./uri";

let subject: URI;

beforeEach(async () => (subject = new URI()));

describe("URI", () => {
	it("should serialize", () => {
		const result = subject.serialize({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			amount: 1.2,
			memo: "ARK",
		});

		expect(result).toEqual(
			"ark:transfer?coin=ark&network=ark.mainnet&recipient=DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9&amount=1.2&memo=ARK",
		);
	});

	it("should deserialize", () => {
		const result = subject.deserialize(
			"ark:transfer?coin=ark&network=ark.mainnet&recipient=DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9&amount=1.2&memo=ARK",
		);

		expect(result).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			amount: "1.2",
			memo: "ARK",
		});
	});

	it("should fail to deserialize with an invalid protocol", () => {
		expect(() => subject.deserialize("mailto:DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")).toThrowError(
			"The given data is malformed.",
		);
	});

	it("should fail to deserialize with invalid data", () => {
		expect(() =>
			subject.deserialize(
				"ark:transfer?coin=ark&network=ark.mainnet&recipient=DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9&amount=ARK&memo=ARK",
			),
		).toThrowError('The given data is malformed: ValidationError: "amount" must be a number');
	});
});

describe("AIP13", () => {
	// @ts-ignore
	it.each(require("../test/aip13.json"))("should deserialize (%s)", (input, output) => {
		expect(subject.deserialize(input)).toEqual(output);
	});
});

describe("AIP26", () => {
	// @ts-ignore
	it.each(require("../test/aip26.json"))("should deserialize (%s)", (input, output) => {
		expect(subject.deserialize(input)).toEqual(output);
	});
});
