"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const uuid_1 = require("uuid");
class UUID {
	static timestamp() {
		return uuid_1.v1();
	}
	static md5(name, namespace) {
		return uuid_1.v3(name, namespace);
	}
	static random() {
		return uuid_1.v4();
	}
	static sha1(name, namespace) {
		return uuid_1.v5(name, namespace);
	}
	static parse(uuid) {
		return uuid_1.parse(uuid);
	}
	static stringify(uuid) {
		return uuid_1.stringify(uuid);
	}
	static validate(uuid) {
		return uuid_1.validate(uuid);
	}
}
exports.UUID = UUID;
//# sourceMappingURL=uuid.js.map
