"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
const picasso_1 = require("@vechain/picasso");
const mem_1 = __importDefault(require("mem"));
class Avatar {
	static make(seed) {
		return mem_1.default(picasso_1.picasso)(seed);
	}
}
exports.Avatar = Avatar;
//# sourceMappingURL=avatar.js.map
