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
	subject.fill({ data: { [stubPlugin.id]: stubPlugin } });

	expect(subject.findById(stubPlugin.id)).toEqual(stubPlugin);
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

it("should access the plugin registry", () => {
	expect(subject.registry()).toBeInstanceOf(PluginRegistry);
});
