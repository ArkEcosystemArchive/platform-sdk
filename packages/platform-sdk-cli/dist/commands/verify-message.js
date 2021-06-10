"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = void 0;
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const verifyMessage = async (wallet) => {
	helpers_1.renderLogo();
	const { message } = await prompts_1.default({
		type: "text",
		name: "message",
		message: "Please enter the JSON:",
		validate: (value) => JSON.parse(value),
	});
	if (!message) {
		return;
	}
	if (await wallet.message().verify(JSON.parse(message))) {
		helpers_1.useLogger().error("The transaction has been verified.");
	} else {
		helpers_1.useLogger().info("The transaction failed to verify.");
	}
};
exports.verifyMessage = verifyMessage;
//# sourceMappingURL=verify-message.js.map
