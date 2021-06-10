"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLedgerWallet = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const hw_transport_node_hid_singleton_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid-singleton"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const ora_1 = __importDefault(require("ora"));
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const chunk = (value, size) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));
// @TODO: this currently only supports 5 accounts with 50 wallets. use the DW scanner once implemented
const importLedgerWallet = async (env, profile) => {
	helpers_1.renderLogo();
	const { coin, network } = await prompts_1.default([
		{
			type: "text",
			name: "coin",
			message: "What is your coin?",
			validate: (value) => value !== undefined,
			initial: "ARK",
		},
		{
			type: "text",
			name: "network",
			message: "What is your network?",
			validate: (value) => value !== undefined,
			initial: "ark.mainnet",
		},
	]);
	const slip44 = network === "ark.mainnet" ? 111 : 1;
	const instance = profile.coins().set(coin, network);
	await instance.__construct();
	await hw_transport_node_hid_singleton_1.default.create();
	try {
		const spinner = ora_1.default("Trying to connect...").start();
		await instance.ledger().connect(hw_transport_node_hid_singleton_1.default);
		await instance.ledger().getPublicKey(`m/44'/${slip44}'/0'/0/0`);
		spinner.stop();
	} catch (connectError) {
		console.log(connectError.message);
		await instance.ledger().disconnect();
		throw connectError;
	}
	hw_transport_node_hid_singleton_1.default.listen({
		// @ts-ignore
		next: async ({ type, deviceModel }) => {
			if (type === "add") {
				helpers_1
					.useLogger()
					.info(
						`Connected [${deviceModel.productName}] with version [${await instance.ledger().getVersion()}]`,
					);
				// Derive
				const addressMap = {};
				for (let accountIndex = 0; accountIndex < 5; accountIndex++) {
					const compressedPublicKey = await instance
						.ledger()
						.getExtendedPublicKey(`m/44'/${slip44}'/${accountIndex}'`);
					helpers_1
						.useLogger()
						.info(`Extended Public Key for account [${accountIndex}] >>> ${compressedPublicKey}`);
					for (let addressIndex = 0; addressIndex < 50; addressIndex++) {
						const path = `44'/${slip44}'/${accountIndex}'/0/${addressIndex}`;
						const extendedKey = platform_sdk_crypto_1.HDKey.fromCompressedPublicKey(compressedPublicKey)
							.derive(`m/0/${addressIndex}`)
							.publicKey.toString("hex");
						const { address: extendedAddress } = await instance.address().fromPublicKey(extendedKey);
						addressMap[extendedAddress] = { path, extendedKey };
					}
				}
				// Check
				const networkSpinner = ora_1.default("Checking addresses on network...").start();
				const table = new cli_table3_1.default({ head: ["Path", "Address", "Public Key", "Balance"] });
				const chunks = await Promise.all(
					chunk(Object.keys(addressMap), 50).map((addresses) => instance.client().wallets({ addresses })),
				);
				const wallets = [];
				for (const chunk of chunks) {
					for (const identity of chunk.items()) {
						table.push([
							addressMap[identity.address()].path,
							identity.address(),
							addressMap[identity.address()].extendedKey,
							identity.balance().available.toHuman(),
						]);
						wallets.push({
							path: addressMap[identity.address()].path,
							address: identity.address(),
							extendedKey: addressMap[identity.address()].extendedKey,
							balance: identity.balance().available.toHuman(),
						});
					}
				}
				networkSpinner.stop();
				console.log(table.toString());
				const { addresses } = await prompts_1.default([
					{
						type: "multiselect",
						name: "addresses",
						message: "What addresses do you want to import?",
						choices: wallets.map((wallet) => ({
							title: `${wallet.address} [${wallet.balance}]`,
							value: wallet,
						})),
					},
				]);
				const imports = [];
				for (const address of addresses) {
					imports.push(
						profile.wallets().push(
							await profile.walletFactory().fromAddressWithDerivationPath({
								coin,
								network,
								address: address.address,
								path: address.path,
							}),
						),
					);
				}
				await Promise.all(imports);
				// Import
				process.exit();
			}
			if (type === "remove") {
				helpers_1.useLogger().info(`Disconnected [${deviceModel.productName}]`);
			}
		},
		error: (e) => console.log({ type: "failed", message: e.message }),
		complete: () => void 0,
	});
};
exports.importLedgerWallet = importLedgerWallet;
//# sourceMappingURL=import-ledger-wallet.js.map
