"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.validatePassword = void 0;
const password_pwnd_1 = require("password-pwnd");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const validatePassword = async (value) => {
	if (await password_pwnd_1.pwnd(value)) {
		return "Please change your password, it has been found in a previous breach.";
	}
	if (await password_pwnd_1.strong(value)) {
		return true;
	}
	return "The password must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, 1 special character and must be 8 characters or longer.";
};
exports.validatePassword = validatePassword;
const changePassword = async (profile) => {
	helpers_1.renderLogo();
	const { oldPassword, newPassword } = await prompts_1.default([
		{
			type: "password",
			name: "password",
			message: "Please enter your current password:",
			validate: async (value) => value !== undefined,
		},
		{
			type: "password",
			name: "password",
			message: "Please enter your new password:",
			validate: async (value) => {
				if (!value) {
					return false;
				}
				return exports.validatePassword(value);
			},
		},
	]);
	if (!oldPassword) {
		return;
	}
	if (!newPassword) {
		return;
	}
	try {
		profile.auth().changePassword(oldPassword, newPassword);
	} catch (error) {
		helpers_1.useLogger().error(error.message);
	}
};
exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map
