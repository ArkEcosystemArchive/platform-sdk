import { Environment } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { validatePassword } from "./change-password";

export const createProfile = async (env: Environment): Promise<void> => {
	renderLogo();

	const { name, password } = await prompts([
		{
			type: "text",
			name: "name",
			message: "What is the profile name?",
			validate: (value: string) => value && env.profiles().findByName(value) === undefined,
		},
		{
			type: "password",
			name: "password",
			message: "What is the password? (Optional)",
			validate: async (value: string) => {
				if (!value) {
					return true;
				}

				return validatePassword(value);
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
