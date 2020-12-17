import "jest-extended";

import { Container } from "./container";

it("should bind a value and be able to retrieve it", () => {
	const container = new Container();

	expect(container.has("key")).toBeFalse();
	expect(() => container.get("key")).toThrow();

	container.set("key", "value");

	expect(container.has("key")).toBeTrue();
	expect(container.get("key")).toBe("value");
});
