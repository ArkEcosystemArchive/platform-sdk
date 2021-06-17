import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";
import { listTransactions } from "./list-transactions";
import { sendDelegateRegistration } from "./send-delegate-registration";
import { sendDelegateResignation } from "./send-delegate-resignation";
import { sendIPFS } from "./send-ipfs";
import { sendMultiPayment } from "./send-multi-payment";
import { sendSecondSignatureRegistration } from "./send-second-signature-registration";
import { sendTransfer } from "./send-transfer";
import { sendVote } from "./send-vote";
import { signMessage } from "./sign-message";
import { verifyMessage } from "./verify-message";

export const accessWallet = async (profile: Contracts.IProfile): Promise<void> => {
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
	await wallet.synchroniser().identity();

	// Act
	const { command } = await prompts({
		type: "select",
		name: "command",
		message: "Please choose an action:",
		choices: [
			{ title: "Show Balance", value: "balance" },
			{ title: "List Transaction", value: "list-transactions" },
			{ title: "Send Transfer", value: "send-transfer" },
			{ title: "Send Vote", value: "send-vote" }, // @TODO: show unvote when voting
			{ title: "Send Second Signature Registration", value: "send-second-signature-registration" }, // @TODO: hide if second sig already exists
			{ title: "Send Multi Payment", value: "send-multi-payment" },
			{ title: "Send Delegate Registration", value: "send-delegate-registration" }, // @TODO: only show if wallet is not a delegate
			{ title: "Send Delegate Resignation", value: "send-delegate-resignation" }, // @TODO: only show if wallet is a delegate
			{ title: "Send IPFS", value: "send-ipfs" },
			{ title: "Sign Message", value: "sign-message" },
			{ title: "Verify Message", value: "verify-message" },
			{ title: "Exit", value: "exit" },
		],
		initial: 0,
	});

	if (command === "exit") {
		return;
	}

	if (command === "balance") {
		useLogger().info(wallet.balance());
	}

	if (command === "list-transactions") {
		await listTransactions(wallet);
	}

	if (command === "send-transfer") {
		await sendTransfer(wallet);
	}

	if (command === "send-vote") {
		await sendVote(wallet);
	}

	if (command === "send-second-signature-registration") {
		await sendSecondSignatureRegistration(wallet);
	}

	if (command === "send-multi-payment") {
		await sendMultiPayment(wallet);
	}

	if (command === "send-delegate-registration") {
		await sendDelegateRegistration(wallet);
	}

	if (command === "send-delegate-resignation") {
		await sendDelegateResignation(wallet);
	}

	if (command === "send-ipfs") {
		await sendIPFS(wallet);
	}

	if (command === "sign-message") {
		await signMessage(wallet);
	}

	if (command === "verify-message") {
		await verifyMessage(wallet);
	}
};
