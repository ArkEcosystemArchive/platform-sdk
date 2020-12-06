import { AIP36 } from "./aip36";
import { Business } from "./aip36/business";
import { Delegate } from "./aip36/delegate";
import { Media } from "./aip36/media";
import { Meta } from "./aip36/meta";
import { Module } from "./aip36/module";
import { Plugin } from "./aip36/plugin";
import { Product } from "./aip36/product";
import { SocialMedia } from "./aip36/social-media";
import { SourceControl } from "./aip36/source-control";

let subject;

beforeEach(() => {
	subject = new AIP36();
});

it.each([
	["business", Business],
	["delegate", Delegate],
	["media", Media],
	["meta", Meta],
	["module", Module],
	["plugin", Plugin],
	["product", Product],
	["socialMedia", SocialMedia],
	["sourceControl", SourceControl],
])("should set the value (%s)", (method, klass) => {
	expect(subject[method]()).toBeInstanceOf(klass);
});

it("should turn the data into a string", () => {
	subject.business().type("non-profit");

	expect(subject.toString()).toMatchInlineSnapshot(`"{\\"business\\":{\\"type\\":\\"non-profit\\"}}"`);
});

describe("#validate", () => {
	it("should not throw if a valid [product.releaseDate] is used", () => {
		subject.product().developedBy("test");
		subject.product().network("test");
		subject.product().releaseDate("+002013-06-07T14:21:46.295Z");
		subject.product().platform("test");

		expect(() => subject.validate()).not.toThrow('"product.releaseDate" must be in ISO 8601 date format');
	});

	it("should throw if an invalid [product.releaseDate] is used", () => {
		subject.product().developedBy("test");
		subject.product().network("test");
		subject.product().releaseDate("test");
		subject.product().platform("test");

		expect(() => subject.validate()).toThrow('"product.releaseDate" must be in ISO 8601 date format');
	});
});
