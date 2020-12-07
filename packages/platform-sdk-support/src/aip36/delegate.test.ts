import { Delegate } from "./delegate";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Delegate(data);
});

it("should set the type", () => {
	expect(data).toEqual({});

	subject.type("public");

	expect(data).toEqual({ delegate: { type: "public" } });
});

it("should set the percentage", () => {
	expect(data).toEqual({});

	subject.percentage(5, 10);

	expect(data).toEqual({ delegate: { payout: { percentage: { min: 5, max: 10 } } } });
});

it("should set the distribution", () => {
	expect(data).toEqual({});

	subject.distribution(5, 10);

	expect(data).toEqual({ delegate: { payout: { distribution: { min: 5, max: 10 } } } });
});

it("should set the frequency", () => {
	expect(data).toEqual({});

	subject.frequency("day", 5);

	expect(data).toEqual({ delegate: { payout: { frequency: { type: "day", value: 5 } } } });
});
