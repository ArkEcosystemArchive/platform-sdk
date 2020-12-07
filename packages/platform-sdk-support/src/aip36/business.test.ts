import { Business } from "./business";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Business(data);
});

it("should set the type", () => {
	expect(data).toEqual({});

	subject.type("non-profit");

	expect(data).toEqual({ business: { type: "non-profit" } });
});
