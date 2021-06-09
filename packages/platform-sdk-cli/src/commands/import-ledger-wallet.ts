import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import Table from "cli-table3";
import ora from "ora";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

const chunk = <T>(value: T[], size: number) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));

// @TODO: this currently only supports 5 accounts with 50 wallets. use the DW scanner once implemented
export const importLedgerWallet = async (env: Environment, profile: Contracts.IProfile): Promise<void> => {
	renderLogo();

	const { coin, network } = await prompts([
		{
			type: "text",
			name: "coin",
			message: "What is your coin?",
			validate: (value: string) => value !== undefined,
			initial: "ARK",
		},
		{
			type: "text",
			name: "network",
			message: "What is your network?",
			validate: (value: string) => value !== undefined,
			initial: "ark.mainnet",
		},
	]);

	const slip44 = network === "ark.mainnet" ? 111 : 1;
	const instance = profile.coins().set(coin, network);
	await instance.__construct();

	await LedgerTransportNodeHID.create();

	try {
		const spinner = ora("Trying to connect...").start();

		await instance.ledger().connect(LedgerTransportNodeHID);

		await instance.ledger().getPublicKey(`m/44'/${slip44}'/0'/0/0`);

		spinner.stop();
	} catch (connectError) {
		console.log(connectError.message);

		await instance.ledger().disconnect();

		throw connectError;
	}

	LedgerTransportNodeHID.listen({
		// @ts-ignore
		next: async ({ type, deviceModel }) => {
			if (type === "add") {
				useLogger().info(
					`Connected [${deviceModel.productName}] with version [${await instance.ledger().getVersion()}]`,
				);

				// Derive
				const identities = await instance.ledger().scan();

				// Check
				const networkSpinner = ora("Checking addresses on network...").start();

				const table = new Table({ head: ["Path", "Address", "Public Key", "Balance"] });

				const wallets: any[] = [];
				for (const [path, identity] of Object.entries(identities)) {
					table.push([
						path,
						identity.address(),
						identity.publicKey(),
						identity.balance().available.toHuman(),
					]);

					wallets.push({
						path,
						address: identity.address(),
						extendedKey: identity.publicKey(),
						balance: identity.balance().available.toHuman(),
					});
				}

				networkSpinner.stop();

				console.log(table.toString());

				const { addresses } = await prompts([
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

				const imports: any[] = [];
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
				useLogger().info(`Disconnected [${deviceModel.productName}]`);
			}
		},
		error: (e) => console.log({ type: "failed", message: e.message }),
		complete: () => void 0,
	});
};
