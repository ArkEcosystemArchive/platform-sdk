import { Profile } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";
import { listTransactions } from "./list-transactions";
import { sendTransaction } from "./send-transaction";

export const accessWallet = async (profile: Profile): Promise<void> => {
	if (profile.wallets().count() === 0) {
		return;
	}

	renderLogo();

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
			{ title: "List Transaction", value: "list-transactions" },
			{ title: "Send Transaction", value: "send-transaction" },
			{ title: "Exit", value: "exit" },
		],
		initial: 0,
	});

	if (command === "exit") {
		return;
	}

	if (command === "balance") {
		useLogger().info(wallet.balance().toHuman());
	}

	if (command === "list-transactions") {
		await listTransactions(wallet);
	}

	if (command === "send-transaction") {
		await sendTransaction(wallet);
	}
};
