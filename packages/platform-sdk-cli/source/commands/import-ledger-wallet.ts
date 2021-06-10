import { Services } from "@arkecosystem/platform-sdk";
import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import Table from "cli-table3";
import ora from "ora";
import prompts from "prompts";

import { renderLogo } from "../helpers";

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

	const instance = profile.coins().set(coin, network);
	await instance.__construct();

	await LedgerTransportNodeHID.create();

	let networkSpinner: ora.Ora;
	try {
		await instance.ledger().connect(LedgerTransportNodeHID);

		// Derive
		let identities: Services.LedgerWalletList;
		try {
			networkSpinner = ora("Fetching accounts from ledger...").start();
			identities = await instance.ledger().scan();
		} finally {
			networkSpinner!.stop();
		}

		const table = new Table({ head: ["Path", "Address", "Public Key", "Balance"] });

		const wallets: any[] = [];
		for (const [path, identity] of Object.entries(identities)) {
			table.push([path, identity.address(), identity.publicKey(), identity.balance().available.toHuman()]);

			wallets.push({
				path,
				address: identity.address(),
				extendedKey: identity.publicKey(),
				balance: identity.balance().available.toHuman(),
			});
		}

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
		try {
			networkSpinner = ora("Fetching accounts from network...").start();
			await Promise.all(imports);
		} finally {
			networkSpinner!.stop();
		}
	} catch (connectError) {
		console.log(connectError.message);

		throw connectError;
	} finally {
		await instance.ledger().disconnect();
	}
};
