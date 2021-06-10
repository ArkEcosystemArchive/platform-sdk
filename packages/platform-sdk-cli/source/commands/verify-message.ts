import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

export const verifyMessage = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const { message } = await prompts({
		type: "text",
		name: "message",
		message: "Please enter the JSON:",
		validate: (value: string) => JSON.parse(value),
	});

	if (!message) {
		return;
	}

	if (await wallet.message().verify(JSON.parse(message))) {
		useLogger().error("The transaction has been verified.");
	} else {
		useLogger().info("The transaction failed to verify.");
	}
};
