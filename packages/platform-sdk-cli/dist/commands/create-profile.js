"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const change_password_1 = require("./change-password");
const createProfile = async (env) => {
	helpers_1.renderLogo();
	const { name, password } = await prompts_1.default([
		{
			type: "text",
			name: "name",
			message: "What is your name?",
			validate: (value) => value && env.profiles().findByName(value) === undefined,
		},
		{
			type: "password",
			name: "password",
			message: "What is your password? (Optional)",
			validate: async (value) => {
				if (!value) {
					return true;
				}
				return change_password_1.validatePassword(value);
			},
		},
	]);
	if (!name) {
		return;
	}
	const profile = env.profiles().create(name);
	if (password) {
		profile.auth().setPassword(password);
	}
	await env.persist();
};
exports.createProfile = createProfile;
//# sourceMappingURL=create-profile.js.map
