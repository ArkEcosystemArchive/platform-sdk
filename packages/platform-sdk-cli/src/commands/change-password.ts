import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import { pwnd, strong } from "password-pwnd";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

export const validatePassword = async (value: string): Promise<boolean | string> => {
	if (await pwnd(value)) {
		return "Please change your password, it has been found in a previous breach.";
	}

	if (await strong(value)) {
		return true;
	}

	return "The password must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, 1 special character and must be 8 characters or longer.";
};

export const changePassword = async (profile: Contracts.IProfile): Promise<void> => {
	renderLogo();

	const { oldPassword, newPassword } = await prompts([
		{
			type: "password",
			name: "password",
			message: "Please enter your current password:",
			validate: async (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "password",
			message: "Please enter your new password:",
			validate: async (value: string) => {
				if (!value) {
					return false;
				}

				return validatePassword(value);
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
		useLogger().error(error.message);
	}
};
