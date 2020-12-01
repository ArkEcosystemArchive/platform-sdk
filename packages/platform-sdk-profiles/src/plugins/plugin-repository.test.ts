import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { PluginRegistry } from "./plugin-registry";
import { PluginRepository } from "./plugin-repository";

const stubPlugin = {
	id: 1,
	name: "@hello/world",
	version: "1.0.0",
	isEnabled: true,
	permissions: ["something"],
	urls: ["https://google.com"],
};

let subject: PluginRepository;

beforeAll(() => {
	container.set(Identifiers.HttpClient, new Request());
});

beforeEach(() => {
	subject = new PluginRepository();
});

it("should return all data", () => {
	expect(subject.all()).toBeObject();
});

it("should return all data keys", () => {
	expect(subject.keys()).toBeArray();
});

it("should return all data values", () => {
	expect(subject.values()).toBeArray();
});

it("should find specific data", () => {
	subject.push(stubPlugin);

	expect(subject.findById(1)).toEqual(stubPlugin);
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
