import "jest-extended";

import { URI } from "./uri";

let subject: URI;

beforeEach(async () => (subject = new URI()));

describe("URI", () => {
	it("should serialize", () => {
		const result = subject.serialize({
			method: "transfer",
			coin: "ark",
			network: "mainnet",
			recipient: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			amount: "1.2",
			memo: "ARK",
		});

		expect(result).toEqual(
			"ark:transfer?coin=ark&network=mainnet&recipient=DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9&amount=1.2&memo=ARK",
		);
	});

	it("should deserialize", () => {
		const result = subject.deserialize(
			"ark:transfer?coin=ark&network=mainnet&recipient=DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9&amount=1.2&memo=ARK",
		);

		expect(result).toEqual({
			method: "transfer",
			coin: "ark",
			network: "mainnet",
			recipient: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			amount: "1.2",
			memo: "ARK",
		});
	});

	it("should fail to deserialize with minimal schema", () => {
		expect(() => subject.deserialize("ark:DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")).toThrowError(
			"The given data is malformed: ValidationError: amount is a required field",
		);
	});

	it("should fail to deserialize with custom network", () => {
		expect(() => subject.deserialize("ark:LNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")).toThrowError(
			"The given data is malformed: ValidationError: amount is a required field",
		);
	});

	it("should fail to deserialize with with params", () => {
		expect(() => subject.deserialize("ark:DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9?amount=1.2&")).toThrowError(
			"The given data is malformed: ValidationError: recipient is a required field",
		);
	});

	it("should fail to deserialize with wrong address", () => {
		expect(() => subject.deserialize("ark:x")).toThrowError(
			"The given data is malformed: ValidationError: amount is a required field",
		);
	});

	it("should fail to deserialize with wrong protocol", () => {
		expect(() => subject.deserialize("mailto:DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")).toThrowError(
			"The given data is malformed.",
		);
	});
});
