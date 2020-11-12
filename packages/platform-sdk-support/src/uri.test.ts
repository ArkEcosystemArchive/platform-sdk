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
			amount: "1.2",
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

	it("should fail to deserialize with wrong protocol", () => {
		expect(() => subject.deserialize("mailto:DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")).toThrowError(
			"The given data is malformed.",
		);
	});
});

describe("AIP13", () => {
	it("ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ", () => {
		expect(subject.deserialize(
			"ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
		});
	});

	it("ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?amount=20.3", () => {
		expect(subject.deserialize(
			"ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?amount=20.3",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
			amount: "20.3",
		});
	});

	it("ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?label=John-Doe&amount=20.3", () => {
		expect(subject.deserialize(
			"ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?label=John-Doe&amount=20.3",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
			label: "John-Doe",
			amount: "20.3",
		});
	});

	it("ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?label=John-Doe&amount=20.3&vendorField=999", () => {
		expect(subject.deserialize(
			"ark:AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ?label=John-Doe&amount=20.3&vendorField=999",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
			label: "John-Doe",
			amount: "20.3",
			vendorField: "999",
		});
	});
});

describe("AIP26", () => {
	it("ark:transfer?coin=ark&network=ark.mainnet&recipient=AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ", () => {
		expect(subject.deserialize(
			"ark:transfer?coin=ark&network=ark.mainnet&recipient=AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
		});
	});

	it("ark:transfer?coin=lisk&network=lisk.mainnet&recipient=8290259686148623987L", () => {
		expect(subject.deserialize(
			"ark:transfer?coin=lisk&network=lisk.mainnet&recipient=8290259686148623987L",
		)).toEqual({
			method: "transfer",
			coin: "lisk",
			network: "lisk.mainnet",
			recipient: "8290259686148623987L",
		});
	});

	it("ark:transfer?coin=ark&network=ark.mainnet&recipient=AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ&amount=10&vendorField=999&fee=0.1&relay=1.1.1.1", () => {
		expect(subject.deserialize(
			"ark:transfer?coin=ark&network=ark.mainnet&recipient=AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ&amount=10&vendorField=999&fee=0.1&relay=1.1.1.1",
		)).toEqual({
			method: "transfer",
			coin: "ark",
			network: "ark.mainnet",
			recipient: "AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ",
			amount: "10",
			vendorField: "999",
			fee: "0.1",
			relay: "1.1.1.1",
		});
	});

	it("ark:vote?coin=ark&network=ark.mainnet&delegate=genesis_10&fee=0.1", () => {
		expect(subject.deserialize(
			"ark:vote?coin=ark&network=ark.mainnet&delegate=genesis_10&fee=0.1",
		)).toEqual({
			method: "vote",
			coin: "ark",
			network: "ark.mainnet",
			delegate: "genesis_10",
			fee: "0.1",
		});
	});

	it("ark:sign-message?message=This%20is%20my%20message", () => {
		expect(subject.deserialize(
			"ark:sign-message?message=This%20is%20my%20message",
		)).toEqual({
			method: "sign-message",
			message: "This is my message",
		});
	});

	it("ark:register-delegate?coin=ark&network=ark.mainnet&delegate=mydelegatename&fee=0.0001", () => {
		expect(subject.deserialize(
			"ark:register-delegate?coin=ark&network=ark.mainnet&delegate=mydelegatename&fee=0.0001",
		)).toEqual({
			method: "register-delegate",
			coin: "ark",
			network: "ark.mainnet",
			delegate: "mydelegatename",
			fee: "0.0001",
		});
	});
});
