"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpinner = void 0;
const ora_1 = __importDefault(require("ora"));
const useSpinner = (message) => ora_1.default(message).start();
exports.useSpinner = useSpinner;
//# sourceMappingURL=spinner.js.map
