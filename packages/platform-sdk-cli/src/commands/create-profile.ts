import { Environment } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";
import { renderLogo } from "../helpers";

export const createProfile = async (env: Environment): Promise<void> => {
	renderLogo();

	const { name } = await prompts({
		type: "text",
		name: "name",
		message: "What is your name?",
	});

	env.profiles().create(name);
};
