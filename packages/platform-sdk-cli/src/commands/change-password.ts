import { Profile } from "@arkecosystem/platform-sdk-profiles";
import { pwnd } from "password-pwnd";
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

			if (!(await pwnd(value))) {
				return true;
			}

			return "Please change your password, it has been found in a previous breach";
		},
	});

	if (password === undefined) {
		return;
	}

	profile.auth().setPassword(password);
};
