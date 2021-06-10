import "jest-extended";
import { ConfStorage } from "./conf";

import { StorageFactory } from "./factory";
import { LocalStorage } from "./local";
import { NullStorage } from "./null";

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
