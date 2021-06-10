"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessWallet = void 0;
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const list_transactions_1 = require("./list-transactions");
const send_delegate_registration_1 = require("./send-delegate-registration");
const send_delegate_resignation_1 = require("./send-delegate-resignation");
const send_ipfs_1 = require("./send-ipfs");
const send_multi_payment_1 = require("./send-multi-payment");
const send_second_signature_registration_1 = require("./send-second-signature-registration");
const send_transfer_1 = require("./send-transfer");
const send_vote_1 = require("./send-vote");
const sign_message_1 = require("./sign-message");
const verify_message_1 = require("./verify-message");
const accessWallet = async (profile) => {
	if (profile.wallets().count() === 0) {
		return;
	}
	helpers_1.renderLogo();
	// Prompt
	const { id } = await prompts_1.default({
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
	const { command } = await prompts_1.default({
		type: "select",
		name: "command",
		message: "Please choose an action:",
		choices: [
			{ title: "Show Balance", value: "balance" },
			{ title: "List Transaction", value: "list-transactions" },
			{ title: "Send Transfer", value: "send-transfer" },
			{ title: "Send Vote", value: "send-vote" },
			{ title: "Send Second Signature Registration", value: "send-second-signature-registration" },
			{ title: "Send Multi Payment", value: "send-multi-payment" },
			{ title: "Send Delegate Registration", value: "send-delegate-registration" },
			{ title: "Send Delegate Resignation", value: "send-delegate-resignation" },
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
		helpers_1.useLogger().info(wallet.balance().toHuman());
	}
	if (command === "list-transactions") {
		await list_transactions_1.listTransactions(wallet);
	}
	if (command === "send-transfer") {
		await send_transfer_1.sendTransfer(wallet);
	}
	if (command === "send-vote") {
		await send_vote_1.sendVote(wallet);
	}
	if (command === "send-second-signature-registration") {
		await send_second_signature_registration_1.sendSecondSignatureRegistration(wallet);
	}
	if (command === "send-multi-payment") {
		await send_multi_payment_1.sendMultiPayment(wallet);
	}
	if (command === "send-delegate-registration") {
		await send_delegate_registration_1.sendDelegateRegistration(wallet);
	}
	if (command === "send-delegate-resignation") {
		await send_delegate_resignation_1.sendDelegateResignation(wallet);
	}
	if (command === "send-ipfs") {
		await send_ipfs_1.sendIPFS(wallet);
	}
	if (command === "sign-message") {
		await sign_message_1.signMessage(wallet);
	}
	if (command === "verify-message") {
		await verify_message_1.verifyMessage(wallet);
	}
};
exports.accessWallet = accessWallet;
//# sourceMappingURL=access-wallet.js.map
