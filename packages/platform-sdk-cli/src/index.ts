import prompts from "prompts";

import { accessProfile, createProfile } from "./commands";
import { renderLogo, useEnvironment, useLogger } from "./helpers";

export const main = async (): Promise<void> => {
	renderLogo();

	const logger = useLogger();
	const env = await useEnvironment();

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { command } = await prompts({
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
			await accessProfile(env);
		}

		if (command === "create-profile") {
			await createProfile(env);
		}

		if (command === "examples") {
			await createProfile(env);
		}
	}
};
