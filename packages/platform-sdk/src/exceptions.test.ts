import { BadMethodDependencyException, BadStateException, BadVariableDependencyException, CryptoException, InvalidArguments, MissingArgument, NotImplemented, NotSupported } from "./exceptions";

test("NotImplemented", () => {
	expect(() => {
		throw new NotImplemented("klass", "method");
	}).toThrow(`Method klass#method is not implemented.`);
});

test("NotSupported", () => {
	expect(() => {
		throw new NotSupported("klass", "method");
	}).toThrow(`Method klass#method is not supported.`);
});

test("InvalidArguments", () => {
	expect(() => {
		throw new InvalidArguments("klass", "method");
	}).toThrow(`Method klass#method does not accept the given arguments.`);
});

test("MissingArgument", () => {
	expect(() => {
		throw new MissingArgument("klass", "method", "argument");
	}).toThrow(`Method klass#method expects the argument [argument] but it was not given.`);
});

test("CryptoException", () => {
	expect(() => {
		throw new CryptoException(new Error("Boom"));
	}).toThrow("Boom");
});

test("BadMethodDependencyException", () => {
	expect(() => {
		throw new BadMethodDependencyException("klass", "method", 'dependency');
	}).toThrow("Method klass#method depends on klass#dependency being called first.");
});

test("BadVariableDependencyException", () => {
	expect(() => {
		throw new BadVariableDependencyException("klass", "method", 'dependency');
	}).toThrow("Method klass#method depends on klass#dependency being declared first.");
});

test("BadStateException", () => {
	expect(() => {
		throw new BadStateException("method", 'error');
	}).toThrow("Method [method] has entered a bad state: error");
});
