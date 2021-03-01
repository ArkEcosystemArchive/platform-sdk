import { Environment } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

export const createProfile = async (env: Environment): Promise<void> => {
	console.clear();

	const { name } = await prompts({
		type: "text",
		name: "name",
		message: "What is your name?",
	});

	env.profiles().create(name);
};
