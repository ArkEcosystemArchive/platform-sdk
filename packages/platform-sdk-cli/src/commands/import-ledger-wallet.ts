import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import Table from "cli-table3";
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

	const slip44 = network === "ark.mainnet" ? 111 : 1;
	const instance = await env.coin(coin, network);

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
				console.time("ledger");

				useLogger().info(
					`Connected [${deviceModel.productName}] with version [${await instance.ledger().getVersion()}]`,
				);

				const addressMap = {};

				for (let accountIndex = 0; accountIndex < 50; accountIndex++) {
					const compressedPublicKey = await instance
						.ledger()
						.getExtendedPublicKey(`m/44'/${slip44}'/${accountIndex}'`);

					useLogger().info(`Extended Public Key for account [${accountIndex}] >>> ${compressedPublicKey}`);

					for (let addressIndex = 0; addressIndex < 100; addressIndex++) {
						const path = `44'/${slip44}'/${accountIndex}'/0/${addressIndex}`;
						// const ledgerKey = await instance.ledger().getPublicKey(path);
						// const ledgerAddress = await instance.identity().address().fromPublicKey(ledgerKey);
						const extendedKey = HDKey.fromCompressedPublicKey(compressedPublicKey)
							.derive(`m/0/${addressIndex}`)
							.publicKey.toString("hex");
						const extendedAddress = await instance.identity().address().fromPublicKey(extendedKey);

						addressMap[extendedAddress] = { path, extendedKey };
					}
				}

				// const mnemonic = "";
				// const source = await profile.wallets().importByMnemonic(mnemonic, coin, network);

				// for (const addresses of chunk(Object.keys(addressMap), 128)) {
				// 	try {
				// 		await source.transaction().broadcast(
				// 			await source.transaction().signMultiPayment({
				// 				from: source.address(),
				// 				sign: { mnemonic },
				// 				data: {
				// 					payments: addresses.map((address: string) => ({
				// 						amount: `${1e8}`,
				// 						to: address,
				// 					}))
				// 				}
				// 			})
				// 		);
				// 	} catch {
				// 		//
				// 	}

				// 	await delay(10000);
				// }

				const networkSpinner = ora("Checking addresses on network...").start();

				const table = new Table({ head: ["Path", "Address", "Public Key", "Balance"] });

				const chunks = await Promise.all(
					chunk(Object.keys(addressMap), 50).map((addresses: string[]) =>
						instance.client().wallets({ addresses }),
					),
				);

				for (const chunk of chunks) {
					for (const identity of chunk.items()) {
						table.push([
							addressMap[identity.address()].path,
							identity.address(),
							addressMap[identity.address()].extendedKey,
							identity.balance().toHuman(),
						]);
					}
				}

				networkSpinner.stop();

				console.log(table.toString());
				console.timeEnd("ledger");

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
