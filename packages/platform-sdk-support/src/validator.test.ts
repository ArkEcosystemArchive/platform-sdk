import "jest-extended";

import { Validator, ValidatorSchema } from "./validator";

let subject: Validator;
beforeEach(() => (subject = new Validator()));

test("#validate", () => {
	const actual = subject.validate(
		{
			name: "jimmy",
			age: "24",
		},
		ValidatorSchema.object().shape({
			name: ValidatorSchema.string().required(),
			age: ValidatorSchema.number().required().positive().integer(),
		}),
	);

	expect(actual).toEqual({ age: 24, name: "jimmy" });
});

test("#passes", () => {
	subject.validate(
		{
			name: "jimmy",
			age: 24,
		},
		ValidatorSchema.object().shape({
			name: ValidatorSchema.string().required(),
			age: ValidatorSchema.number().required().positive().integer(),
		}),
	);

	expect(subject.passes()).toBeTrue();

	subject.validate(
		{
			name: "jimmy",
			age: "invalid number",
		},
		ValidatorSchema.object().shape({
			name: ValidatorSchema.string().required(),
			age: ValidatorSchema.number().required().positive().integer(),
		}),
	);

	expect(subject.passes()).toBeFalse();
});

test("#fails", () => {
	subject.validate(
		{
			name: "jimmy",
			age: "invalid number",
		},
		ValidatorSchema.object().shape({
			name: ValidatorSchema.string().required(),
			age: ValidatorSchema.number().required().positive().integer(),
		}),
	);

	expect(subject.fails()).toBeTrue();

	subject.validate(
		{
			name: "jimmy",
			age: 24,
		},
		ValidatorSchema.object().shape({
			name: ValidatorSchema.string().required(),
			age: ValidatorSchema.number().required().positive().integer(),
		}),
	);

	expect(subject.fails()).toBeFalse();
});
