import "jest-extended";

import { Container } from "./container";
import { BindingType } from "./service-provider.contract";

it("should prevent multiple bindings of the same key", () => {
	const container = new Container();

	expect(() => container.constant(BindingType.AddressService, "value")).not.toThrow(/Duplicate binding attempted/);
	expect(() => container.constant(BindingType.AddressService, "value")).toThrow(/Duplicate binding attempted/);
	expect(() => container.constant(BindingType.AddressService, "value")).toThrow(/Duplicate binding attempted/);
});

it("should bind values independent from container instances", () => {
	const container1 = new Container();

	expect(() => container1.constant(BindingType.AddressService, "value")).not.toThrow(/Duplicate binding attempted/);

	const container2 = new Container();

	expect(() => container2.constant(BindingType.AddressService, "value")).not.toThrow(/Duplicate binding attempted/);
});

it("should bind a value and be able to retrieve it", () => {
	const container = new Container();

	expect(container.missing("key")).toBeTrue();
	expect(() => container.get("key")).toThrow();

	container.constant("key", "value");

	expect(container.has("key")).toBeTrue();
	expect(container.get("key")).toBe("value");
});

it("should forget a value", () => {
	const container = new Container();

	expect(() => container.unbind("key")).toThrow();

	container.constant("key", "value");

	expect(() => container.unbind("key")).not.toThrow();
});

it("should flush all bindings", () => {
	const container = new Container();

	expect(() => container.unbind("key")).toThrow();

	container.constant("key", "value");

	expect(() => container.unbind("key")).not.toThrow();

	container.flush();

	expect(() => container.unbind("key")).toThrow();
});
