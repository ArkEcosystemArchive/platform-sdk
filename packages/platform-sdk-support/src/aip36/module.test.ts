import { Module } from "./module";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Module(data);
});

it.each(["developedBy", "network", "releaseDate", "platform", "requirements"])(
	"should set the value (%s)",
	(method) => {
		expect(data).toEqual({});

		subject[method]("value");

		expect(data).toEqual({ module: { [method]: "value" } });
	},
);
