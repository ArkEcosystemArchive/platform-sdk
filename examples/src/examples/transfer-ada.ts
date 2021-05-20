import { Signatories } from "@arkecosystem/platform-sdk";
import { Environment } from "@arkecosystem/platform-sdk-profiles";
import { createProfile, pollTransactionStatus, useEnvironment, useLogger } from "../helpers";

export default async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	// Create profile
	const profile = await createProfile(env,  "ada-profile", "my-password");

	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();

	// Create read-write wallet #1
	const mnemonic1: string = "submit teach debate stool guilt pen problem inquiry horn tissue cradle ankle member quarter conduct obvious device ivory top wink globe tool rate tonight";
	const wallet1 = await profile.walletFactory().fromAddress({
		address: "addr_test1qq254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq7n2ck",
		coin: "ADA",
		network: "ada.testnet"
	});
	profile.wallets().push(wallet1);

	// Create read-only wallet #2
	const address2 = "addr_test1qzt6zp2uf2p3zwdvvdtv4vsh8wrvc7sj92ymj27nnemct84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs54c0av";
	const wallet2 = await profile.walletFactory().fromAddress({
		address: address2,
		coin: "ADA",
		network: "ada.testnet"
	});
	profile.wallets().push(wallet2);

	// Display profile and wallet balances
	logger.log("Wallet 1", wallet1.address(), "balance", wallet1.balance().toHuman(2));
	logger.log("Wallet 2", wallet2.address(), "balance", wallet2.balance().toHuman(2));

	// Transfer
	const transactionId = await wallet1
		.transaction()
		.signTransfer({
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: mnemonic1,
					address: wallet1.address(),
					publicKey: "publicKey",
					privateKey: "privateKey",
				}),
			),
			data: {
				amount: "1100000",
				to: address2
			}
		});
	logger.log("signedTransactionData", transactionId);

	await wallet1.transaction().broadcast(transactionId);
	await pollTransactionStatus(transactionId, wallet1);
};
