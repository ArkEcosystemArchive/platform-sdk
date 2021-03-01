import { Profile } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { useLogger } from "../helpers";
import { sendTransaction } from "./send-transaction";

export const accessWallet = async (profile: Profile): Promise<void> => {
	console.clear();

	// Prompt
	const { id } = await prompts({
		type: "select",
		name: "id",
		message: "Please choose a profile:",
		choices: profile
			.wallets()
			.values()
			.map((wallet) => ({ title: wallet.address(), value: wallet.id() })),
		initial: 0,
	});

	// Restore
	const wallet = profile.wallets().findById(id);
	await wallet.syncIdentity();

	// Act
	const { command } = await prompts({
		type: "select",
		name: "command",
		message: "Please choose an action:",
		choices: [
			{ title: "Show Balance", value: "balance" },
			{ title: "Send Transaction", value: "send-transaction" },
			{ title: "Exit", value: "exit" },
		],
		initial: 0,
	});

	if (command === "exit") {
		useLogger().warning("Terminating...");

		process.exit(0);
	}

	if (command === "balance") {
		useLogger().info(wallet.balance().toHuman());
	}

	if (command === "send-transaction") {
		await sendTransaction(wallet);
	}
};
