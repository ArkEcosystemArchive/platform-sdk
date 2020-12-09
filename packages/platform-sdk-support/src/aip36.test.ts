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
	describe("#delegate", () => {
		it("should throw if an invalid [delegate.type] is used", () => {
			subject.delegate().type("invalid");

			expect(() => subject.validate()).toThrow('"delegate.type" must be one of [public, private]');
		});

		it("should throw if an invalid [delegate.payout.frequency.type] is used", () => {
			subject.delegate().type("public");
			subject.delegate().frequency("invalid", 1);

			expect(() => subject.validate()).toThrow(
				'"delegate.payout.frequency.type" must be one of [day, week, month, quarter, year]',
			);
		});

		it("should throw if an invalid [delegate.payout.frequency.value] is used", () => {
			subject.delegate().type("public");
			subject.delegate().frequency("day", 366);

			expect(() => subject.validate()).toThrow(
				'"delegate.payout.frequency.value" must be less than or equal to 365',
			);
		});

		it("should throw if an invalid [delegate.payout.percentage.min] is used", () => {
			subject.delegate().type("public");
			subject.delegate().percentage(101, 1);

			expect(() => subject.validate()).toThrow(
				'"delegate.payout.percentage.min" must be less than or equal to 100',
			);
		});

		it("should throw if an invalid [delegate.payout.percentage.max] is used", () => {
			subject.delegate().type("public");
			subject.delegate().percentage(1, 101);

			expect(() => subject.validate()).toThrow(
				'"delegate.payout.percentage.max" must be less than or equal to 100',
			);
		});
	});

	describe("#product", () => {
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

	describe("#socialMedia", () => {
		it("should throw if an invalid URL is used for [discord]", () => {
			subject.socialMedia().discord("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [facebook]", () => {
			subject.socialMedia().facebook("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [instagram]", () => {
			subject.socialMedia().instagram("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [linkedin]", () => {
			subject.socialMedia().linkedin("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [medium]", () => {
			subject.socialMedia().medium("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [reddit]", () => {
			subject.socialMedia().reddit("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [slack]", () => {
			subject.socialMedia().slack("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [telegram]", () => {
			subject.socialMedia().telegram("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [twitter]", () => {
			subject.socialMedia().twitter("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid URL is used for [youtube]", () => {
			subject.socialMedia().youtube("test");

			expect(() => subject.validate()).toThrow('"socialMedia[0].value" does not match any of the allowed types');
		});
	});

	describe("#sourceControl", () => {
		it("should throw if an invalid URL is used for [bitbucket]", () => {
			subject.sourceControl().bitbucket("test");

			expect(() => subject.validate()).toThrow(
				'"sourceControl[0].value" does not match any of the allowed types',
			);
		});

		it("should throw if an invalid URL is used for [github]", () => {
			subject.sourceControl().github("test");

			expect(() => subject.validate()).toThrow(
				'"sourceControl[0].value" does not match any of the allowed types',
			);
		});

		it("should throw if an invalid URL is used for [gitlab]", () => {
			subject.sourceControl().gitlab("test");

			expect(() => subject.validate()).toThrow(
				'"sourceControl[0].value" does not match any of the allowed types',
			);
		});

		it("should throw if an invalid URL is used for [npm]", () => {
			subject.sourceControl().npm("test");

			expect(() => subject.validate()).toThrow(
				'"sourceControl[0].value" does not match any of the allowed types',
			);
		});
	});

	describe("#images", () => {
		it("should throw if an invalid [images.*.value] is used as [logo]", () => {
			subject.media().logo("test");

			expect(() => subject.validate()).toThrow('"images[0].value" does not match any of the allowed types');
		});

		it("should throw if an invalid [images.*.value] is used as [image]", () => {
			subject.media().image("test");

			expect(() => subject.validate()).toThrow('"images[0].value" does not match any of the allowed types');
		});
	});

	describe("#videos", () => {
		it("should throw if an invalid [videos.*.value] is used as", () => {
			subject.media().video("test");

			expect(() => subject.validate()).toThrow('"videos[0].value" does not match any of the allowed types');
		});
	});
});
