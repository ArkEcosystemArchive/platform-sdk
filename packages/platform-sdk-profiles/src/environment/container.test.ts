import "jest-extended";

import { Container } from "./container";

it("should bind a value and be able to retrieve it", () => {
	const container = new Container();

	expect(container.has("key")).toBeFalse();
	expect(() => container.get("key")).toThrow();

	container.bind("key", "value");

	expect(container.has("key")).toBeTrue();
	expect(container.get("key")).toBe("value");
});

it("should bind a value and throw when trying to bind it again", () => {
	const container = new Container();

	expect(() => container.bind("key", "value")).not.toThrow();
	expect(() => container.bind("key", "value")).toThrow();
	expect(() => container.rebind("key", "value")).not.toThrow();
});

it("should forget a value", () => {
	const container = new Container();

	expect(() => container.unbind("key")).toThrow();

	container.bind("key", "value");

	expect(() => container.unbind("key")).not.toThrow();
});

it("should flush all bindings", () => {
	const container = new Container();

	expect(() => container.unbind("key")).toThrow();

	container.bind("key", "value");

	expect(() => container.unbind("key")).not.toThrow();

	container.flush();

	expect(() => container.unbind("key")).not.toThrow();
});
