import "jest-extended";

import { Response } from "./response";

let subject: Response;

beforeEach(
	() =>
		(subject = new Response({
			body: "{}",
			headers: { Accept: "something" },
			statusCode: 200,
		})),
);

test("#constructor", () => {
	expect(
		() =>
			new Response({
				body: "{}",
				headers: { Accept: "something" },
				statusCode: 500,
			}),
	).toThrow("HTTP request returned status code 500.");
});

test("#body", () => {
	expect(subject.body()).toBe("{}");

	expect(() =>
		new Response({
			body: undefined,
			headers: { Accept: "something" },
			statusCode: 200,
		}).body(),
	).toThrow("The response body is empty.");

	expect(() =>
		new Response({
			body: "",
			headers: { Accept: "something" },
			statusCode: 200,
		}).body(),
	).toThrow("The response body is empty.");
});

test("#json", () => {
	expect(subject.json()).toEqual({});
});

test("#header", () => {
	expect(subject.header("Accept")).toBe("something");
});

test("#headers", () => {
	expect(subject.headers()).toMatchInlineSnapshot(`
		Object {
		  "Accept": "something",
		}
	`);
});

test("#status", () => {
	expect(subject.status()).toBe(200);
});

test("#successful", () => {
	expect(subject.successful()).toBeTrue();

	jest.spyOn(subject, "status").mockReturnValue(400);

	expect(subject.successful()).toBeFalse();
});

test("#ok", () => {
	expect(subject.ok()).toBeTrue();

	jest.spyOn(subject, "status").mockReturnValue(400);

	expect(subject.ok()).toBeFalse();
});

test("#redirect", () => {
	expect(subject.redirect()).toBeFalse();

	jest.spyOn(subject, "status").mockReturnValue(300);

	expect(subject.redirect()).toBeTrue();
});

test("#failed", () => {
	expect(subject.failed()).toBeFalse();

	jest.spyOn(subject, "status").mockReturnValue(400);

	expect(subject.failed()).toBeTrue();

	jest.spyOn(subject, "status").mockReturnValue(500);

	expect(subject.failed()).toBeTrue();
});

test("#clientError", () => {
	expect(subject.clientError()).toBeFalse();

	jest.spyOn(subject, "status").mockReturnValue(400);

	expect(subject.clientError()).toBeTrue();
});

test("#serverError", () => {
	expect(subject.serverError()).toBeFalse();

	jest.spyOn(subject, "status").mockReturnValue(500);

	expect(subject.serverError()).toBeTrue();
});
