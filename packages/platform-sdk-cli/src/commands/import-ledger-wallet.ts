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
	const instance = profile.coinFactory().make(coin, network);
	await instance.__construct();

	profile.coins().set(instance);

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
				const addressMap = {};

				for (let accountIndex = 0; accountIndex < 5; accountIndex++) {
					const compressedPublicKey = await instance
						.ledger()
						.getExtendedPublicKey(`m/44'/${slip44}'/${accountIndex}'`);

					useLogger().info(`Extended Public Key for account [${accountIndex}] >>> ${compressedPublicKey}`);

					for (let addressIndex = 0; addressIndex < 50; addressIndex++) {
						const path = `44'/${slip44}'/${accountIndex}'/0/${addressIndex}`;
						const extendedKey = HDKey.fromCompressedPublicKey(compressedPublicKey)
							.derive(`m/0/${addressIndex}`)
							.publicKey.toString("hex");
						const extendedAddress = await instance.identity().address().fromPublicKey(extendedKey);

						addressMap[extendedAddress] = { path, extendedKey };
					}
				}

				// Check
				const networkSpinner = ora("Checking addresses on network...").start();

				const table = new Table({ head: ["Path", "Address", "Public Key", "Balance"] });

				const chunks = await Promise.all(
					chunk(Object.keys(addressMap), 50).map((addresses: string[]) =>
						instance.client().wallets({ addresses }),
					),
				);

				const wallets: any[] = [];
				for (const chunk of chunks) {
					for (const identity of chunk.items()) {
						table.push([
							addressMap[identity.address()].path,
							identity.address(),
							addressMap[identity.address()].extendedKey,
							identity.balance().toHuman(),
						]);

						wallets.push({
							path: addressMap[identity.address()].path,
							address: identity.address(),
							extendedKey: addressMap[identity.address()].extendedKey,
							balance: identity.balance().toHuman(),
						});
					}
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
							// @TODO: create coin instance to pass in here
							await profile.walletFactory().fromAddressWithLedgerPath({
								coin,
								// @ts-ignore
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
