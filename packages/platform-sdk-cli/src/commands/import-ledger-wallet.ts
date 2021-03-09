import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import Table from "cli-table3";
import createXpub from "create-xpub";
import ora from "ora";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

const chunk = <T>(value: T[], size: number) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));

export const importLedgerWallet = async (env: Environment, profile: Profile): Promise<void> => {
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

	const instance = await env.coin(coin, network);

	await LedgerTransportNodeHID.create();

	try {
		const spinner = ora("Trying to connect...").start();

		await instance.ledger().connect(LedgerTransportNodeHID);

		await instance.ledger().getPublicKey("m/44'/111'/0'/0/0");

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

				const addressMap = {};

				// 5 Accounts
				for (let accountIndex = 0; accountIndex < 5; accountIndex++) {
					const extendedPublicKey = await instance
						.ledger()
						.getExtendedPublicKey(`m/44'/111'/${accountIndex}'`);

					useLogger().info(`Extended Public Key for account [${accountIndex}] >>> ${extendedPublicKey}`);

					// 100 Wallets per account
					for (let addressIndex = 0; addressIndex < 100; addressIndex++) {
						const path = `44'/111'/${accountIndex}'/0/${addressIndex}`;
						// const ledgerKey = await instance.ledger().getPublicKey(path);
						// const ledgerAddress = await instance.identity().address().fromPublicKey(ledgerKey);
						const extendedKey = HDKey.fromExtendedPublicKey(
							createXpub({
								depth: 0,
								childNumber: 2147483648, // Account 0 = 0 + 0x80000000
								chainCode: extendedPublicKey.slice(-64),
								publicKey: extendedPublicKey.slice(0, 66),
							}),
						)
							.derive(`m/0/${addressIndex}`)
							.publicKey.toString("hex");
						const extendedAddress = await instance.identity().address().fromPublicKey(extendedKey);

						addressMap[extendedAddress] = path;
					}
				}

				const table = new Table({ head: ["Path", "Address", "Public Key", "Balance"] });

				for (const addresses of chunk(Object.keys(addressMap), 20)) {
					const response = await instance.client().wallets({ addresses });

					for (const identity of response.items()) {
						table.push([
							addressMap[identity.address()],
							identity.address(),
							identity.publicKey(),
							identity.balance().toHuman(),
						]);
					}
				}

				console.log(table.toString());

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
