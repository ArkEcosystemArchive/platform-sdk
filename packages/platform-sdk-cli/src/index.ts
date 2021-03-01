import prompts from "prompts";

import { createProfile, accessProfile } from "./commands";
import { useEnvironment, useLogger } from "./helpers";

export const main = async (): Promise<void> => {
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
				{ title: "Exit", value: "exit" },
			],
			initial: 0,
		});

		if (command === "exit") {
			logger.warning("Terminating...");

			process.exit(0);
		}

		if (command === "access-profile") {
			await accessProfile(env);
		}

		if (command === "create-profile") {
			await createProfile(env);
		}
	}
};
