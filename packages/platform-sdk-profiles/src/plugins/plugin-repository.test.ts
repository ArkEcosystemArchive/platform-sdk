import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { PluginRegistry } from "./plugin-registry";
import { PluginRepository } from "./plugin-repository";
import { bootContainer } from "../../test/helpers";

const stubPlugin = {
	id: 1,
	name: "@hello/world",
	version: "1.0.0",
	isEnabled: true,
	permissions: ["something"],
	urls: ["https://google.com"],
};

let subject: PluginRepository;

beforeAll(() => bootContainer());

beforeEach(() => {
	subject = new PluginRepository();
});

it("should return all data", () => {
	expect(subject.all()).toBeObject();
});

it("should return the first item", () => {
	expect(subject.first()).toMatchInlineSnapshot(`undefined`);
});

it("should return the last item", () => {
	expect(subject.last()).toMatchInlineSnapshot(`undefined`);
});

it("should return all data keys", () => {
	expect(subject.keys()).toBeArray();
});

it("should return all data values", () => {
	expect(subject.values()).toBeArray();
});

it("should find a plugin by its ID", () => {
	subject.push(stubPlugin);

	expect(subject.findById(1)).toEqual(stubPlugin);
});

it("should throw if a plugin cannot be found by its ID", () => {
	expect(() => subject.findById(1)).toThrow("Failed to find a plugin for [1].");
});

it("should restore previously created data", () => {
	subject.fill({ data: { 1: stubPlugin }, blacklist: [] });

	expect(subject.findById(1)).toEqual(stubPlugin);
});

it("should restore the blacklist", () => {
	subject.fill({ data: { stubPlugin }, blacklist: [1] });

	expect(subject.blacklist()).toMatchInlineSnapshot(`
		Set {
		  1,
		}
	`);
	expect(subject.isBlacklisted(1)).toBeTrue();
});

it("should forget specific data", () => {
	subject.push(stubPlugin);

	expect(subject.count()).toBe(1);

	subject.forget(1);

	expect(subject.count()).toBe(0);
});

it("should flush the data", () => {
	subject.push(stubPlugin);

	expect(subject.count()).toBe(1);

	expect(subject.flush()).toBeUndefined();

	expect(subject.count()).toBe(0);
});

it("should count the data", () => {
	expect(subject.count()).toBe(0);
});

it("should add an item to the blacklist", () => {
	const blacklist = subject.blacklist();

	expect(blacklist.size).toBe(0);

	blacklist.add(1);

	expect(blacklist.size).toBe(1);

	blacklist.delete(1);

	expect(blacklist.size).toBe(0);
});

it("should access the plugin registry", () => {
	expect(subject.registry()).toBeInstanceOf(PluginRegistry);
});
