import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import { useEnvironment, useLogger } from "../helpers";

export default async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	const mnemonic1: string = "glare arrange have frame family border time bronze weekend moon gesture often";
	const destinationAddress: string = "DJSB9R56X5c1Wxu9Be6V4g64vWWFFLGgxn";

	// Open profile
	const profile: Contracts.IProfile | undefined = env.profiles().create("my-test-profile-name");
	if (!profile) {
		throw Error("Profile doesn't exist");
	}

	// Restore it and sync
	// await env.profiles().restore(profile, "my-password");
	await profile.sync();

	// Create read-write wallet #1
	const wallet1 = await profile.walletFactory().fromMnemonic({
		mnemonic: mnemonic1,
		coin: "ARK",
		network: "ark.devnet"
	});
	await profile.wallets().push(wallet1);

	// Display profile and wallet balances
	logger.log("Wallet", wallet1.address(), "balance", wallet1.balance().toHuman(2));

	const txId = await wallet1.transaction().signTransfer({
		from: wallet1.address(),
		sign: {
			mnemonic: mnemonic1,
		},
		data: {
			amount: "10000000",
			to: destinationAddress,
		}
	});
	logger.log("txId");
};
