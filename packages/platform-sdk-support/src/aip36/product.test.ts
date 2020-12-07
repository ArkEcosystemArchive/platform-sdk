import { Product } from "./product";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Product(data);
});

it.each(["developedBy", "network", "releaseDate", "platform"])("should set the value (%s)", (method) => {
	expect(data).toEqual({});

	subject[method]("value");

	expect(data).toEqual({ product: { [method]: "value" } });
});
