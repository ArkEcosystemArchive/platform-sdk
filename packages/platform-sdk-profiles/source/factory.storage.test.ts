import "jest-extended";
import { ConfStorage } from "./conf.storage";

import { StorageFactory } from "./factory.storage";
import { LocalStorage } from "./local.storage";
import { NullStorage } from "./null.storage";

test("StorageFactory#conf", () => {
	expect(StorageFactory.make("conf")).toBeInstanceOf(ConfStorage);
});

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
