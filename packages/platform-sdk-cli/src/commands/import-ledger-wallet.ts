import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import ora from "ora";
import prompts from "prompts";
import createXpub from "create-xpub";

import { renderLogo, useLogger } from "../helpers";

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

				const extendedPublicKey = await instance.ledger().getExtendedPublicKey("m/44'/111'/0'");

				useLogger().info(`Extended Public Key: ${extendedPublicKey}`);

				const confirmations = {
					"44'/111'/0'/0/0": "AYnmdEV3YUzcHWaANJxex8YiDwHG39oqCd",
					"44'/111'/1'/0/0": "AYN58vVzfhuwz1KcWF5c7RgSmQydMj7AkW",
					"44'/111'/2'/0/0": "ARiCq378UANqsYWdXHrdZPiFmD2sGATtJb",
					"44'/111'/3'/0/0": "AUdAbG3NmjKJ3pmz55SDex8mTbhBmU4PST",
					"44'/111'/4'/0/0": "AWZbSenUzVZ3FtbdvCcd1j56x2Hvht5EZU",
					"44'/111'/0'/0/1": "AaCxeiExbhRbQaKhQGMYMfqjRawsA9Qzza",
					"44'/111'/0'/0/2": "AeBoGCKrbfVghNi1TRvQdmdUYrbZ8KEUsn",
					"44'/111'/0'/0/3": "AUiZ9oBi2NsbZC51zjNzSafbVynZGFVueT",
					"44'/111'/0'/0/4": "AMF8hHxCnxzkGNzzh9bpnfgBk2DNgKBPUL",
					"44'/111'/0'/0/5": "APpCDz9rFsZUf4XKTHApmUUhwvTrwfhjoC",
					"44'/111'/0'/0/6": "ARyWiQ4L5w9cFCb5T9vUsSZsUkhHpbR8gK",
					"44'/111'/0'/0/7": "AU81qEcvSadKpBq6auKNfDL1neaNqzaTbz",
					"44'/111'/0'/0/8": "ANzRinSabrDtXb9H6eyTa2GUG6nMgEwJZ9",
					"44'/111'/0'/0/9": "AHWB5KGPs4i69Rkn1GXA9S7pgTifvz41AT",
				};

				for (let i = 0; i < 1; i++) {
					const path = `44'/111'/0'/0/${i}`;
					const ledgerKey = await instance.ledger().getPublicKey(path);
					const ledgerAddress = await instance.identity().address().fromPublicKey(ledgerKey);
					const extendedKey = HDKey.fromExtendedPublicKey(createXpub({
						depth: 0,
						childNumber: 2147483648,
						chainCode: extendedPublicKey.slice(-64),
						publicKey: extendedPublicKey.slice(0, 66),
					})).derive(`m/0/${i}`).publicKey.toString("hex");
					const extendedAddress = await instance.identity().address().fromPublicKey(extendedKey);
					const expected = confirmations[path];

					console.log({ path, expected, ledgerKey, ledgerAddress, extendedKey, extendedAddress });
				}

				process.exit();
			}

			if (type === "remove") {
				useLogger().info(`Disconnected [${deviceModel.productName}]`);
			}
		},
		error: (e) => console.log({ type: "failed", message: e.message }),
		complete: () => void 0,
	});

	// for (const { address, path } of wallets) {
	//     const wallet = await profile
	//         .wallets()
	//         .importByAddress(address, coin.network().coin(), coin.network().id());
	//     wallet.data().set(WalletData.LedgerPath, path);
	// }
};
