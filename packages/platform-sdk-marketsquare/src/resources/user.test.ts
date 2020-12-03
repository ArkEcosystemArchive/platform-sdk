import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { User } from "./user";
import { Business } from "./user/business";
import { Delegate } from "./user/delegate";
import { Module } from "./user/module";
import { Plugin } from "./user/plugin";
import { Product } from "./user/product";
import { Wallet } from "./user/wallet";

let subject: User;

beforeEach(async () => (subject = new User(new Request())));

describe("User", function () {
	it("should have access to the [business] resource", async () => {
		expect(subject.business()).toBeInstanceOf(Business);
	});

	it("should have access to the [delegate] resource", async () => {
		expect(subject.delegate()).toBeInstanceOf(Delegate);
	});

	it("should have access to the [module] resource", async () => {
		expect(subject.module()).toBeInstanceOf(Module);
	});

	it("should have access to the [plugin] resource", async () => {
		expect(subject.plugin()).toBeInstanceOf(Plugin);
	});

	it("should have access to the [product] resource", async () => {
		expect(subject.product()).toBeInstanceOf(Product);
	});

	it("should have access to the [wallet] resource", async () => {
		expect(subject.wallet()).toBeInstanceOf(Wallet);
	});
});
