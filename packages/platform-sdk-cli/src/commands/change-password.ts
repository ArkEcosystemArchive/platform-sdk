import { Profile } from "@arkecosystem/platform-sdk-profiles";
import { pwnd, strong } from "password-pwnd";
import prompts from "prompts";

import { renderLogo } from "../helpers";

export const changePassword = async (profile: Profile): Promise<void> => {
	renderLogo();

	const { password } = await prompts({
		type: "password",
		name: "password",
		message: "Please enter your password:",
		validate: async (value: string) => {
			if (value === undefined) {
				return false;
			}

			if (await pwnd(value)) {
				return "Please change your password, it has been found in a previous breach";
			}

			if (await strong(value)) {
				return true;
			}

			return "The password must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, 1 special character and must be 8 characters or longer.";
		},
	});

	if (password === undefined) {
		return;
	}

	profile.auth().setPassword(password);
};
