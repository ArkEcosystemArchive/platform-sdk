import { Profile } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

export const changePassword = async (profile: Profile): Promise<void> => {
	console.clear();

	const { password } = await prompts({
		type: "password",
		name: "password",
		message: "Please enter your password:",
	});

	profile.auth().setPassword(password);
};
