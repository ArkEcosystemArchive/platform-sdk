"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFactory = void 0;
const conf_1 = require("./conf");
const local_1 = require("./local");
const memory_1 = require("./memory");
const null_1 = require("./null");
class StorageFactory {
	static make(driver) {
		return {
			conf: () => new conf_1.ConfStorage(),
			memory: () => new memory_1.MemoryStorage(),
			null: () => new null_1.NullStorage(),
			indexeddb: () => new local_1.LocalStorage("indexeddb"),
			websql: () => new local_1.LocalStorage("websql"),
			localstorage: () => new local_1.LocalStorage("localstorage"),
		}[driver]();
	}
}
exports.StorageFactory = StorageFactory;
//# sourceMappingURL=factory.js.map
