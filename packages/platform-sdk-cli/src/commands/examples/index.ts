import { Environment } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../../helpers";
import { transferFundsWithADA } from "./commands/ada/transfer-funds";
import { transferFundsWithARK } from "./commands/ark/transfer-funds";
import { createProfileWithWallets } from "./commands/create-profile-with-wallets";
import { openExistingProfile } from "./commands/open-existing-profile";
import { transferFundsWithLSK } from "./commands/lsk/transfer-funds";
import { transferFundsWithTRX } from "./commands/trx/transfer-funds";
import { listTransactionsWithXLM } from "./commands/xlm/list-transactions";
import { signMessageWithXLM } from "./commands/xlm/sign-message";
import { transferFundsWithXLM } from "./commands/xlm/transfer-funds";

export const createProfile = async (env: Environment): Promise<void> => {
	renderLogo();

	const { command } = await prompts({
		type: "select",
		name: "command",
		message: "Please choose an action:",
		choices: [
			{ title: "Create Profile With Wallets", value: "create-profile-with-wallets" },
			{ title: "Open Existing Profile", value: "open-existing-profile" },
			{ title: "[ADA] Transfer Funds", value: "transfer-funds-with-ada" },
			{ title: "[ARK] Transfer Funds", value: "transfer-funds-with-ark" },
			{ title: "[LSK] Transfer Funds", value: "transfer-funds-with-lsk" },
			{ title: "[TRX] Transfer Funds", value: "transfer-funds-with-trx" },
			{ title: "[XLM] List Transactions", value: "list-transactions-with-xlm" },
			{ title: "[XLM] Sign Message", value: "sign-message-with-xlm" },
			{ title: "[XLM] Transfer", value: "transfer-funds-with-xlm" },
			{ title: "Exit", value: "exit" },
		],
		initial: 0,
	});

	if (command === "exit") {
		return;
	}

	await {
		"create-profile-with-wallets": () => createProfileWithWallets(env),
		"open-existing-profile": () => openExistingProfile(env),
		"transfer-funds-with-ada": () => transferFundsWithADA(env),
		"transfer-funds-with-ark": () => transferFundsWithARK(env),
		"transfer-funds-with-lsk": () => transferFundsWithLSK(env),
		"transfer-funds-with-trx": () => transferFundsWithTRX(env),
		"list-transactions-with-xlm": () => listTransactionsWithXLM(env),
		"sign-message-with-xlm": () => signMessageWithXLM(env),
		"transfer-funds-with-xlm": () => transferFundsWithXLM(env),
	}[command]();
};
