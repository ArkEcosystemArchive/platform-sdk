import "jest-extended";

import { StorageFactory } from "../../src/stores/factory";
import { NullStorage } from "../../src/stores/null";
import { LocalStorage } from "../../src/stores/local";

test("StorageFactory#null", () => {
	expect(StorageFactory.make("null")).toBeInstanceOf(NullStorage);
});

test("StorageFactory#indexeddb", () => {
	expect(StorageFactory.make("indexeddb")).toBeInstanceOf(LocalStorage);
});

test("StorageFactory#websql", () => {
	expect(StorageFactory.make("websql")).toBeInstanceOf(LocalStorage);
});

test("StorageFactory#localstorage", () => {
	expect(StorageFactory.make("localstorage")).toBeInstanceOf(LocalStorage);
});
