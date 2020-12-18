import "jest-extended";

import Joi from "joi";

import { Validator } from "./validator";

let subject: Validator;
beforeEach(() => (subject = new Validator()));

test("#validate", () => {
	const actual = subject.validate(
		{
			name: "jimmy",
			age: "24",
		},
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
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
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
		}),
	);

	expect(subject.passes()).toBeTrue();

	subject.validate(
		{
			name: "jimmy",
			age: "invalid number",
		},
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
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
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
		}),
	);

	expect(subject.fails()).toBeTrue();

	subject.validate(
		{
			name: "jimmy",
			age: 24,
		},
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
		}),
	);

	expect(subject.fails()).toBeFalse();
});

test("#errors", () => {
	expect(subject.errors()).toBeUndefined();

	subject.validate(
		{
			name: "jimmy",
			age: "invalid number",
		},
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().positive().integer().required(),
		}),
	);

	expect(subject.errors()).toHaveLength(1);
});

test("#error", () => {
	subject.validate(
		{
			name: "jimmy",
			age: "invalid number",
		},
		Joi.object({
			name: Joi.string().required(),
			age: Joi.number().required().positive().integer(),
		}),
	);

	expect(subject.error()).toBeInstanceOf(Joi.ValidationError);
});
