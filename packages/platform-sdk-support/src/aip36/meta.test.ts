import { Meta } from "./meta";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Meta(data);
});

it.each(["description", "displayName", "website"])("should set the value (%s)", (method) => {
	expect(data).toEqual({});

	subject[method]("value");

	expect(data).toEqual({ meta: { [method]: "value" } });
});
