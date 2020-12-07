import { Plugin } from "./plugin";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Plugin(data);
});

it.each(["developedBy", "network", "releaseDate", "platform", "requirements"])(
	"should set the value (%s)",
	(method) => {
		expect(data).toEqual({});

		subject[method]("value");

		expect(data).toEqual({ plugin: { [method]: "value" } });
	},
);
