"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const prompts_1 = __importDefault(require("prompts"));
const commands_1 = require("./commands");
const helpers_1 = require("./helpers");
const main = async () => {
	helpers_1.renderLogo();
	const logger = helpers_1.useLogger();
	const env = await helpers_1.useEnvironment();
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { command } = await prompts_1.default({
			type: "select",
			name: "command",
			message: "Please choose an action:",
			choices: [
				{ title: "Access Profile", value: "access-profile" },
				{ title: "Create Profile", value: "create-profile" },
				{ title: "Examples", value: "examples" },
				{ title: "Exit", value: "exit" },
			],
			initial: 0,
		});
		if (command === "exit") {
			logger.warn("Terminating...");
			process.exit(0);
		}
		if (command === "access-profile") {
			await commands_1.accessProfile(env);
		}
		if (command === "create-profile") {
			await commands_1.createProfile(env);
		}
		if (command === "examples") {
			await commands_1.createProfile(env);
		}
	}
};
exports.main = main;
//# sourceMappingURL=index.js.map
