import { HDKey } from "@arkecosystem/platform-sdk-crypto";
import { Environment, Profile } from "@arkecosystem/platform-sdk-profiles";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";
import prompts from "prompts";

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
		useLogger().info("Trying to connect...");

		await instance.ledger().connect(LedgerTransportNodeHID);

		await instance.ledger().getPublicKey("m/44'/111'/0'/0/0");
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

				for (let i = 0; i < 10; i++) {
					console.log(
						await instance
							.identity()
							.address()
							.fromPublicKey(
								HDKey.fromSeed(extendedPublicKey)
									.derive(`m/44'/111'/0'/0/${i}`)
									.publicKey.toString("hex"),
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
