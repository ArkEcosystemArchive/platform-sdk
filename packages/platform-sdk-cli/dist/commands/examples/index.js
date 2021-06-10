"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../../helpers");
const transfer_funds_1 = require("./commands/ada/transfer-funds");
const transfer_funds_2 = require("./commands/ark/transfer-funds");
const create_profile_with_wallets_1 = require("./commands/create-profile-with-wallets");
const open_existing_profile_1 = require("./commands/open-existing-profile");
const transfer_funds_3 = require("./commands/lsk/transfer-funds");
const transfer_funds_4 = require("./commands/trx/transfer-funds");
const list_transactions_1 = require("./commands/xlm/list-transactions");
const sign_message_1 = require("./commands/xlm/sign-message");
const transfer_funds_5 = require("./commands/xlm/transfer-funds");
const createProfile = async (env) => {
	helpers_1.renderLogo();
	const { command } = await prompts_1.default({
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
		"create-profile-with-wallets": () => create_profile_with_wallets_1.createProfileWithWallets(env),
		"open-existing-profile": () => open_existing_profile_1.openExistingProfile(env),
		"transfer-funds-with-ada": () => transfer_funds_1.transferFundsWithADA(env),
		"transfer-funds-with-ark": () => transfer_funds_2.transferFundsWithARK(env),
		"transfer-funds-with-lsk": () => transfer_funds_3.transferFundsWithLSK(env),
		"transfer-funds-with-trx": () => transfer_funds_4.transferFundsWithTRX(env),
		"list-transactions-with-xlm": () => list_transactions_1.listTransactionsWithXLM(env),
		"sign-message-with-xlm": () => sign_message_1.signMessageWithXLM(env),
		"transfer-funds-with-xlm": () => transfer_funds_5.transferFundsWithXLM(env),
	}[command]();
};
exports.createProfile = createProfile;
//# sourceMappingURL=index.js.map
