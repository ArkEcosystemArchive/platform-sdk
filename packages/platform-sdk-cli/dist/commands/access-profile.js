"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessProfile = void 0;
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const access_wallet_1 = require("./access-wallet");
const change_password_1 = require("./change-password");
const create_wallet_1 = require("./create-wallet");
const import_ledger_wallet_1 = require("./import-ledger-wallet");
const accessProfile = async (env) => {
	helpers_1.renderLogo();
	// Prompt
	const { id } = await prompts_1.default({
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
		const { password } = await prompts_1.default({
			type: "password",
			name: "password",
			message: "Please enter your password:",
			validate: (value) => value !== undefined,
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
	const { command } = await prompts_1.default({
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
		await access_wallet_1.accessWallet(profile);
		await env.persist();
	}
	if (command === "create-wallet") {
		await create_wallet_1.createWallet(profile);
		await env.persist();
	}
	if (command === "change-password") {
		await change_password_1.changePassword(profile);
		await env.persist();
	}
	if (command === "import-ledger-wallet") {
		await import_ledger_wallet_1.importLedgerWallet(env, profile);
		await env.persist();
	}
};
exports.accessProfile = accessProfile;
//# sourceMappingURL=access-profile.js.map
