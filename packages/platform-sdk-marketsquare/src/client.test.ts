import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { Client } from "./client";
import { AIP36 } from "./resources/aip36";
import { Auth } from "./resources/auth";
import { Business } from "./resources/business";
import { Delegate } from "./resources/delegate";
import { Module } from "./resources/module";
import { Plugin } from "./resources/plugin";
import { Product } from "./resources/product";
import { User } from "./resources/user";

let subject: Client;

beforeEach(async () => (subject = new Client(new Request())));

describe("Client", function () {
	it("should set the base url and return the client", async () => {
		expect(subject.withBaseUrl('a')).toBeInstanceOf(Client);
	});

	it("should set the authentication token and return the client", async () => {
		expect(subject.withToken('a')).toBeInstanceOf(Client);
	});

	it("should have access to the [aip36] resource", async () => {
		expect(subject.aip36()).toBeInstanceOf(AIP36);
	});

	it("should have access to the [auth] resource", async () => {
		expect(subject.auth()).toBeInstanceOf(Auth);
	});

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

	it("should have access to the [user] resource", async () => {
		expect(subject.user()).toBeInstanceOf(User);
	});

});
