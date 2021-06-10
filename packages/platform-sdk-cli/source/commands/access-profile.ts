import { Environment } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { accessWallet } from "./access-wallet";
import { changePassword } from "./change-password";
import { createWallet } from "./create-wallet";
import { importLedgerWallet } from "./import-ledger-wallet";

export const accessProfile = async (env: Environment): Promise<void> => {
	renderLogo();

	// Prompt
	const { id } = await prompts({
		type: "select",
		name: "id",
		message: "Please choose a profile:",
		choices: env
			.profiles()
			.values()
			.map((profile) => ({ title: profile.name(), value: profile.id() })),
		initial: 0,
	});

	// Restore
	const profile = env.profiles().findById(id);

	if (profile.usesPassword()) {
		const { password } = await prompts({
			type: "password",
			name: "password",
			message: "Please enter your password:",
			validate: (value: string) => value !== undefined,
		});

		if (!password) {
			return;
		}

		await env.profiles().restore(profile, password);

		profile.password().set(password);
	} else {
		await env.profiles().restore(profile);
	}

	// Act
	const { command } = await prompts({
		type: "select",
		name: "command",
		message: "Please choose an action:",
		choices: [
			{ title: "Access Wallet", value: "access-wallet" },
			{ title: "Create Wallet", value: "create-wallet" },
			{ title: "Import Wallet from Ledger", value: "import-ledger-wallet" },
			{ title: "Change Password", value: "change-password" },
			{ title: "Exit", value: "exit" },
		],
		initial: 0,
	});

	// eslint-disable-next-line no-constant-condition
	if (command === "exit") {
		return;
	}

	if (command === "access-wallet") {
		await accessWallet(profile);

		await env.persist();
	}

	if (command === "create-wallet") {
		await createWallet(profile);

		await env.persist();
	}

	if (command === "change-password") {
		await changePassword(profile);

		await env.persist();
	}

	if (command === "import-ledger-wallet") {
		await importLedgerWallet(env, profile);

		await env.persist();
	}
};
