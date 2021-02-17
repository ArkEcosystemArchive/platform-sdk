import "jest-extended";

import { bootContainer } from "../../test/helpers";
import { PluginRegistry } from "./plugin-registry";
import { PluginRepository } from "./plugin-repository";

const stubPlugin = {
	id: "@hello/world",
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

	expect(subject.findById(stubPlugin.id)).toEqual(stubPlugin);
});

it("should throw if a plugin cannot be found by its ID", () => {
	expect(() => subject.findById(stubPlugin.id)).toThrow(`Failed to find a plugin for [${stubPlugin.id}].`);
});

it("should restore previously created data", () => {
	subject.fill({ data: { [stubPlugin.id]: stubPlugin }, blacklist: [], whitelist: [] });

	expect(subject.findById(stubPlugin.id)).toEqual(stubPlugin);
});

it("should restore the blacklist", () => {
	subject.fill({ data: { stubPlugin }, blacklist: [stubPlugin.id], whitelist: [] });

	expect(subject.blacklist()).toMatchInlineSnapshot(`
		Set {
		  "@hello/world",
		}
	`);
	expect(subject.isBlacklisted(stubPlugin.id)).toBeTrue();
});

it("should restore the whitelist", () => {
	subject.fill({ data: { stubPlugin }, blacklist: [], whitelist: [stubPlugin.id] });

	expect(subject.whitelist()).toMatchInlineSnapshot(`
		Set {
		  "@hello/world",
		}
	`);
	expect(subject.isWhitelisted(stubPlugin.id)).toBeTrue();
});

it("should ensure blacklist and whitelist are always set and iterable", () => {
	expect(() => subject.fill({ data: { stubPlugin }, blacklist: undefined, whitelist: undefined })).not.toThrow();
	expect(subject.whitelist().size).toBe(0);
	expect(subject.blacklist().size).toBe(0);
});

it("should forget specific data", () => {
	subject.push(stubPlugin);

	expect(subject.count()).toBe(1);

	subject.forget(stubPlugin.id);

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

	blacklist.add(stubPlugin.id);

	expect(blacklist.size).toBe(1);

	blacklist.delete(stubPlugin.id);

	expect(blacklist.size).toBe(0);
});

it("should add an item to the whitelist", () => {
	const whitelist = subject.whitelist();

	expect(whitelist.size).toBe(0);

	whitelist.add(stubPlugin.id);

	expect(whitelist.size).toBe(1);

	whitelist.delete(stubPlugin.id);

	expect(whitelist.size).toBe(0);
});

it("should access the plugin registry", () => {
	expect(subject.registry()).toBeInstanceOf(PluginRegistry);
});

it("#toObject", () => {
	expect(subject.toObject()).toMatchInlineSnapshot(`
		Object {
		  "blacklist": Array [],
		  "data": Object {},
		  "whitelist": Array [],
		}
	`);
});
