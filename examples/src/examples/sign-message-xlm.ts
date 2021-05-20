import { Signatories } from "@arkecosystem/platform-sdk";
import { Environment } from "@arkecosystem/platform-sdk-profiles";
import { createProfile, useEnvironment, useLogger } from "../helpers";

export default async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	// Create profile
	const profile = await createProfile(env,  "stellar-profile", "my-password");

	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();

	// Create read-write wallet 1
	const mnemonic1: string = "stand adapt injury old donate champion sword slice exhibit mimic chair body";
	const wallet1 = await profile.walletFactory().fromMnemonic({
		mnemonic: mnemonic1,
		coin: "XLM",
		network: "xlm.testnet"
	});
	profile.wallets().push(wallet1);

	// Sign a message
	const signedMessage = await wallet1
		.message()
		.sign({
			message: "Message to sign",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: mnemonic1,
					address: wallet1.address(),
					publicKey: "publicKey",
					privateKey: "privateKey",
				}),
			),
		});
	logger.log("signedMessage", signedMessage);

	// Verify a signed message
	const verified: boolean = await wallet1
		.message()
		.verify({
				message: 'Trust me',
				signatory: 'GDBK22FHD3WD2GINYR6AIGW5MGXCGE5BKV6DARZMSJELW6XUHP4Q7MA3',
				signature: '475a11aeaf4cf93f22e535e4627c6f4bf7ccf127a7d27a00359f970a59b18669704ec8bab937d6c429fa3c86b7f93977e44cf3e5a792c132192ba13484780b0b'
			}
		);
	logger.log("verified", verified);
};
