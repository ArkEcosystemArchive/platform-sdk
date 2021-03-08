import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

export const importLedgerWallet = async (env: Environment, profile: Profile): Promise<void> => {
	renderLogo();

	// const { coin, network } = await prompts([
	// 	{
	// 		type: "text",
	// 		name: "coin",
	// 		message: "What is your coin?",
	// 		validate: (value: string) => value !== undefined,
	// 	},
	// 	{
	// 		type: "text",
	// 		name: "network",
	// 		message: "What is your network?",
	// 		validate: (value: string) => value !== undefined,
	// 	},
	// ]);

	const coin = await env.coin("ARK", "ark.mainnet");

	await LedgerTransportNodeHID.create();

	try {
		useLogger().info("Trying to connect...");

		await coin.ledger().connect(LedgerTransportNodeHID);

		await coin.ledger().getPublicKey("m/44'/111'/0'/0/0");
	} catch (connectError) {
		console.log(connectError.message);

		await coin.ledger().disconnect();

		throw connectError;
	}

	LedgerTransportNodeHID.listen({
		// @ts-ignore
		next: async ({ type, deviceModel }) => {
			if (type === "add") {
				useLogger().info(`Connected [${deviceModel.productName}] with version [${await coin.ledger().getVersion()}]`);

				const extendedPublicKey = await coin.ledger().getExtendedPublicKey("m/44'/111'/0'");

				useLogger().info(`Extended Public Key: ${extendedPublicKey}`);

				for (let i = 0; i < 10; i++) {
					console.log(
						await coin.identity().address().fromPublicKey(
							HDKey.fromSeed(extendedPublicKey).derive(`m/44'/111'/0'/0/${i}`).publicKey.toString("hex"),
						),
					);
				}
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
